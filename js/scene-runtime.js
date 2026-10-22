/* ===== Tiny template runtime =====
   Renders the Concept B design straight from its template:
   {{a.b}} holes in text/attributes, <sc-for list as>, <sc-if value>, onClick/onMouseMove handlers.
   Each frame it recomputes the component's values and only touches DOM that changed. */
(function () {
  window.DCLogic = class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      const next = typeof patch === 'function' ? patch(this.state) : patch;
      Object.assign(this.state, next);
      if (this.__schedule) this.__schedule();
    }
  };

  const HOLE = /\{\{\s*([\w.$]+)\s*\}\}/g;
  const lookup = (scope, path) => {
    const parts = path.split('.');
    let v = scope;
    for (let i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  };
  const fill = (tpl, scope) => tpl.replace(HOLE, (m, k) => { const v = lookup(scope, k); return v == null || typeof v === 'function' ? '' : String(v); });
  const single = (tpl) => { const m = /^\s*\{\{\s*([\w.$]+)\s*\}\}\s*$/.exec(tpl); return m ? m[1] : null; };
  const EVENTS = { onclick: 'click', onmousemove: 'mousemove', onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onwheel: 'wheel', onkeydown: 'keydown' };

  // Compile a list of template nodes into a factory that builds live instances.
  function compileNodes(nodes) {
    const parts = [];
    nodes.forEach((n) => { const c = compileNode(n); if (c) parts.push(c); });
    return () => {
      const inst = parts.map((p) => p());
      return {
        nodes: () => inst.reduce((a, i) => a.concat(i.nodes()), []),
        update: (scope) => inst.forEach((i) => i.update(scope))
      };
    };
  }

  function compileNode(node) {
    if (node.nodeType === 3) {
      const txt = node.nodeValue;
      if (txt.indexOf('{{') < 0) return () => { const t = document.createTextNode(txt); return { nodes: () => [t], update: () => {} }; };
      return () => { const t = document.createTextNode(''); let last = null; return { nodes: () => [t], update: (s) => { const v = fill(txt, s); if (v !== last) { last = v; t.nodeValue = v; } } }; };
    }
    if (node.nodeType !== 1) return null;
    const tag = node.localName;
    if (tag === 'sc-for') {
      const listKey = single(node.getAttribute('list') || '');
      const as = node.getAttribute('as') || 'item';
      const make = compileNodes(Array.from(node.childNodes));
      return () => {
        const anchor = document.createComment('for');
        const items = [];
        return {
          nodes: () => items.reduce((a, it) => a.concat(it.nodes()), [anchor]),
          update: (s) => {
            const list = (listKey && lookup(s, listKey)) || [];
            const parent = anchor.parentNode;
            while (items.length > list.length) items.pop().nodes().forEach((n) => n.remove());
            while (items.length < list.length) {
              const it = make();
              const prev = items.length ? items[items.length - 1].nodes() : [anchor];
              let ref = prev[prev.length - 1];
              it.nodes().forEach((n) => { parent.insertBefore(n, ref.nextSibling); ref = n; });
              items.push(it);
            }
            list.forEach((val, i) => { const sc = Object.create(s); sc[as] = val; items[i].update(sc); });
          }
        };
      };
    }
    if (tag === 'sc-if') {
      const key = single(node.getAttribute('value') || '');
      const make = compileNodes(Array.from(node.childNodes));
      return () => {
        const anchor = document.createComment('if');
        let inst = null, shown = false;
        return {
          nodes: () => (shown && inst ? [anchor].concat(inst.nodes()) : [anchor]),
          update: (s) => {
            const on = !!(key && lookup(s, key));
            if (on && !inst) inst = make();
            if (on !== shown) {
              shown = on;
              if (on) { let ref = anchor; inst.nodes().forEach((n) => { anchor.parentNode.insertBefore(n, ref.nextSibling); ref = n; }); }
              else inst.nodes().forEach((n) => n.remove());
            }
            if (on) inst.update(s);
          }
        };
      };
    }
    // regular element
    const isSvg = node.namespaceURI === 'http://www.w3.org/2000/svg';
    const statics = [], dyn = [], evs = [];
    Array.from(node.attributes).forEach((a) => {
      if (a.name.indexOf('hint-') === 0) return;
      const ev = EVENTS[a.name.toLowerCase()];
      if (ev && a.value.indexOf('{{') >= 0) { evs.push([ev, single(a.value)]); return; }
      if (a.value.indexOf('{{') >= 0) dyn.push([a.name, a.value]); else statics.push([a.name, a.value]);
    });
    const kids = compileNodes(Array.from((tag === 'template' ? node.content : node).childNodes));
    return () => {
      const el = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);
      statics.forEach((a) => el.setAttribute(a[0], a[1]));
      const handlers = {};
      evs.forEach((e) => { el.addEventListener(e[0], (evt) => { const f = handlers[e[0]]; if (typeof f === 'function') f(evt); }); });
      const k = kids();
      k.nodes().forEach((n) => el.appendChild(n));
      const lastVals = dyn.map(() => null);
      return {
        nodes: () => [el],
        update: (s) => {
          for (let i = 0; i < dyn.length; i++) {
            const v = fill(dyn[i][1], s);
            if (v !== lastVals[i]) { lastVals[i] = v; el.setAttribute(dyn[i][0], v); }
          }
          evs.forEach((e) => { handlers[e[0]] = e[1] ? lookup(s, e[1]) : null; });
          k.update(s);
        }
      };
    };
  }

  window.mountScene = function (tplEl, mountEl, Component, onState) {
    const root = tplEl.content;
    const helmet = root.querySelector('helmet');
    if (helmet) { Array.from(helmet.childNodes).forEach((n) => { if (n.nodeType === 1) document.head.appendChild(n.cloneNode(true)); }); helmet.remove(); }
    const make = compileNodes(Array.from(root.childNodes));
    const view = make();
    view.nodes().forEach((n) => mountEl.appendChild(n));
    const comp = new Component({});
    let raf = 0;
    const render = () => { raf = 0; view.update(comp.renderVals()); if (onState) onState(comp.state); };
    comp.__schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    if (comp.componentDidMount) comp.componentDidMount();
    return comp;
  };
})();
