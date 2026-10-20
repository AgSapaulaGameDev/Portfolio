/* ==========================================================
   PORTFOLIO DATA — edit this file to update the whole site.
   Image/video names match the files already in your repo.
   ========================================================== */
window.SITE = {
  "name": "Angelo Sapaula",
  "handle": "AGSAPAULA",
  "email": "agsapaula@outlook.com",
  "phone": "09774619693",
  "resume": "Resume_AgSapaula.pdf",
  "portrait": "ProfilePicture.png",
  "github": "https://github.com/agsapaulagamedev",
  "linkedin": "",
  "itch": "",
  "facebook": "https://www.facebook.com/share/1AAi9UCcJ9/?mibextid=wwXIfr",
  "classicSite": "classic.html",
  "emailjs": {
    "publicKey": "bsUprxuMEbabIhUuZ",
    "service": "service_7jj43f9",
    "template": "template_1p7gmvo"
  }
};

window.GAMES = [
  {
    "slug": "tidal-wins",
    "title": "Tidal Wins",
    "kind": "SLOT · UNITY · C#",
    "role": "Lead Developer",
    "blurb": "Ocean-themed slot game with a paytable balanced through RTP computations.",
    "built": [
      "Reel spin and staggered stop system",
      "Payline win evaluation",
      "RTP-balanced symbol weights and paytable"
    ],
    "cover": "TWCover.jpg",
    "tags": [
      "Unity",
      "Slot Game",
      "C#",
      "RTP Computations"
    ],
    "description": "Tidal Wins is a slot game developed in Unity with C#. It combines satisfying reel animations and win feedback with a mathematically balanced payout model, where symbol weights, paylines and payouts were tuned through RTP (Return to Player) computations to hit a target return and volatility.",
    "contribution": "Lead Developer – Implemented the reel spin and stop logic, payline and win evaluation, and payout system in Unity/C#. Ran RTP computations to balance symbol weights and paytables, and built the UI and win presentation.",
    "features": [
      "Smooth reel spin and stop animations",
      "Payline-based win evaluation system",
      "Paytable balanced through RTP computations",
      "Configurable symbol weights and volatility",
      "Win celebrations and feedback effects",
      "Built in Unity using C#"
    ],
    "images": [
      "TW1.jpg",
      "TW2.jpg",
      "TW3.jpg",
      "TW4.jpg",
      "TW5.jpg"
    ],
    "video": "13m7U7xmNIp-weRFKHTUcbEN8m5mvcYG_",
    "code": [],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "minatamis",
    "title": "MinaTamis",
    "kind": "SIMULATION · UNITY",
    "role": "PM · Game Designer · Lead Dev",
    "blurb": "A 3D Filipino dessert vendor simulator — prepare and sell classic treats.",
    "built": [
      "Dessert preparation workflows",
      "Customer interaction system",
      "UI/UX and store customization"
    ],
    "cover": "M2.png",
    "tags": [
      "Unity",
      "Simulation",
      "PC Game",
      "Filipino Culture"
    ],
    "description": "MinaTamis is a Filipino-themed PC simulation game where players become local dessert vendors preparing and selling classic treats like hotcakes. Blending fun gameplay with cultural learning, it celebrates Filipino culinary heritage through interactive storytelling and immersive mechanics inspired by Cooking Simulator and Cooking Mama.",
    "contribution": "Lead Developer – Responsible for game design, Unity implementation, and cultural research. Developed simulation mechanics, customer interaction systems, and authentic Filipino dessert preparation workflows, as well as UI designs and gameplay mechanics.",
    "features": [
      "Interactive Filipino dessert preparation and selling system",
      "Vibrant and authentic local environment",
      "Culturally inspired characters and design",
      "Educational gameplay promoting Filipino heritage",
      "Unlockable content and store customization options",
      "Optimized for PC with intuitive controls"
    ],
    "images": [
      "M1.png",
      "M2.png",
      "M3.png",
      "M4.png",
      "M5.png",
      "M6.png",
      "M7.png",
      "M8.png",
      "M9.png"
    ],
    "video": "16shUrsRO9GCC2So1PiTnQIcWvtAeX_ZX",
    "code": [],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "agent-snow",
    "title": "Agent Snow",
    "kind": "STEALTH · UNITY",
    "role": "Game Designer & Developer",
    "blurb": "Tactical stealth-action shooter in a high-security facility.",
    "built": [
      "NavMesh patrol AI with sight checks",
      "Weapon, ammo and reload system",
      "Freeze and poison status effects"
    ],
    "cover": "AS11.jpg",
    "tags": [
      "Unity",
      "Stealth Action"
    ],
    "description": "Agent Snow is a stealth-action shooter where players take control of a skilled operative on covert missions within high-security environments. The game emphasizes strategic movement, tactical decision-making, and precision shooting. Navigate through futuristic corridors, outsmart enemy patrols, and complete objectives with limited resources and time pressure.",
    "contribution": "Game Designer & Developer - Created stealth mechanics, designed AI patrol systems, implemented tactical shooting mechanics, developed level architecture, and optimized performance for smooth gameplay across different hardware configurations.",
    "features": [
      "Stealth-focused gameplay with tactical shooting elements",
      "Immersive sci-fi environments and detailed level design",
      "Dynamic enemy AI with varied patrol behaviors",
      "Multiple paths and strategies for each mission",
      "Resource management and time-based challenges"
    ],
    "images": [
      "AS1.jpg",
      "AS2.jpg",
      "AS3.jpg",
      "AS4.jpg",
      "AS5.jpg",
      "AS6.jpg",
      "AS7.jpg",
      "AS8.jpg",
      "AS9.jpg",
      "AS10.jpg",
      "AS11.jpg",
      "AS12.jpg",
      "AS13.jpg"
    ],
    "video": "1x09YcBf93kI7i_ClkoJMKIxbcUKMwRzt",
    "code": [
      {
        "file": "PlayerMotor.cs",
        "title": "PlayerMotor.cs - Player Movement System",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class PlayerMotor : MonoBehaviour\n{\n    private CharacterController controller;\n    private Vector3 playerVelocity;\n    public float speed = 3f;\n    private bool isGrounded;\n    public float gravity = -9.8f;\n    public float jumpHeight = .1f;\n\n    private bool crouching = false;\n    private bool lerpCrouch = false;\n    private float crouchTimer = 0f;\n    private bool sprinting = false;\n\n    private PlayerHealth playerHealth;\n\n    void Start()\n    {\n        controller = GetComponent<CharacterController>();\n        playerHealth = GetComponent<PlayerHealth>();\n    }\n\n    void Update()\n    {\n        isGrounded = controller.isGrounded;\n        if (lerpCrouch)\n        {\n            crouchTimer += Time.deltaTime;\n            float p = crouchTimer / 1;\n            p *= p;\n            if (crouching)\n                controller.height = Mathf.Lerp(controller.height, 1, p);\n            else\n                controller.height = Mathf.Lerp(controller.height, 2, p);\n\n            if (p > 1)\n            {\n                lerpCrouch = false;\n                crouchTimer = 0f;\n            }\n        }\n    }\n\n    public void JumpButton()\n    {\n        Jump();\n    }\n\n    public void CrouchButton()\n    {\n        Crouch();\n    }\n\n    public void SprintButton()\n    {\n        Sprint();\n    }\n\n    public void Jump()\n    {\n        if (isGrounded)\n        {\n            playerVelocity.y = Mathf.Sqrt(jumpHeight * -3.0f * gravity);\n        }\n    }\n\n    public void Crouch()\n    {\n        crouching = !crouching;\n        crouchTimer = 0;\n        lerpCrouch = true;\n    }\n\n    public void Sprint()\n    {\n        if (playerHealth != null && playerHealth.isFrozen)\n        {\n            sprinting = false;\n            speed = 2.5f;\n            return;\n        }\n\n        sprinting = !sprinting;\n        speed = sprinting ? 5 : 3;\n    }\n\n    public void ProcessMove(Vector3 input)\n    {\n        Vector3 moveDirection = Vector3.zero;\n        moveDirection.x = input.x;\n        moveDirection.y = input.y;\n        moveDirection.z = input.z;\n        controller.Move(transform.TransformDirection(moveDirection) * speed * Time.deltaTime);\n        playerVelocity.y += gravity * Time.deltaTime;\n        if (isGrounded && playerVelocity.y < 0)\n            playerVelocity.y = -2f;\n        controller.Move(playerVelocity * speed * Time.deltaTime);\n    }\n}"
      },
      {
        "file": "UnifiedEnemyAI.cs",
        "title": "UnifiedEnemyAI.cs - Enemy AI System",
        "language": "C#",
        "content": "using UnityEngine;\nusing UnityEngine.AI;\n\npublic class UnifiedEnemyAI : MonoBehaviour\n{\n    [Header(\"Health Settings\")]\n    public int maxHealth = 100;\n    private int currentHealth;\n\n    [Header(\"Patrolling Settings\")]\n    public Transform[] patrolPoints;\n    private int currentPatrolIndex;\n\n    [Header(\"Chasing and Detection\")]\n    public float chaseRange = 10f;\n    public float sightRange = 15f;\n    public float fieldOfView = 60f;\n    public Transform player;\n    [SerializeField()]\n    private bool isChasing;\n\n    [Header(\"Shooting Settings\")]\n    public GameObject bulletPrefab;\n    public Transform firePoint;\n    public float bulletSpeed = 15f;\n    public float fireRate = 1f;\n    [SerializeField()]\n    private float nextFireTime;\n\n    [Header(\"Movement Settings\")]\n    public float moveSpeed = 3.5f; // Movement speed\n    public float turnSpeed = 5f; // Turning speed\n\n    private NavMeshAgent agent;\n\n    private void Start()\n    {\n        agent = GetComponent<NavMeshAgent>();\n        currentHealth = maxHealth;\n        currentPatrolIndex = 0;\n        agent.speed = moveSpeed; // Set the movement speed\n        agent.angularSpeed = turnSpeed * 100; // Convert turn speed to angular speed (degrees per second)\n        MoveToNextPatrolPoint();\n    }\n\n    private void Update()\n    {\n        if (PlayerInSight())\n        {\n            isChasing = true;\n            ChasePlayer();\n        }\n        else if (isChasing)\n        {\n            isChasing = false;\n            MoveToNextPatrolPoint();\n        }\n\n        if (!isChasing && !agent.pathPending && agent.remainingDistance < 0.5f)\n        {\n            MoveToNextPatrolPoint();\n        }\n\n        if (Time.time >= nextFireTime && isChasing && Vector3.Distance(transform.position, player.position) <= chaseRange)\n        {\n            Shoot();\n            nextFireTime = Time.time + fireRate;\n        }\n    }\n\n    private void MoveToNextPatrolPoint()\n    {\n        if (patrolPoints.Length == 0)\n            return;\n\n        agent.destination = patrolPoints[currentPatrolIndex].position;\n        currentPatrolIndex = (currentPatrolIndex + 1) % patrolPoints.Length;\n    }\n\n    private void ChasePlayer()\n    {\n        agent.SetDestination(player.position);\n    }\n\n    private bool PlayerInSight()\n    {\n        Vector3 directionToPlayer = (player.position - transform.position).normalized;\n        float angleToPlayer = Vector3.Angle(transform.forward, directionToPlayer);\n\n        if (angleToPlayer < fieldOfView / 2f && Vector3.Distance(transform.position, player.position) <= sightRange)\n        {\n            Ray ray = new Ray(transform.position, directionToPlayer);\n            if (Physics.Raycast(ray, out RaycastHit hit, sightRange))\n            {\n                if (hit.collider.CompareTag(\"Player\"))\n                {\n                    return true;\n                }\n            }\n        }\n\n        return false;\n    }\n\n    private void Shoot()\n    {\n        GameObject bullet = Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);\n        Rigidbody rb = bullet.GetComponent<Rigidbody>();\n        if (rb != null)\n        {\n            Vector3 directionToPlayer = (player.position - firePoint.position).normalized;\n            rb.linearVelocity = directionToPlayer * bulletSpeed;\n        }\n    }\n\n    public void TakeDamage(int damage)\n    {\n        currentHealth -= damage; // Reduce health by the given damage\n        Debug.Log($\"Enemy Health: {currentHealth}\");\n\n        if (currentHealth <= 0)\n        {\n            Die();\n        }\n    }\n\n    private void Die()\n    {\n        Debug.Log(\"Enemy Died!\");\n\n        // Add 100 points to the score\n        if (ScoreManager.Instance != null)\n        {\n            ScoreManager.Instance.AddScore(100);\n        }\n\n        Destroy(gameObject); // Remove the enemy from the scene\n    }\n}"
      },
      {
        "file": "Gun.cs",
        "title": "Gun.cs - Weapon System",
        "language": "C#",
        "content": "using System.Collections;\nusing UnityEngine;\nusing TMPro;\nusing UnityEngine.EventSystems;\nusing UnityEngine.UI;\n\npublic class Gun : MonoBehaviour\n{\n    [Header(\"Gun Settings\")]\n    public GameObject bulletPrefab;\n    public Transform firePoint;\n    public float bulletSpeed = 50f;\n    public float fireRate = 0.2f;\n    private float nextFireTime = 0f;\n\n    [Header(\"Ammo Settings\")]\n    public int maxAmmo = 20;\n    public int currentAmmo;\n    public float reloadTime = 2f;\n    private bool isReloading = false;\n\n    [Header(\"UI Settings\")]\n    public TextMeshProUGUI ammoText;\n    public TextMeshProUGUI reloadingText;\n    public Button fireButton;\n    public Button reloadButton;\n\n    private bool isFiring = false;\n\n    void Start()\n    {\n        currentAmmo = maxAmmo;\n        reloadingText.gameObject.SetActive(false);\n\n        if (fireButton != null)\n        {\n            EventTrigger trigger = fireButton.gameObject.AddComponent<EventTrigger>();\n\n            EventTrigger.Entry pointerDown = new EventTrigger.Entry { eventID = EventTriggerType.PointerDown };\n            pointerDown.callback.AddListener((data) => { isFiring = true; });\n            trigger.triggers.Add(pointerDown);\n\n            EventTrigger.Entry pointerUp = new EventTrigger.Entry { eventID = EventTriggerType.PointerUp };\n            pointerUp.callback.AddListener((data) => { isFiring = false; });\n            trigger.triggers.Add(pointerUp);\n        }\n        else\n        {\n            Debug.LogError(\"Fire button is not assigned in the Inspector!\");\n        }\n\n        if (reloadButton != null)\n        {\n            reloadButton.onClick.AddListener(ReloadButtonClicked);\n        }\n        else\n        {\n            Debug.LogError(\"Reload button is not assigned in the Inspector!\");\n        }\n    }\n\n    void Update()\n    {\n        if (isReloading) return;\n\n        if (currentAmmo <= 0)\n        {\n            StartCoroutine(Reload());\n            return;\n        }\n\n        if (Input.GetKeyDown(KeyCode.R))\n        {\n            StartCoroutine(Reload());\n        }\n\n        if (isFiring && Time.time >= nextFireTime)\n        {\n            nextFireTime = Time.time + fireRate;\n            Shoot();\n        }\n\n        UpdateAmmoUI();\n    }\n\n    public void ReloadButtonClicked()\n    {\n        if (!isReloading && currentAmmo < maxAmmo)\n        {\n            StartCoroutine(Reload());\n        }\n    }\n\n    void Shoot()\n    {\n        currentAmmo--;\n        GameObject bullet = Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);\n        Rigidbody rb = bullet.GetComponent<Rigidbody>();\n        if (rb != null)\n        {\n            rb.linearVelocity = firePoint.forward * bulletSpeed;\n        }\n        else\n        {\n            Debug.LogError(\"Bullet prefab is missing a Rigidbody component!\");\n        }\n    }\n\n    IEnumerator Reload()\n    {\n        if (currentAmmo == maxAmmo) yield break;\n\n        isReloading = true;\n        reloadingText.gameObject.SetActive(true);\n        yield return new WaitForSeconds(reloadTime);\n        currentAmmo = maxAmmo;\n        isReloading = false;\n        reloadingText.gameObject.SetActive(false);\n    }\n\n    void UpdateAmmoUI()\n    {\n        if (ammoText != null)\n        {\n            ammoText.text = $\"Ammo: {currentAmmo}/{maxAmmo}\";\n        }\n    }\n}"
      },
      {
        "file": "PlayerHealth.cs",
        "title": "PlayerHealth.cs - Health Management",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\nusing UnityEngine.SceneManagement;\nusing UnityEngine.UI;\n\npublic class PlayerHealth : MonoBehaviour\n{\n    private float health;\n    private float lerpTimer;\n\n    [Header(\"Health Bar\")]\n    public float maxHealth = 100f;\n    public float chipSpeed = 2f;\n    public Image frontHealthBar;\n    public Image backHealthBar;\n\n    [Header(\"Damage Overlay\")]\n    public Image overlay;\n    public float duration;\n    public float fadeSpeed;\n\n    [Header(\"Freeze Effect\")]\n    public Image freezeOverlay;\n    public float freezeDuration = 5f;\n    public float slowedSpeed = 2f;\n    private float originalSpeed;\n    public bool isFrozen = false;\n\n    [Header(\"Poison Effect\")]\n    public Image poisonOverlay;\n    public float poisonRate = 1f;\n    public float poisonThreshold = 20f;\n    private bool isPoisoned = false;\n\n    private float durationTimer;\n    public PlayerMotor playerMotor;\n    private CameraShake cameraShake;\n\n    void Start()\n    {\n        health = maxHealth;\n        overlay.color = new Color(overlay.color.r, overlay.color.g, overlay.color.b, 0);\n\n        cameraShake = Camera.main.GetComponent<CameraShake>();\n\n        if (freezeOverlay != null)\n            freezeOverlay.color = new Color(freezeOverlay.color.r, freezeOverlay.color.g, freezeOverlay.color.b, 0);\n        if (poisonOverlay != null)\n            poisonOverlay.color = new Color(poisonOverlay.color.r, poisonOverlay.color.g, poisonOverlay.color.b, 0);\n\n        originalSpeed = slowedSpeed;\n    }\n\n    void Update()\n    {\n        health = Mathf.Clamp(health, 0, maxHealth);\n        UpdateHealthUI();\n\n        // player die\n        if (health <= 0)\n        {\n            Cursor.lockState = CursorLockMode.None;\n            Cursor.visible = true;\n            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 2);\n        }\n\n        // Handle damage overlay fade\n        if (health < 100 || isPoisoned)\n        {\n            if (overlay.color.a < 1)\n            {\n                overlay.color = new Color(overlay.color.r, overlay.color.g, overlay.color.b, 1f);\n            }\n        }\n        else\n        {\n            if (overlay.color.a > 0)\n            {\n                durationTimer += Time.deltaTime;\n                if (durationTimer > duration)\n                {\n                    float tempAlpha = overlay.color.a;\n                    tempAlpha -= Time.deltaTime * fadeSpeed;\n                    overlay.color = new Color(overlay.color.r, overlay.color.g, overlay.color.b, tempAlpha);\n                }\n            }\n        }\n\n        // Handle poison effect\n        if (isPoisoned && health > poisonThreshold)\n        {\n            health -= poisonRate * Time.deltaTime;\n        }\n    }\n\n    public void TakeDamage(float damage)\n    {\n        health -= damage;\n        lerpTimer = 0f;\n        durationTimer = 0;\n        overlay.color = new Color(overlay.color.r, overlay.color.g, overlay.color.b, 1);\n\n        // Deduct 1 point from the score\n        if (ScoreManager.Instance != null)\n        {\n            ScoreManager.Instance.AddScore(-1);\n        }\n\n        // Trigger camera shake on damage\n        if (cameraShake != null)\n        {\n            cameraShake.Shake();\n        }\n\n        UpdateHealthUI();\n    }\n\n    public void UpdateHealthUI()\n    {\n        float fillF = frontHealthBar.fillAmount;\n        float fillB = backHealthBar.fillAmount;\n        float hFraction = health / maxHealth;\n\n        if (fillB > hFraction)\n        {\n            frontHealthBar.fillAmount = hFraction;\n            backHealthBar.color = Color.red;\n            lerpTimer += Time.deltaTime;\n            float percentComplete = lerpTimer / chipSpeed;\n            percentComplete = percentComplete * percentComplete;\n            backHealthBar.fillAmount = Mathf.Lerp(fillB, hFraction, percentComplete);\n        }\n\n        if (fillF < hFraction)\n        {\n            backHealthBar.color = Color.green;\n            backHealthBar.fillAmount = hFraction;\n            lerpTimer += Time.deltaTime;\n            float percentComplete = lerpTimer / chipSpeed;\n            percentComplete = percentComplete * percentComplete;\n            frontHealthBar.fillAmount = Mathf.Lerp(fillF, backHealthBar.fillAmount, percentComplete);\n        }\n    }\n\n    public void RestoreHealth(float healAmount)\n    {\n        health += healAmount;\n        lerpTimer = 0f;\n    }\n}"
      },
      {
        "file": "InputManager.cs",
        "title": "InputManager.cs - Input Handling",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class InputManager : MonoBehaviour\n{\n    private PlayerInput playerInput;\n    public PlayerInput.OnFootActions onFoot;\n    private PlayerMotor motor;\n    private PlayerLook look;\n\n    [SerializeField] private VirtualJoystick joystick; // Reference to the Virtual Joystick\n\n    private void Start()\n    {\n        // Lock the cursor to the center\n        Cursor.lockState = CursorLockMode.Locked;\n    }\n\n    void Awake()\n    {\n        playerInput = new PlayerInput();\n        onFoot = playerInput.OnFoot;\n\n        motor = GetComponent<PlayerMotor>();\n        look = GetComponent<PlayerLook>();\n\n        // Bind inputs\n        onFoot.Jump.performed += ctx => motor.Jump();\n        onFoot.Crouch.performed += ctx => motor.Crouch();\n        onFoot.Sprint.performed += ctx => motor.Sprint();\n    }\n\n    void FixedUpdate()\n    {\n        Vector3 moveInput;\n\n        if (joystick != null)\n        {\n            Vector2 joystickInput = joystick.Handle.anchoredPosition.normalized; // Use exposed Handle property\n            moveInput = new Vector3(joystickInput.x, 0, joystickInput.y);\n        }\n        else\n        {\n            moveInput = onFoot.Movement.ReadValue<Vector3>(); // Use keyboard/controller input\n        }\n\n        motor.ProcessMove(moveInput);\n    }\n\n    private void LateUpdate()\n    {\n        look.ProcessLook(onFoot.Look.ReadValue<Vector2>());\n    }\n\n    private void OnEnable()\n    {\n        onFoot.Enable();\n    }\n\n    private void OnDisable()\n    {\n        onFoot.Disable();\n    }\n}"
      },
      {
        "file": "Bullet.cs",
        "title": "Bullet.cs - Projectile System",
        "language": "C#",
        "content": "using UnityEngine;\n\npublic class Bullet : MonoBehaviour\n{\n    public int damage = 20;\n    public float lifeTime = 2f;\n\n    void Start()\n    {\n        Destroy(gameObject, lifeTime);\n    }\n\n    private void OnCollisionEnter(Collision collision)\n    {\n        UnifiedEnemyAI enemy = collision.collider.GetComponent<UnifiedEnemyAI>();\n        if (enemy != null)\n        {\n            enemy.TakeDamage(damage);\n        }\n\n        SlimeBossAI boss = collision.collider.GetComponent<SlimeBossAI>();\n        if (boss != null)\n        {\n            boss.TakeDamage(damage);\n        }\n\n        Destroy(gameObject);\n    }\n}"
      },
      {
        "file": "EnemyBullet.cs",
        "title": "EnemyBullet.cs - Enemy Projectiles",
        "language": "C#",
        "content": "using UnityEngine;\n\npublic class EnemyBullet : MonoBehaviour\n{\n    public int damage = 20; // Bullet damage\n    public float lifeTime = 2f;\n\n    void Start()\n    {\n        Destroy(gameObject, lifeTime); // Destroy bullet after some time\n    }\n\n    private void OnCollisionEnter(Collision collision)\n    {\n        // Check if the collided object is the player\n        PlayerHealth playerHealth = collision.collider.GetComponent<PlayerHealth>();\n        if (playerHealth != null)\n        {\n            playerHealth.TakeDamage(damage); // Deal damage to the player\n        }\n\n        Destroy(gameObject); // Destroy the bullet on impact\n    }\n}"
      },
      {
        "file": "CameraShake.cs",
        "title": "CameraShake.cs - Screen Effects",
        "language": "C#",
        "content": "using System.Collections;\nusing UnityEngine;\n\npublic class CameraShake : MonoBehaviour\n{\n    private Vector3 originalPosition;\n    public float shakeDuration = 0.5f;\n    public float shakeMagnitude = 0.1f;\n    private float shakeTimeRemaining;\n\n    void Start()\n    {\n        originalPosition = transform.localPosition;\n    }\n\n    public void Shake()\n    {\n        shakeTimeRemaining = shakeDuration;\n        StartCoroutine(ShakeCoroutine());\n    }\n\n    private IEnumerator ShakeCoroutine()\n    {\n        while (shakeTimeRemaining > 0)\n        {\n            float x = Random.Range(-shakeMagnitude, shakeMagnitude);\n            float y = Random.Range(-shakeMagnitude, shakeMagnitude);\n\n            // Apply the shake within a limited range around the original position\n            transform.localPosition = originalPosition + new Vector3(x, y, 0);\n\n            shakeTimeRemaining -= Time.deltaTime;\n            yield return null;\n        }\n\n        // Restore the original position after shaking\n        transform.localPosition = originalPosition;\n    }\n}"
      },
      {
        "file": "GameTimer.cs",
        "title": "GameTimer.cs - Game Management",
        "language": "C#",
        "content": "using TMPro;\nusing UnityEngine;\n\npublic class GameTimer : MonoBehaviour\n{\n    public TextMeshProUGUI timerText; // Assign a UI Text element to display the timer.\n    private float elapsedTime = 0f;   // Tracks the elapsed time.\n    private bool isPaused = false;    // Tracks whether the timer is paused.\n\n    void Update()\n    {\n        if (!isPaused && Time.timeScale > 0)\n        {\n            elapsedTime += Time.deltaTime;\n            UpdateTimerDisplay();\n        }\n    }\n\n    public void PauseTimer()\n    {\n        isPaused = true;\n    }\n\n    public void ResumeTimer()\n    {\n        isPaused = false;\n    }\n\n    private void UpdateTimerDisplay()\n    {\n        int minutes = Mathf.FloorToInt(elapsedTime / 60f);\n        int seconds = Mathf.FloorToInt(elapsedTime % 60f);\n        timerText.text = string.Format(\"{0:00}:{1:00}\", minutes, seconds);\n    }\n\n    public void SaveElapsedTime()\n    {\n        GameData.TotalTime = elapsedTime; // Save the total elapsed time\n    }\n}"
      },
      {
        "file": "GameData.cs",
        "title": "GameData.cs - Data Management",
        "language": "C#",
        "content": "using UnityEngine;\n\npublic static class GameData\n{\n    public static float TotalTime = 0f; // Store total elapsed time\n    public static int TotalScore = 0;   // Store total score\n}"
      },
      {
        "file": "Interactable.cs",
        "title": "Interactable.cs - Interaction System",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic abstract class Interactable : MonoBehaviour\n{\n    // add or remove events to gameobject\n    public bool useEvents;\n    // display message when near interactable\n    [SerializeField]\n    public string promptMessage;\n\n    // called from player\n    public void BaseInteract()\n    {\n        if (useEvents)\n            GetComponent<InteractionEvents>().OnInteract.Invoke();\n        Interact();\n    }\n\n    protected virtual void Interact()\n    {\n       \n    }\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "pixel-z",
    "title": "Pixel Z",
    "kind": "2D PLATFORMER · UNITY",
    "role": "Lead Developer",
    "blurb": "Retro-inspired platformer with tight, modern movement.",
    "built": [
      "Wall-slide and wall-jump controller",
      "Collectible-driven progression",
      "Pixel art assets"
    ],
    "cover": "PZ14.jpg",
    "tags": [
      "Unity",
      "2D Platformer"
    ],
    "description": "Pixel Z is a modern take on the classic 2D platformer, blending nostalgic pixel art with smooth movement, responsive combat, and thoughtfully crafted levels. Players traverse a post-apocalyptic world filled with hazards, enemies, and collectibles, mastering precise controls and timing to progress through increasingly challenging stages.",
    "contribution": "Lead Developer - Designed player movement systems, created pixel art assets, implemented combat mechanics, designed level architecture, and developed progression systems. Focused on creating responsive controls and satisfying gameplay loops.",
    "features": [
      "Tight and responsive platforming controls",
      "Dynamic combat and collectible-driven progression",
      "Stylized pixel art visuals with atmospheric environments",
      "Modern level design inspired by classic platformers",
      "Gradually increasing difficulty that rewards skill and exploration"
    ],
    "images": [
      "PZ1.jpg",
      "PZ2.jpg",
      "PZ3.jpg",
      "PZ4.jpg",
      "PZ5.jpg",
      "PZ6.jpg",
      "PZ7.jpg",
      "PZ8.jpg",
      "PZ9.jpg",
      "PZ10.jpg",
      "PZ11.jpg",
      "PZ12.jpg",
      "PZ13.jpg",
      "PZ14.jpg"
    ],
    "video": "1EyNT7vtar1VHJm5wV0ESRMCBf1kkAvFp",
    "code": [
      {
        "file": "PlayerMovement.cs",
        "title": "PlayerMovement.cs - Player Controller",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class PlayerMovement : MonoBehaviour\n{\n    public Rigidbody2D rb;\n    public Animator animator;\n    bool isFacingRight = true;\n    public ParticleSystem smokeFX;\n\n    [Header(\"Movement\")]\n    public float moveSpeed = 5f;\n    float horizontalMovement;\n\n    [Header(\"Jumping\")]\n    public float jumpPower = 10f;\n    public int maxJumps = 2;\n    int jumpsRemaining;\n\n    [Header(\"GroundCheck\")]\n    public Transform groundCheckPos;\n    public Vector2 groundCheckSize = new Vector2(0.5f, 0.5f);\n    public LayerMask groundLayer;\n    bool isGrounded;\n\n    [Header(\"Gravity\")]\n    public float baseGravity = 2f;\n    public float maxFallSpeed = 18f;\n    public float fallSpeedMultiplier = 2f;\n\n    [Header(\"WallCheck\")]\n    public Transform wallCheckPos;\n    public Vector2 wallCheckSize = new Vector2(0.5f, 0.5f);\n    public LayerMask wallLayer;\n\n    [Header(\"WallMovement\")]\n    public float wallSlideSpeed = 2f;\n    bool isWallSliding;\n\n    //Wall Jumping\n    bool isWallJumping;\n    float wallJumpDirection;\n    float wallJumpTime = 0.5f;\n    float wallJumpTimer;\n    public Vector2 wallJumpPower = new Vector2(5f, 10f);\n\n    void Update()\n    {\n        GroundCheck();\n        ProcessGravity();\n        ProcessWallSlide();\n        ProcessWallJump(); \n\n        if(!isWallJumping)\n        {\n            rb.linearVelocity = new Vector2(horizontalMovement * moveSpeed, rb.linearVelocity.y);\n            flip();\n        }\n        animator.SetFloat(\"yVelocity\", rb.linearVelocity.y);\n        animator.SetFloat(\"magnitude\", rb.linearVelocity.magnitude);\n        animator.SetBool(\"isWallSliding\", isWallSliding);\n    }\n\n    public void Move(InputAction.CallbackContext context)\n    {\n        horizontalMovement = context.ReadValue<Vector2>().x;\n    }\n\n    public void Jump(InputAction.CallbackContext context)\n    {\n        if (jumpsRemaining > 0)\n        {\n            if (context.performed)\n            {\n                rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpPower);\n                jumpsRemaining--;\n                JumpFX();\n            }\n            else if (context.canceled)\n            {\n                rb.linearVelocity = new Vector2(rb.linearVelocity.x, rb.linearVelocity.y * 0.5f);\n                jumpsRemaining--;\n                JumpFX();\n            }\n        }\n\n        //Wall Jump\n        if (context.performed && wallJumpTimer > 0f)\n        {\n            isWallJumping = true;\n            rb.linearVelocity = new Vector2(wallJumpDirection * wallJumpPower.x, wallJumpPower.y);\n            wallJumpTimer = 0f;\n            JumpFX();\n\n            //Force flip\n            if (transform.localScale.x != wallJumpDirection)\n            {\n                isFacingRight = !isFacingRight;\n                Vector3 ls = transform.localScale;\n                ls.x *= -1f;\n                transform.localScale = ls;\n            }\n\n            Invoke(nameof(CancelWallJump), wallJumpTime + 0.1f);\n        }\n    }\n\n    private void JumpFX()\n    {\n        animator.SetTrigger(\"jump\");\n        smokeFX.Play();\n    }\n\n    private void GroundCheck()\n    { \n        if (Physics2D.OverlapBox(groundCheckPos.position, groundCheckSize, 0, groundLayer))\n        {\n            jumpsRemaining = maxJumps;\n            isGrounded = true;\n        }\n        else\n        {\n            isGrounded = false;\n        }\n    }\n\n    private bool WallCheck()\n    {\n        return Physics2D.OverlapBox(wallCheckPos.position, wallCheckSize, 0, wallLayer);\n    }\n\n    private void ProcessGravity()\n    {\n        if (rb.linearVelocity.y < 0)\n        {\n            rb.gravityScale = baseGravity * fallSpeedMultiplier;\n            rb.linearVelocity = new Vector2(rb.linearVelocity.x, Mathf.Max(rb.linearVelocity.y - maxFallSpeed));\n        }\n        else\n        {\n            rb.gravityScale = baseGravity;\n        }\n    }\n\n    private void ProcessWallSlide()\n    {\n        if (!isGrounded & WallCheck() & horizontalMovement != 0)\n        {\n            isWallSliding = true;\n            rb.linearVelocity = new Vector2(rb.linearVelocity.x, Mathf.Max(rb.linearVelocity.y, -wallSlideSpeed));\n        }\n        else\n        {\n            isWallSliding = false;\n        }\n    }\n\n    private void ProcessWallJump()\n    {\n        if(isWallSliding)\n        {\n            wallJumpDirection = -transform.localScale.x;\n            wallJumpTimer = wallJumpTime;\n\n            CancelInvoke(nameof(CancelWallJump));\n        }\n        else if (wallJumpTimer > 0f)\n        {\n            wallJumpTimer -= Time.deltaTime;\n        }\n    }\n\n    private void CancelWallJump()\n    {\n        isWallJumping = false;\n    }\n\n    private void flip()\n    {\n        if (isFacingRight && horizontalMovement < 0 || !isFacingRight && horizontalMovement > 0)\n        {\n            isFacingRight = !isFacingRight;\n            Vector3 ls = transform.localScale;\n            ls.x *= -1f;\n            transform.localScale = ls;\n\n            if (rb.linearVelocity.y == 0f)\n            {\n                smokeFX.Play();\n            } \n        }\n    }\n\n    private void OnDrawGizmosSelected()\n    {\n        Gizmos.color = Color.white;\n        Gizmos.DrawWireCube(groundCheckPos.position, groundCheckSize);\n        Gizmos.color = Color.blue;\n        Gizmos.DrawWireCube(wallCheckPos.position, wallCheckSize);\n    }\n}"
      },
      {
        "file": "GameController.cs",
        "title": "GameController.cs - Game Management",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\nusing UnityEngine.UI;\nusing UnityEngine.SceneManagement;\nusing TMPro;\n\npublic class GameController : MonoBehaviour\n{\n    int progressAmount;\n    public Slider progressSlider;\n    public GameObject gameOverScreen;\n\n    void OnEnable()\n    {\n        PlayerHealth.OnPlayerDied += GameOverScreen;\n    }\n\n    void OnDisable()\n    {\n        PlayerHealth.OnPlayerDied -= GameOverScreen;\n    }\n\n    void Start()\n    {\n        progressAmount = 0;\n        progressSlider.value = 0;\n        gameOverScreen.SetActive(false);\n\n        Gem.OnGemCollect += IncreaseProgressAmount;\n        HoldToLoadLevel.OnHoldComplete += LoadNextLevel;\n    }\n\n    void GameOverScreen()\n    {\n        gameOverScreen.SetActive(true);\n        Time.timeScale = 0; // Pause the game\n    }\n\n    public void ResetGame()\n    {\n        Time.timeScale = 1; // Resume the game\n        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex); // Reloads the current level\n    }\n\n    void IncreaseProgressAmount(int amount)\n    {\n        progressAmount += amount;\n        progressSlider.value = progressAmount;\n        if (progressAmount >= 100)\n        {\n            Debug.Log(\"Level Complete\");\n        }\n    }\n\n    void LoadNextLevel()\n    {\n        if (progressAmount >= 100)\n        {\n            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);\n        }\n        else\n        {\n            Debug.Log(\"You need 100% progress to proceed!\");\n        }\n    }\n}"
      },
      {
        "file": "Gem.cs",
        "title": "Gem.cs - Collectible System",
        "language": "C#",
        "content": "using System;\nusing System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class Gem : MonoBehaviour, IITem\n{\n    public static event Action<int> OnGemCollect;\n    public int worth = 5;\n    \n    public void Collect()\n    {\n        OnGemCollect.Invoke(worth); \n        Destroy(gameObject);\n    }\n}"
      },
      {
        "file": "Collector.cs",
        "title": "Collector.cs - Item Collection Handler",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic class Collector : MonoBehaviour\n{\n    private void OnTriggerEnter2D(Collider2D collision)\n    {\n        IITem item = collision.GetComponent<IITem>();\n        if (item != null )\n        {\n            item.Collect();\n        }\n    }\n}"
      },
      {
        "file": "IITem.cs",
        "title": "IITem.cs - Item Interface",
        "language": "C#",
        "content": "using System.Collections;\nusing System.Collections.Generic;\nusing UnityEngine;\n\npublic interface IITem\n{\n    public void Collect();\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "tusok-tusok",
    "title": "Tusok Tusok",
    "kind": "ARCADE · MOBILE",
    "role": "Solo Game Developer",
    "blurb": "Fast-paced Filipino street-food catcher for mobile.",
    "built": [
      "Touch drag stick controls",
      "Level, spawn and timer system",
      "Lives and bomb hazard mechanic"
    ],
    "cover": "TusokPreview.png",
    "tags": [
      "Unity",
      "Game Design",
      "Filipino Culture"
    ],
    "description": "Tusok Tusok is a lively Filipino street food inspired mobile game that captures the energy and charm of local food stalls. Created entirely by Me, the game blends playful visuals, engaging mechanics, and cultural authenticity to celebrate the joy of Filipino street snacks. Players can explore different food categories including fried items, sweet treats, and grilled favorites while progressing through vibrant stages that resemble real Filipino street settings. With simple controls and an upbeat atmosphere, Tusok Tusok offers a fun and nostalgic experience that appeals to all ages.",
    "contribution": "Solo Game Developer – Responsible for gameplay mechanics, UI and UX design, cultural research, asset creation, and performance optimization for a smooth mobile experience.",
    "features": [
      "Grilled Items: Tenga, Isaw Manok, Dugo, Isaw Baboy, BBQ, Adidas",
      "Fried Items: Squid Ball, Fish Ball, Calamares, Chicken Ball, Hotdog, Kwek Kwek",
      "Sweet Items: Bananaque, Kamotecue, Karioka"
    ],
    "images": [
      "Tusok1.png",
      "Tusok2.png",
      "Tusok3.png",
      "Tusok4.png",
      "Tusok5.png",
      "Tusok6.png",
      "Tusok7.png",
      "Tusok8.png",
      "Tusok9.png",
      "Tusok10.png"
    ],
    "video": "1OUx6uEUlgSv9ZW9gHh36zDy1_Jc92suJ",
    "code": [
      {
        "file": "GameManager.cs",
        "title": "GameManager.cs - Core Game Management",
        "language": "C#",
        "content": "using UnityEngine;\nusing UnityEngine.UI;\nusing System.Collections;\nusing TMPro;\n\npublic class GameManager : MonoBehaviour\n{\n    [Header(\"Game Settings\")]\n    public float gameTime = 120f;\n    public int targetScore = 100;\n    public int lives = 3;\n    \n    [Header(\"Level Settings\")]\n    public int currentLevel = 1;\n    public bool isEndlessMode = false;\n    \n    [Header(\"UI Elements\")]\n    public TextMeshProUGUI scoreText;\n    public TextMeshProUGUI timerText;\n    public TextMeshProUGUI livesText;\n    public GameObject gameOverPanel;\n    public GameOverPanel gameOverPanelScript;\n    public GameObject pausePanel;\n    public Button pauseButton;\n    public Button resumeButton;\n    public Button restartButton;\n    public Button quitButton;\n    \n    [Header(\"Scene Settings\")]\n    public string gameLevelsSceneName = \"GameLevels\";\n    \n    [Header(\"Audio Settings\")]\n    public AudioClip buttonClickSound;\n    public AudioClip pauseButtonSound;\n    public AudioClip resumeQuitButtonSound;\n    public AudioClip gameOverSound;\n    [Range(0f, 1f)]\n    public float buttonSoundVolume = 0.8f;\n    \n    [Header(\"Dialogue System\")]\n    public DialogueScript dialogueScript;\n    \n    // Game State\n    private int currentScore = 0;\n    private float currentTime;\n    private bool isGameActive = false;\n    private bool isPaused = false;\n    private int currentLives;\n    private int bombsCaught = 0;\n    private bool isRestarting = false;\n    \n    public static GameManager Instance;\n    \n    void Awake()\n    {\n        if (Instance == null)\n        {\n            Instance = this;\n            \n            if (FoodManager.Instance != null)\n            {\n                Debug.Log(\"[GameManager] Cleaning FoodManager on fresh GameManager start\");\n                FoodManager.Instance.StopSpawning();\n                FoodManager.Instance.CleanupSpawnedItems();\n                FoodManager.Instance.ResetSpawnHistory();\n            }\n        }\n        else\n        {\n            Debug.Log(\"[GameManager] Destroying duplicate GameManager instance\");\n            Destroy(gameObject);\n            return;\n        }\n    }\n    \n    void Start()\n    {\n        Debug.Log(\"[GameManager] === GameManager.Start() Called ===\");\n        InitializeGame();\n    }\n    \n    void Update()\n    {\n        if (isGameActive && !isPaused)\n        {\n            UpdateTimer();\n            UpdateUI();\n        }\n    }\n    \n    void PlayButtonClickSound()\n    {\n        if (buttonClickSound != null)\n        {\n            if (AudioManager.Instance != null)\n            {\n                AudioManager.Instance.PlaySFX(buttonClickSound.name, buttonSoundVolume);\n            }\n            else\n            {\n                AudioSource.PlayClipAtPoint(buttonClickSound, Camera.main.transform.position, buttonSoundVolume);\n            }\n        }\n    }\n    \n    public void AddScore(int points)\n    {\n        currentScore += points;\n        Debug.Log($\"Score added: {points}. Current score: {currentScore}\");\n        \n        if (currentScore >= targetScore && !isEndlessMode)\n        {\n            EndGame(true);\n        }\n    }\n    \n    public void LoseLife()\n    {\n        currentLives--;\n        Debug.Log($\"Life lost. Current lives: {currentLives}\");\n        \n        if (HeartUIManager.Instance != null)\n        {\n            HeartUIManager.Instance.RemoveHeart();\n        }\n        \n        if (currentLives <= 0 && !isRestarting)\n        {\n            EndGame(false);\n        }\n    }\n    \n    public void CatchBomb()\n    {\n        bombsCaught++;\n        Debug.Log($\"Bomb caught! Total bombs: {bombsCaught}\");\n        \n        if (bombsCaught >= 2)\n        {\n            bombsCaught = 0;\n            LoseLife();\n        }\n        else\n        {\n            if (HeartUIManager.Instance != null)\n            {\n                HeartUIManager.Instance.DamageHeart();\n            }\n        }\n    }\n    \n    public void TogglePause()\n    {\n        isPaused = !isPaused;\n        Time.timeScale = isPaused ? 0f : 1f;\n        \n        if (pausePanel != null)\n            pausePanel.SetActive(isPaused);\n            \n        PlayPauseButtonSound();\n    }\n    \n    public void ResumeGame()\n    {\n        isPaused = false;\n        Time.timeScale = 1f;\n        \n        if (pausePanel != null)\n            pausePanel.SetActive(false);\n            \n        PlayResumeQuitButtonSound();\n    }\n    \n    public void RestartGame()\n    {\n        isRestarting = true;\n        PlayButtonClickSound();\n        \n        Time.timeScale = 1f;\n        \n        if (FoodManager.Instance != null)\n        {\n            FoodManager.Instance.StopSpawning();\n            FoodManager.Instance.CleanupSpawnedItems();\n            FoodManager.Instance.ResetSpawnHistory();\n        }\n        \n        if (HeartUIManager.Instance != null)\n        {\n            HeartUIManager.Instance.ResetHearts();\n        }\n        \n        InitializeGame(true);\n        isRestarting = false;\n    }\n    \n    void InitializeGame(bool forceRestart = false)\n    {\n        Debug.Log(\"[GameManager] Initializing game...\");\n        LoadLevelFromPlayerPrefs();\n        \n        currentScore = 0;\n        currentTime = gameTime;\n        currentLives = lives;\n        isGameActive = false;\n        isPaused = false;\n        bombsCaught = 0;\n        \n        if (FoodManager.Instance != null)\n        {\n            FoodManager.Instance.StopSpawning();\n            FoodManager.Instance.CleanupSpawnedItems();\n            FoodManager.Instance.ResetSpawnHistory();\n        }\n        \n        SetupUI();\n        \n        if (gameOverPanel != null)\n        {\n            gameOverPanel.SetActive(false);\n        }\n            \n        if (gameOverPanelScript != null)\n        {\n            gameOverPanelScript.gameObject.SetActive(false);\n        }\n            \n        if (pausePanel != null)\n        {\n            pausePanel.SetActive(false);\n        }\n        \n        if (HeartUIManager.Instance != null)\n        {\n            HeartUIManager.Instance.ResetHearts();\n        }\n        \n        if (dialogueScript != null && !forceRestart)\n        {\n            dialogueScript.OnDialogueComplete.RemoveAllListeners();\n            dialogueScript.OnDialogueComplete.AddListener(OnDialogueComplete);\n            dialogueScript.StartDialogue();\n        }\n        else\n        {\n            StartGameplay();\n        }\n        \n        StartBackgroundMusic();\n    }\n    \n    void StartGameplay()\n    {\n        Debug.Log(\"[GameManager] Starting gameplay...\");\n        isGameActive = true;\n        \n        ConfigureLevelSettings(currentLevel);\n        \n        if (FoodManager.Instance != null)\n        {\n            FoodManager.Instance.StopSpawning();\n            FoodManager.Instance.CleanupSpawnedItems();\n            StartCoroutine(StartSpawningAfterDelay());\n        }\n        else\n        {\n            Debug.LogError(\"[GameManager] FoodManager.Instance is null when starting gameplay!\");\n        }\n        \n        UpdateUI();\n        Debug.Log(\"[GameManager] Game started successfully\");\n    }\n    \n    void UpdateTimer()\n    {\n        currentTime -= Time.deltaTime;\n        \n        if (currentTime <= 0 && !isRestarting)\n        {\n            currentTime = 0;\n            EndGame(false);\n        }\n    }\n    \n    void UpdateUI()\n    {\n        if (scoreText != null)\n            scoreText.text = \"Score: \" + currentScore;\n            \n        if (timerText != null)\n        {\n            int minutes = Mathf.FloorToInt(currentTime / 60f);\n            int seconds = Mathf.FloorToInt(currentTime % 60f);\n            timerText.text = string.Format(\"{0:00}:{1:00}\", minutes, seconds);\n        }\n        \n        if (livesText != null)\n            livesText.text = \"Lives: \" + currentLives;\n    }\n    \n    void EndGame(bool won = false)\n    {\n        Debug.Log($\"[GameManager] EndGame called - Won: {won}, IsRestarting: {isRestarting}\");\n        if (isRestarting)\n        {\n            Debug.Log(\"[GameManager] Ignoring EndGame call during restart\");\n            return;\n        }\n        \n        isGameActive = false;\n        isPaused = false;\n        Time.timeScale = 1f;\n        \n        if (FoodManager.Instance != null)\n        {\n            FoodManager.Instance.StopSpawning();\n        }\n        \n        PlayGameOverSound();\n        \n        if (gameOverPanelScript != null)\n        {\n            gameOverPanelScript.ShowGameOver(won, currentScore, Mathf.FloorToInt(gameTime - currentTime));\n        }\n        else if (gameOverPanel != null)\n        {\n            gameOverPanel.SetActive(true);\n        }\n        \n        if (FoodManager.Instance != null)\n        {\n            FoodManager.Instance.CleanupSpawnedItems();\n        }\n        \n        Debug.Log($\"[GameManager] Game ended - Final Score: {currentScore}\");\n    }\n}"
      },
      {
        "file": "MainMenu.cs",
        "title": "MainMenu.cs - Menu Management System",
        "language": "C#",
        "content": "using UnityEngine;\nusing UnityEngine.UI;\nusing UnityEngine.SceneManagement;\nusing TMPro;\n\npublic class MainMenu : MonoBehaviour\n{\n    [Header(\"Main Menu Buttons\")]\n    public Button playButton;\n    public Button optionsButton;\n    public Button quitButton;\n    \n    [Header(\"Options Panel\")]\n    public GameObject optionsPanel;\n    public Button confirmButton;\n    public Button returnButton;\n    \n    [Header(\"Settings Integration\")]\n    public Settings settingsScript;\n    \n    [Header(\"Scene Settings\")]\n    public string gameLevelsSceneName = \"GameLevels\";\n    \n    [Header(\"Background Music\")]\n    public AudioClip backgroundMusicClip;\n    public AudioClip inGameMusicClip;\n    public bool persistMusicAcrossScenes = true;\n    [Range(0f, 1f)]\n    public float musicVolume = 0.7f;\n    \n    [Header(\"Button Sounds\")]\n    public AudioClip buttonClickSound;\n    [Range(0f, 1f)]\n    public float buttonSoundVolume = 0.8f;\n    \n    [Header(\"Scene Music Settings\")]\n    public string[] menuScenes = {\"MainMenu\", \"GameLevels\"};\n    public string[] gameScenes = {\"GameScene\", \"Level1\", \"Level2\", \"Level3\"};\n    \n    private AudioSource backgroundAudioSource;\n    private static MainMenu musicInstance;\n    private string currentScene;\n    private bool isInGameScene = false;\n    \n    void Awake()\n    {\n        HandleMusicPersistence();\n        Debug.Log(\"[MainMenu] MainMenu Awake - Finding scene references\");\n        FindMissingReferences();\n        SetupBackgroundAudioSource();\n    }\n    \n    void HandleMusicPersistence()\n    {\n        if (persistMusicAcrossScenes)\n        {\n            if (musicInstance == null)\n            {\n                musicInstance = this;\n                DontDestroyOnLoad(gameObject);\n                Debug.Log(\"[MainMenu] Created persistent music instance\");\n            }\n            else if (musicInstance != this)\n            {\n                Debug.Log(\"[MainMenu] Destroying duplicate MainMenu, keeping persistent music\");\n                Destroy(gameObject);\n                return;\n            }\n        }\n    }\n    \n    void SetupBackgroundAudioSource()\n    {\n        backgroundAudioSource = GetComponent<AudioSource>();\n        if (backgroundAudioSource == null)\n        {\n            backgroundAudioSource = gameObject.AddComponent<AudioSource>();\n            Debug.Log(\"[MainMenu] Created new AudioSource component\");\n        }\n        \n        backgroundAudioSource.loop = true;\n        backgroundAudioSource.playOnAwake = false;\n        backgroundAudioSource.volume = musicVolume;\n        backgroundAudioSource.spatialBlend = 0f;\n        \n        Debug.Log($\"[MainMenu] AudioSource configured - Ready for dynamic clip assignment, Volume: {musicVolume}\");\n    }\n    \n    void PlayButtonClickSound()\n    {\n        if (buttonClickSound != null)\n        {\n            if (AudioManager.Instance != null)\n            {\n                AudioManager.Instance.PlaySFX(buttonClickSound.name, buttonSoundVolume);\n                Debug.Log($\"[MainMenu] Playing button click sound via AudioManager: {buttonClickSound.name}\");\n            }\n            else\n            {\n                AudioSource.PlayClipAtPoint(buttonClickSound, Camera.main.transform.position, buttonSoundVolume);\n                Debug.Log($\"[MainMenu] Playing button click sound via PlayClipAtPoint: {buttonClickSound.name}\");\n            }\n        }\n        else\n        {\n            Debug.LogWarning(\"[MainMenu] Button click sound is null!\");\n        }\n    }\n    \n    System.Collections.IEnumerator PlayButtonSoundAndLoadScene(string sceneName, int fallbackBuildIndex = -1)\n    {\n        PlayButtonClickSound();\n        yield return new WaitForSeconds(0.15f);\n        \n        try\n        {\n            SceneManager.LoadScene(sceneName);\n            Debug.Log($\"[MainMenu] Successfully loaded scene: {sceneName}\");\n        }\n        catch (System.Exception e)\n        {\n            Debug.LogError($\"[MainMenu] Failed to load scene '{sceneName}': {e.Message}\");\n            if (fallbackBuildIndex >= 0)\n            {\n                SceneManager.LoadScene(fallbackBuildIndex);\n                Debug.Log($\"[MainMenu] Loaded fallback scene at build index: {fallbackBuildIndex}\");\n            }\n        }\n    }\n    \n    void Start()\n    {\n        Debug.Log(\"[MainMenu] MainMenu Start called\");\n        RestoreMainMenuReferences();\n        SetupButtons();\n        SetupOptionsPanel();\n        EnsureSettingsPanelClosed();\n        LoadSettings();\n        CheckCurrentSceneAndStartMusic();\n        ForceCloseAllPanels();\n    }\n    \n    void FindMissingReferences()\n    {\n        Debug.Log(\"[MainMenu] Finding missing references...\");\n        \n        if (settingsScript == null)\n        {\n            GameObject settingsGO = GameObject.Find(\"Settings\");\n            if (settingsGO == null)\n            {\n                Settings[] allSettings = FindObjectsByType<Settings>(FindObjectsSortMode.None);\n                if (allSettings.Length > 0)\n                {\n                    settingsScript = allSettings[0];\n                    Debug.Log(\"[MainMenu] Found Settings component via FindObjectsByType\");\n                }\n            }\n            else\n            {\n                settingsScript = settingsGO.GetComponent<Settings>();\n                Debug.Log(\"[MainMenu] Found Settings component via GameObject.Find\");\n            }\n        }\n        \n        if (playButton == null)\n        {\n            GameObject playGO = GameObject.Find(\"PlayButton\");\n            if (playGO != null)\n            {\n                playButton = playGO.GetComponent<Button>();\n                Debug.Log(\"[MainMenu] Found PlayButton via GameObject.Find\");\n            }\n        }\n        \n        if (optionsButton == null)\n        {\n            GameObject optionsGO = GameObject.Find(\"OptionsButton\");\n            if (optionsGO != null)\n            {\n                optionsButton = optionsGO.GetComponent<Button>();\n                Debug.Log(\"[MainMenu] Found OptionsButton via GameObject.Find\");\n            }\n        }\n        \n        if (quitButton == null)\n        {\n            GameObject quitGO = GameObject.Find(\"QuitButton\");\n            if (quitGO != null)\n            {\n                quitButton = quitGO.GetComponent<Button>();\n                Debug.Log(\"[MainMenu] Found QuitButton via GameObject.Find\");\n            }\n        }\n    }\n    \n    void SetupButtons()\n    {\n        Debug.Log(\"[MainMenu] Setting up button listeners...\");\n        if (playButton != null)\n            playButton.onClick.AddListener(OnPlayClicked);\n            \n        if (optionsButton != null)\n            optionsButton.onClick.AddListener(OnOptionsClicked);\n            \n        if (quitButton != null)\n            quitButton.onClick.AddListener(OnQuitClicked);\n            \n        if (confirmButton != null)\n            confirmButton.onClick.AddListener(OnConfirmClicked);\n            \n        if (returnButton != null)\n            returnButton.onClick.AddListener(OnReturnClicked);\n    }\n    \n    // Button Event Handlers\n    public void OnPlayClicked()\n    {\n        Debug.Log(\"[MainMenu] Play button clicked\");\n        StartCoroutine(PlayButtonSoundAndLoadScene(gameLevelsSceneName, 1));\n    }\n    \n    public void OnOptionsClicked()\n    {\n        Debug.Log(\"[MainMenu] Options button clicked\");\n        PlayButtonClickSound();\n        \n        if (settingsScript == null || optionsPanel == null)\n        {\n            FindMissingReferences();\n        }\n        \n        if (settingsScript != null)\n        {\n            Debug.Log(\"[MainMenu] Opening settings panel via Settings script\");\n            settingsScript.OpenSettings();\n            \n            if (settingsScript.settingsPanel != null)\n            {\n                settingsScript.settingsPanel.SetActive(true);\n            }\n        }\n        else if (optionsPanel != null)\n        {\n            Debug.Log(\"[MainMenu] Opening options panel directly\");\n            optionsPanel.SetActive(true);\n        }\n        else\n        {\n            Debug.LogError(\"[MainMenu] No options panel or settings script available!\");\n            GameObject optionsGO = GameObject.Find(\"OptionsPanel\");\n            if (optionsPanel != null)\n            {\n                optionsPanel.SetActive(true);\n            }\n        }\n    }\n    \n    public void OnQuitClicked()\n    {\n        Debug.Log(\"[MainMenu] Quit button clicked\");\n        PlayButtonClickSound();\n        \n        #if UNITY_EDITOR\n            UnityEditor.EditorApplication.isPlaying = false;\n            Debug.Log(\"[MainMenu] Quit game in editor\");\n        #else\n            Application.Quit();\n            Debug.Log(\"[MainMenu] Quit application\");\n        #endif\n    }\n    \n    public void OnConfirmClicked()\n    {\n        Debug.Log(\"[MainMenu] Confirm button clicked\");\n        PlayButtonClickSound();\n        \n        if (settingsScript != null)\n        {\n            settingsScript.SaveSettings();\n        }\n        else if (optionsPanel != null)\n        {\n            Debug.Log(\"[MainMenu] Closing options panel directly\");\n            optionsPanel.SetActive(false);\n        }\n    }\n    \n    public void OnReturnClicked()\n    {\n        Debug.Log(\"[MainMenu] Return button clicked\");\n        PlayButtonClickSound();\n        \n        if (settingsScript != null)\n        {\n            settingsScript.CloseSettings();\n        }\n        else if (optionsPanel != null)\n        {\n            Debug.Log(\"[MainMenu] Closing options panel directly via return\");\n            optionsPanel.SetActive(false);\n        }\n    }\n    \n    void StartBackgroundMusic()\n    {\n        if (backgroundAudioSource != null && backgroundMusicClip != null)\n        {\n            Debug.Log(\"[MainMenu] Starting background music\");\n            if (backgroundAudioSource.isPlaying)\n            {\n                backgroundAudioSource.Stop();\n            }\n            \n            backgroundAudioSource.clip = backgroundMusicClip;\n            backgroundAudioSource.volume = musicVolume;\n            backgroundAudioSource.Play();\n            \n            Debug.Log($\"[MainMenu] Background music started: {backgroundMusicClip.name}\");\n        }\n        else if (backgroundMusicClip == null)\n        {\n            Debug.LogWarning(\"[MainMenu] Background music clip is null - checking AudioManager\");\n            if (AudioManager.Instance != null)\n            {\n                Debug.Log(\"[MainMenu] Delegating music to AudioManager\");\n            }\n        }\n        else\n        {\n            Debug.LogError(\"[MainMenu] AudioSource is null - cannot play background music\");\n        }\n    }\n}"
      },
      {
        "file": "StickController.cs",
        "title": "StickController.cs - Player Input and Movement",
        "language": "C#",
        "content": "using UnityEngine;\n\npublic class StickController : MonoBehaviour\n{\n    [Header(\"Movement Settings\")]\n    public float moveSpeed = 100f;\n    public float leftBound = -4f;\n    public float rightBound = 4f;\n    public bool useMouseInput = true;\n    public bool useTouchInput = true;\n    \n    [Header(\"Components\")]\n    public Transform stickTransform;\n    \n    private Camera mainCamera;\n    private bool isDragging = false;\n    private Vector3 offset;\n    private float stickY;\n    private bool allowClamping = false;\n    \n    void Start()\n    {\n        mainCamera = Camera.main;\n        if (mainCamera == null)\n            mainCamera = FindFirstObjectByType<Camera>();\n            \n        if (stickTransform == null)\n            stickTransform = transform;\n            \n        stickY = stickTransform.localPosition.y;\n        \n        // Calculate bounds based on parent canvas/screen size\n        if (stickTransform.parent != null)\n        {\n            RectTransform parentRect = stickTransform.parent.GetComponent<RectTransform>();\n            if (parentRect != null)\n            {\n                float parentWidth = parentRect.rect.width;\n                leftBound = -parentWidth / 2f + 50f;\n                rightBound = parentWidth / 2f - 50f;\n                Debug.Log($\"Using parent RectTransform width: {parentWidth}, bounds: {leftBound} to {rightBound}\");\n            }\n            else\n            {\n                leftBound = -1000f;\n                rightBound = 1000f;\n                Debug.Log($\"No RectTransform found, using wide fallback bounds: {leftBound} to {rightBound}\");\n            }\n        }\n        else\n        {\n            if (mainCamera != null)\n            {\n                float cameraWidth = mainCamera.orthographicSize * 2f * mainCamera.aspect;\n                leftBound = -cameraWidth / 2f + 0.5f;\n                rightBound = cameraWidth / 2f - 0.5f;\n                Debug.Log($\"Using camera-based bounds: {leftBound} to {rightBound}\");\n            }\n            else\n            {\n                leftBound = -10f;\n                rightBound = 10f;\n                Debug.Log($\"Using default bounds: {leftBound} to {rightBound}\");\n            }\n        }\n        \n        // Center the stick horizontally at start\n        Vector3 centerPosition = stickTransform.localPosition;\n        centerPosition.x = 0f;\n        centerPosition.y = stickY;\n        stickTransform.localPosition = centerPosition;\n        \n        Debug.Log($\"Positioned stick at local position: {centerPosition}\");\n        \n        // Setup collider for catching items\n        Collider2D existingCollider = GetComponent<Collider2D>();\n        if (existingCollider == null)\n        {\n            BoxCollider2D boxCollider = gameObject.AddComponent<BoxCollider2D>();\n            boxCollider.isTrigger = true;\n            boxCollider.size = new Vector2(2f, 0.5f);\n            Debug.Log(\"Added BoxCollider2D to stick\");\n        }\n        else\n        {\n            existingCollider.isTrigger = true;\n            Debug.Log(\"Using existing collider: \" + existingCollider.GetType().Name);\n        }\n        \n        if (!gameObject.CompareTag(\"Player\"))\n        {\n            gameObject.tag = \"Player\";\n            Debug.Log(\"Set stick tag to Player\");\n        }\n        \n        Debug.Log(\"Stick initialized at position: \" + stickTransform.position);\n        Debug.Log(\"Camera found: \" + (mainCamera != null));\n        Debug.Log($\"Movement bounds set to: Left={leftBound}, Right={rightBound}\");\n        \n        Invoke(\"EnableClamping\", 0.1f);\n    }\n    \n    void EnableClamping()\n    {\n        allowClamping = true;\n        Debug.Log(\"Clamping enabled - stick should now stay within bounds when moving\");\n    }\n    \n    void Update()\n    {\n        HandleInput();\n        ClampPosition();\n    }\n    \n    void HandleInput()\n    {\n        bool touchHandled = false;\n        \n        // Touch input for mobile - optimized for Unity Remote\n        if (useTouchInput && Input.touchCount > 0)\n        {\n            Touch touch = Input.GetTouch(0);\n            \n            Vector2 screenPos = touch.position;\n            float screenWidth = Screen.width;\n            float screenPercent = (screenPos.x / screenWidth) - 0.5f; // -0.5 to 0.5\n            \n            switch (touch.phase)\n            {\n                case TouchPhase.Began:\n                    isDragging = true;\n                    touchHandled = true;\n                    break;\n                    \n                case TouchPhase.Moved:\n                case TouchPhase.Stationary:\n                    if (isDragging)\n                    {\n                        float targetX = screenPercent * (rightBound - leftBound);\n                        Vector3 newLocalPosition = stickTransform.localPosition;\n                        newLocalPosition.x = targetX;\n                        newLocalPosition.y = stickY;\n                        \n                        stickTransform.localPosition = newLocalPosition;\n                        touchHandled = true;\n                    }\n                    break;\n                    \n                case TouchPhase.Ended:\n                case TouchPhase.Canceled:\n                    isDragging = false;\n                    touchHandled = true;\n                    break;\n            }\n        }\n        \n        // Mouse input for PC testing - only if touch wasn't handled\n        if (useMouseInput && !touchHandled)\n        {\n            if (Input.GetMouseButtonDown(0))\n            {\n                Vector3 mouseWorldPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);\n                mouseWorldPos.z = 0;\n                \n                isDragging = true;\n                Vector3 localMousePos = stickTransform.parent.InverseTransformPoint(mouseWorldPos);\n                offset = stickTransform.localPosition - localMousePos;\n            }\n            \n            if (Input.GetMouseButton(0) && isDragging)\n            {\n                Vector3 mouseWorldPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);\n                mouseWorldPos.z = 0;\n                \n                Vector3 localMousePos = stickTransform.parent.InverseTransformPoint(mouseWorldPos);\n                Vector3 newLocalPosition = localMousePos + offset;\n                newLocalPosition.y = stickY;\n                \n                stickTransform.localPosition = newLocalPosition;\n            }\n            \n            if (Input.GetMouseButtonUp(0))\n            {\n                isDragging = false;\n            }\n        }\n        \n        // Keyboard input as alternative (for testing)\n        if (!isDragging)\n        {\n            float horizontal = Input.GetAxis(\"Horizontal\");\n            if (Mathf.Abs(horizontal) > 0.1f)\n            {\n                Vector3 movement = Vector3.right * horizontal * moveSpeed * Time.deltaTime;\n                stickTransform.localPosition += movement;\n            }\n        }\n    }\n    \n    void ClampPosition()\n    {\n        if (!allowClamping) return;\n        \n        Vector3 localPosition = stickTransform.localPosition;\n        float originalX = localPosition.x;\n        \n        localPosition.x = Mathf.Clamp(localPosition.x, leftBound, rightBound);\n        localPosition.y = stickY;\n        \n        stickTransform.localPosition = localPosition;\n        \n        if (Mathf.Abs(originalX - localPosition.x) > 0.01f)\n        {\n            Debug.LogWarning($\"CLAMPING: Stick moved from X={originalX:F2} to X={localPosition.x:F2} (bounds: {leftBound:F2} to {rightBound:F2})\");\n        }\n    }\n    \n    void OnTriggerEnter2D(Collider2D other)\n    {\n        FallingItem item = other.GetComponent<FallingItem>();\n        if (item != null)\n        {\n            // The FallingItem script will handle the logic\n        }\n    }\n    \n    // Public methods for external control\n    public void SetBounds(float left, float right)\n    {\n        leftBound = left;\n        rightBound = right;\n    }\n    \n    public void SetMoveSpeed(float speed)\n    {\n        moveSpeed = speed;\n    }\n    \n    public Vector3 GetStickPosition()\n    {\n        return stickTransform.localPosition;\n    }\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "lucid-dreams",
    "title": "Lucid Dreams",
    "kind": "PHYSICS ACTION · UNITY",
    "role": "Game Designer",
    "blurb": "A surreal dream world where furniture fights back.",
    "built": [
      "Dreamscape environments",
      "Ragdoll physics sandbox encounters",
      "Surreal low-poly visual style"
    ],
    "cover": "LD2.jpg",
    "tags": [
      "C#",
      "Unity",
      "Action"
    ],
    "description": "Lucid Dreams throws players into a wild, dreamlike world where logic doesn’t exist, and the most unexpected things can become enemies. Fight absurd objects like sentient appliances, explore chaotic dreamscapes, and survive ridiculous encounters in a physics-driven sandbox filled with humor and unpredictability. Every dream is a new story of chaos and laughter.",
    "contribution": "Game Designer - Created and designed the dream world environments, developed the surreal visual style, and crafted immersive, interactive settings that enhance the game’s comedic and chaotic atmosphere.",
    "features": [
      "Dynamic ragdoll physics and comedic combat",
      "Surreal enemies like possessed household objects",
      "Expansive open environments with sandbox interactions",
      "Unpredictable dream logic and events",
      "Light-hearted humor mixed with action gameplay",
      "Built in Unity with stylized low-poly visuals"
    ],
    "images": [
      "LD1.jpg",
      "LD2.jpg",
      "LD3.jpg",
      "LD4.jpg",
      "LD5.jpg",
      "LD6.jpg",
      "LD7.jpg",
      "LD8.jpg",
      "LD9.jpg"
    ],
    "video": "1kv063gbKzSJPvY0CWHXFyyK4QKNBzn87",
    "code": [
      {
        "file": "DreamController.cs",
        "title": "DreamController.cs - Main Dream Navigation System",
        "language": "C#",
        "content": "using UnityEngine;\nusing System.Collections;\n\npublic class DreamController : MonoBehaviour\n{\n    [Header(\"Dream Environment Settings\")]\n    public Transform player;\n    public Transform[] dreamLayers;\n    public Material[] dreamMaterials;\n    public Light dreamLight;\n    \n    [Header(\"Physics Settings\")]\n    public float gravityMultiplier = 0.5f;\n    public float floatForce = 10f;\n    \n    private bool isLucidMode = false;\n    private float timeInDream = 0f;\n    \n    void Start()\n    {\n        // Initialize dream physics\n        Physics.gravity *= gravityMultiplier;\n        StartCoroutine(DreamCycle());\n    }\n    \n    void Update()\n    {\n        timeInDream += Time.deltaTime;\n        UpdateDreamState();\n        HandleLucidMode();\n    }\n    \n    void UpdateDreamState()\n    {\n        // Cycle through dream materials for morphing effect\n        float cycleTime = Mathf.Sin(timeInDream * 0.1f);\n        \n        foreach (var layer in dreamLayers)\n        {\n            if (layer != null)\n            {\n                var renderer = layer.GetComponent<Renderer>();\n                if (renderer != null)\n                {\n                    renderer.material.SetFloat(\"_TimeOffset\", cycleTime);\n                }\n            }\n        }\n        \n        // Dynamic lighting changes\n        if (dreamLight != null)\n        {\n            dreamLight.intensity = Mathf.Lerp(0.5f, 2f, \n                (Mathf.Sin(timeInDream * 0.05f) + 1f) / 2f);\n            \n            dreamLight.color = Color.Lerp(\n                Color.blue, Color.magenta,\n                (Mathf.Cos(timeInDream * 0.03f) + 1f) / 2f\n            );\n        }\n    }\n    \n    void HandleLucidMode()\n    {\n        if (Input.GetKeyDown(KeyCode.L))\n        {\n            ToggleLucidMode();\n        }\n        \n        if (isLucidMode)\n        {\n            // Allow player to manipulate dream environment\n            if (Input.GetMouseButtonDown(0))\n            {\n                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);\n                RaycastHit hit;\n                \n                if (Physics.Raycast(ray, out hit))\n                {\n                    StartCoroutine(DreamObjectManipulation(hit.collider.gameObject));\n                }\n            }\n        }\n    }\n    \n    void ToggleLucidMode()\n    {\n        isLucidMode = !isLucidMode;\n        \n        if (isLucidMode)\n        {\n            Debug.Log(\"Lucid mode activated - Reality bends to your will\");\n            Time.timeScale = 0.7f; // Slow down time\n        }\n        else\n        {\n            Debug.Log(\"Returning to normal dream state\");\n            Time.timeScale = 1f;\n        }\n    }\n    \n    IEnumerator DreamCycle()\n    {\n        while (true)\n        {\n            // Random dream events\n            yield return new WaitForSeconds(Random.Range(10f, 30f));\n            TriggerDreamEvent();\n        }\n    }\n    \n    void TriggerDreamEvent()\n    {\n        int eventType = Random.Range(0, 3);\n        \n        switch (eventType)\n        {\n            case 0:\n                StartCoroutine(GravityShift());\n                break;\n            case 1:\n                StartCoroutine(EnvironmentMorph());\n                break;\n            case 2:\n                StartCoroutine(ColorFlash());\n                break;\n        }\n    }\n    \n    IEnumerator DreamObjectManipulation(GameObject obj)\n    {\n        Vector3 originalPos = obj.transform.position;\n        Vector3 targetPos = originalPos + Vector3.up * 5f;\n        \n        float duration = 2f;\n        float elapsed = 0f;\n        \n        while (elapsed < duration)\n        {\n            float t = elapsed / duration;\n            obj.transform.position = Vector3.Lerp(originalPos, targetPos, \n                Mathf.Sin(t * Mathf.PI));\n            \n            elapsed += Time.deltaTime;\n            yield return null;\n        }\n        \n        obj.transform.position = originalPos;\n    }\n    \n    IEnumerator GravityShift()\n    {\n        Vector3 originalGravity = Physics.gravity;\n        Vector3 newGravity = new Vector3(\n            Random.Range(-10f, 10f),\n            Random.Range(-20f, 5f),\n            Random.Range(-10f, 10f)\n        );\n        \n        float duration = 5f;\n        float elapsed = 0f;\n        \n        while (elapsed < duration)\n        {\n            Physics.gravity = Vector3.Lerp(originalGravity, newGravity, \n                Mathf.Sin((elapsed / duration) * Mathf.PI));\n            \n            elapsed += Time.deltaTime;\n            yield return null;\n        }\n        \n        Physics.gravity = originalGravity;\n    }\n    \n    IEnumerator EnvironmentMorph()\n    {\n        foreach (var layer in dreamLayers)\n        {\n            if (layer != null)\n            {\n                StartCoroutine(MorphLayer(layer));\n            }\n        }\n        \n        yield return new WaitForSeconds(3f);\n    }\n    \n    IEnumerator MorphLayer(Transform layer)\n    {\n        Vector3 originalScale = layer.localScale;\n        Vector3 morphScale = originalScale * Random.Range(0.5f, 2f);\n        \n        float duration = 3f;\n        float elapsed = 0f;\n        \n        while (elapsed < duration)\n        {\n            float t = elapsed / duration;\n            layer.localScale = Vector3.Lerp(originalScale, morphScale, \n                Mathf.Sin(t * Mathf.PI));\n            \n            elapsed += Time.deltaTime;\n            yield return null;\n        }\n        \n        layer.localScale = originalScale;\n    }\n    \n    IEnumerator ColorFlash()\n    {\n        Color originalColor = dreamLight.color;\n        Color flashColor = new Color(\n            Random.Range(0f, 1f),\n            Random.Range(0f, 1f),\n            Random.Range(0f, 1f)\n        );\n        \n        // Quick flash\n        dreamLight.color = flashColor;\n        yield return new WaitForSeconds(0.1f);\n        dreamLight.color = originalColor;\n    }\n    \n    void OnDrawGizmos()\n    {\n        if (isLucidMode)\n        {\n            Gizmos.color = Color.cyan;\n            Gizmos.DrawWireSphere(player.position, 10f);\n        }\n    }\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "space-shooter",
    "title": "Space Shooter",
    "kind": "ARCADE · MONOGAME",
    "role": "Solo Developer",
    "blurb": "Retro arcade shooter programmed from scratch.",
    "built": [
      "Collision detection",
      "Enemy and boss patterns",
      "Score and power-ups"
    ],
    "cover": "SC2.jpg",
    "tags": [
      "Visual Studio Code",
      "Arcade Shooter"
    ],
    "description": "Built entirely in Visual Studio Code, this project features a retro-styled spaceship battle experience where players dodge asteroids, defeat enemies, and collect power-ups to survive longer and achieve higher scores. The game’s design emphasizes smooth gameplay, responsive controls, and pixel-perfect visuals that capture the nostalgia of old-school arcade games.",
    "contribution": "Solo Developer - Programmed all game mechanics from scratch in Visual Studio Code, created sprite animations, implemented collision detection systems, designed enemy AI patterns, and developed the scoring and power-up systems.",
    "features": [
      "Fast-paced and challenging arcade gameplay",
      "Dynamic enemy patterns and increasing difficulty",
      "Power-up and upgrade system for enhanced abilities",
      "Retro-inspired pixel art and space visuals",
      "High score tracking for competitive replayability"
    ],
    "images": [
      "SC1.jpg",
      "SC2.jpg",
      "SC3.jpg",
      "SC4.jpg",
      "SC5.jpg"
    ],
    "video": "1OYMA6OVAEcyxVo2HKiDgOlDomQONDaPu",
    "code": [
      {
        "file": "Game1.cs",
        "title": "Game1.cs - Main Game Class",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Graphics;\nusing Microsoft.Xna.Framework.Input;\nusing System.Collections.Generic;\n\nnamespace Space_Shooting_FINALS\n{\n    public class Game1 : Game\n    {\n        private GraphicsDeviceManager graphics;\n        private SpriteBatch spriteBatch;\n\n        private Player player;\n        private List<Enemy> enemies;\n        private List<Bullet> bullets;\n        private List<SpaceObject> spaceObjects;\n        private Boss boss;\n\n        private int playerScore;\n        private int playerLives;\n\n        public Game1()\n        {\n            graphics = new GraphicsDeviceManager(this);\n            Content.RootDirectory = \"Content\";\n        }\n\n        protected override void Initialize()\n        {\n            base.Initialize();\n            System.Diagnostics.Debug.WriteLine(\"Initialize started\");\n\n            // Initialize player, enemies, bullets, space objects, etc.\n            player = new Player();\n            enemies = new List<Enemy>();\n            bullets = new List<Bullet>();\n            spaceObjects = new List<SpaceObject>();\n            boss = new Boss();\n\n            // Populate enemies and space objects\n            for (int i = 0; i < 10; i++)\n            {\n                enemies.Add(new Enemy());\n            }\n\n            for (int i = 0; i < 5; i++)\n            {\n                spaceObjects.Add(new SpaceObject());\n            }\n\n            playerScore = 0;\n            playerLives = 3;\n\n            System.Diagnostics.Debug.WriteLine(\"Initialize completed\");\n        }\n\n        protected override void LoadContent()\n        {\n            spriteBatch = new SpriteBatch(GraphicsDevice);\n            System.Diagnostics.Debug.WriteLine(\"LoadContent started\");\n\n            // Check if player is null before loading content\n            if (player == null)\n            {\n                System.Diagnostics.Debug.WriteLine(\"Player is null in LoadContent method\");\n                return;\n            }\n\n            // Load player content\n            player.LoadContent(Content);\n\n            // Load content for enemies, space objects, and boss\n            foreach (var enemy in enemies)\n            {\n                enemy.LoadContent(Content);\n            }\n            foreach (var spaceObject in spaceObjects)\n            {\n                spaceObject.LoadContent(Content);\n            }\n            boss.LoadContent(Content);\n\n            System.Diagnostics.Debug.WriteLine(\"LoadContent completed\");\n        }\n\n        protected override void Update(GameTime gameTime)\n        {\n            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape))\n                Exit();\n\n            // Check if player is null before updating\n            if (player == null)\n            {\n                System.Diagnostics.Debug.WriteLine(\"Player is null in Update method\");\n                return;\n            }\n\n            player.Update(gameTime);\n\n            foreach (var enemy in enemies)\n            {\n                enemy.Update(gameTime);\n            }\n\n            foreach (var spaceObject in spaceObjects)\n            {\n                spaceObject.Update(gameTime);\n            }\n\n            foreach (var bullet in bullets)\n            {\n                bullet.Update(gameTime);\n            }\n\n            bullets.RemoveAll(b => !b.IsActive);\n\n            boss.Update(gameTime);\n\n            CheckCollisions();\n\n            base.Update(gameTime);\n        }\n\n        protected override void Draw(GameTime gameTime)\n        {\n            GraphicsDevice.Clear(Color.CornflowerBlue);\n\n            spriteBatch.Begin();\n\n            // Check if player is null before drawing\n            if (player != null)\n            {\n                player.Draw(spriteBatch);\n            }\n            else\n            {\n                System.Diagnostics.Debug.WriteLine(\"Player is null in Draw method\");\n            }\n\n            foreach (var enemy in enemies)\n            {\n                enemy.Draw(spriteBatch);\n            }\n            foreach (var spaceObject in spaceObjects)\n            {\n                spaceObject.Draw(spriteBatch);\n            }\n            boss.Draw(spriteBatch);\n\n            spriteBatch.DrawString(Content.Load<SpriteFont>(\"font\"), \"Score: \" + playerScore, new Vector2(10, 10), Color.White);\n            spriteBatch.DrawString(Content.Load<SpriteFont>(\"font\"), \"Lives: \" + playerLives, new Vector2(10, 30), Color.White);\n\n            spriteBatch.End();\n\n            base.Draw(gameTime);\n        }\n\n        private void CheckCollisions()\n        {\n            foreach (var bullet in bullets)\n            {\n                foreach (var enemy in enemies)\n                {\n                    if (bullet.BoundingBox.Intersects(enemy.BoundingBox))\n                    {\n                        bullet.IsActive = false;\n                        enemies.Remove(enemy);\n                        playerScore += 10;\n                        break;\n                    }\n                }\n\n                if (bullet.BoundingBox.Intersects(boss.BoundingBox))\n                {\n                    bullet.IsActive = false;\n                    boss.Health -= 10;\n                    if (boss.Health <= 0)\n                    {\n                        playerScore += 100;\n                        // Handle boss defeat\n                    }\n                }\n            }\n\n            foreach (var enemy in enemies)\n            {\n                if (player.BoundingBox.Intersects(enemy.BoundingBox))\n                {\n                    player.Health -= 10;\n                    enemies.Remove(enemy);\n                    if (player.Health <= 0)\n                    {\n                        // Handle player defeat\n                    }\n                }\n            }\n\n            if (player.BoundingBox.Intersects(boss.BoundingBox))\n            {\n                player.Health -= 50;\n                if (player.Health <= 0)\n                {\n                    // Handle player defeat\n                }\n            }\n        }\n    }\n}"
      },
      {
        "file": "Player.cs",
        "title": "Player.cs - Player Character",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Content;\nusing Microsoft.Xna.Framework.Graphics;\nusing Microsoft.Xna.Framework.Input;\n\nnamespace Space_Shooting_FINALS\n{\n    public class Player\n    {\n        public Texture2D Texture;\n        public Vector2 Position;\n        public float Speed;\n        public int Health;\n\n        public void LoadContent(ContentManager content)\n        {\n            Texture = content.Load<Texture2D>(\"playerTexture\");\n            Position = new Vector2(400, 500); // Example starting position\n            Speed = 5f;\n            Health = 100;\n        }\n\n        public void Update(GameTime gameTime)\n        {\n            // Handle player movement\n            KeyboardState state = Keyboard.GetState();\n            if (state.IsKeyDown(Keys.W))\n                Position.Y -= Speed;\n            if (state.IsKeyDown(Keys.S))\n                Position.Y += Speed;\n            if (state.IsKeyDown(Keys.A))\n                Position.X -= Speed;\n            if (state.IsKeyDown(Keys.D))\n                Position.X += Speed;\n\n            // Keep player within the screen bounds\n            Position.X = MathHelper.Clamp(Position.X, 0, 800 - Texture.Width);\n            Position.Y = MathHelper.Clamp(Position.Y, 0, 600 - Texture.Height);\n        }\n\n        public void Draw(SpriteBatch spriteBatch)\n        {\n            spriteBatch.Draw(Texture, Position, Color.White);\n        }\n\n        public Rectangle BoundingBox\n        {\n            get { return new Rectangle((int)Position.X, (int)Position.Y, Texture.Width, Texture.Height); }\n        }\n    }\n}"
      },
      {
        "file": "Enemy.cs",
        "title": "Enemy.cs - Enemy AI",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Content;\nusing Microsoft.Xna.Framework.Graphics;\n\npublic class Enemy\n{\n    public Texture2D Texture;\n    public Vector2 Position;\n    public float Speed;\n\n    public void LoadContent(ContentManager content)\n    {\n        Texture = content.Load<Texture2D>(\"enemyTexture\");\n        Position = new Vector2(400, 100); // Example starting position\n        Speed = 2f;\n    }\n\n    public void Update(GameTime gameTime)\n    {\n        // Handle enemy movement\n        Position.Y += Speed;\n\n        // Reset position if off screen\n        if (Position.Y > 600)\n            Position.Y = -Texture.Height;\n    }\n\n    public void Draw(SpriteBatch spriteBatch)\n    {\n        spriteBatch.Draw(Texture, Position, Color.White);\n    }\n\n    public Rectangle BoundingBox\n    {\n        get { return new Rectangle((int)Position.X, (int)Position.Y, Texture.Width, Texture.Height); }\n    }\n}"
      },
      {
        "file": "Boss.cs",
        "title": "Boss.cs - Boss Enemy",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Content;\nusing Microsoft.Xna.Framework.Graphics;\n\npublic class Boss\n{\n    public Texture2D Texture;\n    public Vector2 Position;\n    public float Speed;\n    public int Health;\n\n    public void LoadContent(ContentManager content)\n    {\n        Texture = content.Load<Texture2D>(\"bossTexture\");\n        Position = new Vector2(400, 50); // Example starting position\n        Speed = 1f;\n        Health = 500;\n    }\n\n    public void Update(GameTime gameTime)\n    {\n        // Handle boss movement and behavior\n        // Example: move left and right\n        Position.X += Speed;\n        if (Position.X < 0 || Position.X > 800 - Texture.Width)\n            Speed = -Speed;\n    }\n\n    public void Draw(SpriteBatch spriteBatch)\n    {\n        spriteBatch.Draw(Texture, Position, Color.White);\n    }\n\n    public Rectangle BoundingBox\n    {\n        get { return new Rectangle((int)Position.X, (int)Position.Y, Texture.Width, Texture.Height); }\n    }\n}"
      },
      {
        "file": "Bullet.cs",
        "title": "Bullet.cs - Projectile System",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Content;\nusing Microsoft.Xna.Framework.Graphics;\n\npublic class Bullet\n{\n    public Texture2D Texture;\n    public Vector2 Position;\n    public float Speed;\n    public bool IsActive { get; set; }\n\n    public void LoadContent(ContentManager content)\n    {\n        Texture = content.Load<Texture2D>(\"bulletTexture\");\n        Speed = 10f;\n        IsActive = true;\n    }\n\n    public void Update(GameTime gameTime)\n    {\n        // Handle bullet movement\n        Position.Y -= Speed;\n\n        // Deactivate bullet if off screen\n        if (Position.Y < -Texture.Height)\n        {\n            IsActive = false;\n        }\n    }\n\n    public void Draw(SpriteBatch spriteBatch)\n    {\n        if (IsActive)\n        {\n            spriteBatch.Draw(Texture, Position, Color.White);\n        }\n    }\n\n    public Rectangle BoundingBox\n    {\n        get { return new Rectangle((int)Position.X, (int)Position.Y, Texture.Width, Texture.Height); }\n    }\n}"
      },
      {
        "file": "SpaceObject.cs",
        "title": "SpaceObject.cs - Background Objects",
        "language": "C#",
        "content": "using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Content;\nusing Microsoft.Xna.Framework.Graphics;\n\npublic class SpaceObject\n{\n    public Texture2D Texture;\n    public Vector2 Position;\n    public float Speed;\n\n    public void LoadContent(ContentManager content)\n    {\n        Texture = content.Load<Texture2D>(\"spaceObjectTexture\");\n        Position = new Vector2(new System.Random().Next(0, 800), new System.Random().Next(0, 600)); // Random position\n        Speed = new System.Random().Next(1, 5); // Random speed\n    }\n\n    public void Update(GameTime gameTime)\n    {\n        // Handle space object movement\n        Position.Y += Speed;\n\n        // Reset position if off screen\n        if (Position.Y > 600)\n            Position.Y = -Texture.Height;\n    }\n\n    public void Draw(SpriteBatch spriteBatch)\n    {\n        spriteBatch.Draw(Texture, Position, Color.White);\n    }\n\n    public Rectangle BoundingBox\n    {\n        get { return new Rectangle((int)Position.X, (int)Position.Y, Texture.Width, Texture.Height); }\n    }\n}"
      },
      {
        "file": "Program.cs",
        "title": "Program.cs - Entry Point",
        "language": "C#",
        "content": "using System;\n\nnamespace Space_Shooting_FINALS // Ensure this matches your project namespace\n{\n    public static class Program\n    {\n        [STAThread]\n        static void Main()\n        {\n            using (var game = new Game1())\n                game.Run();\n        }\n    }\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  },
  {
    "slug": "card-matching",
    "title": "Card Matching",
    "kind": "PUZZLE · C#",
    "role": "Solo Developer",
    "blurb": "Memory puzzle with scoring and sound feedback.",
    "built": [
      "Shuffle and match logic",
      "Dynamic scoring system",
      "Flip and win audio"
    ],
    "cover": "MG3.jpg",
    "tags": [
      "C#",
      "Visual Studio Code",
      "Memory Game"
    ],
    "description": "Card Match Challenge is an engaging 2D puzzle game that tests your memory and strategy skills. Flip cards to find pairs, uncover hidden patterns, and climb the leaderboard as the challenge intensifies. With colorful visuals and a simple yet addictive design, every move counts as you aim for the highest score.",
    "contribution": "Solo project - Designed and developed the complete game mechanics, UI/UX implementation, scoring system, and card matching algorithms. Created responsive game logic and optimized performance for smooth gameplay experience.",
    "features": [
      "Classic card-matching gameplay",
      "Dynamic scoring system",
      "Polished 2D visuals with smooth animations",
      "Progressively challenging levels",
      "Relaxing background music",
      "Built with Unity using C#"
    ],
    "images": [
      "MG1.jpg",
      "MG2.jpg",
      "MG3.jpg",
      "MG4.jpg",
      "MG5.jpg"
    ],
    "video": "1dkgv5AIgh5xst3APH1VeCloFIrYqYScV",
    "code": [
      {
        "file": "Form1.cs",
        "title": "Form1.cs - Main Game Logic (Advanced Version)",
        "language": "C#",
        "content": "using System;\nusing System.Collections.Generic;\nusing System.Drawing;\nusing System.IO;\nusing System.Linq;\nusing System.Media;\nusing System.Threading.Tasks;\nusing System.Windows.Forms;\n\nnamespace CardMatchingGame\n{\n    public partial class Form1 : Form\n    {\n        private List<Image> cardImages = new List<Image>();\n        private PictureBox firstClicked = null;\n        private PictureBox secondClicked = null;\n        private int score = 0;\n        private Random random = new Random();\n        private string imagePath = @\"C:\\Users\\angel\\OneDrive - feutech.edu.ph\\Desktop\\PNG-cards-1.3\";\n        private SoundPlayer flipSound;\n        private SoundPlayer winSound;\n\n        public Form1()\n        {\n            InitializeComponent();\n            LoadCardImages();\n            AssignImagesToCards();\n            SetPictureBoxSizeMode();\n            LoadFlipSound();\n            LoadWinSound();\n        }\n\n        private void LoadCardImages()\n        {\n            try\n            {\n                var imageFiles = Directory.GetFiles(imagePath, \"*.png\");\n                foreach (var file in imageFiles.Take(18)) \n                {\n                    var img = Image.FromFile(file);\n                    cardImages.Add(img);\n                    cardImages.Add(img); \n                }\n            }\n            catch (Exception ex)\n            {\n                MessageBox.Show($\"Error loading images: {ex.Message}\");\n            }\n        }\n\n        private void LoadFlipSound()\n        {\n            try\n            {\n                flipSound = new SoundPlayer(@\"C:\\Users\\angel\\OneDrive - feutech.edu.ph\\Desktop\\Sounds\\Flipcard.wav\");\n                flipSound.Load();\n            }\n            catch (Exception ex)\n            {\n                MessageBox.Show($\"Error loading flip sound: {ex.Message}\");\n            }\n        }\n\n        private void LoadWinSound()\n        {\n            try\n            {\n                winSound = new SoundPlayer(@\"C:\\Users\\angel\\OneDrive - feutech.edu.ph\\Desktop\\Sounds\\Win.wav\");\n                winSound.Load();\n            }\n            catch (Exception ex)\n            {\n                MessageBox.Show($\"Error loading win sound: {ex.Message}\");\n            }\n        }\n\n        private void AssignImagesToCards()\n        {\n            var shuffledImages = cardImages.OrderBy(x => random.Next()).ToList();\n\n            int index = 0;\n            foreach (Control control in tableLayoutPanel1.Controls)\n            {\n                if (control is PictureBox)\n                {\n                    var picBox = (PictureBox)control;\n                    picBox.Tag = shuffledImages[index];\n                    picBox.Click += new EventHandler(PictureBox_Click);\n                    picBox.Image = null;\n                    index++;\n                }\n            }\n        }\n\n        private void SetPictureBoxSizeMode()\n        {\n            foreach (Control control in tableLayoutPanel1.Controls)\n            {\n                if (control is PictureBox pictureBox)\n                {\n                    pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;\n                }\n            }\n        }\n\n        private async void PictureBox_Click(object sender, EventArgs e)\n        {\n            if (firstClicked != null && secondClicked != null)\n                return;\n\n            var clickedBox = sender as PictureBox;\n            if (clickedBox == null || clickedBox.Image != null)\n                return;\n\n            flipSound.Play(); \n\n            clickedBox.Image = (Image)clickedBox.Tag;\n\n            if (firstClicked == null)\n            {\n                firstClicked = clickedBox;\n                return;\n            }\n\n            secondClicked = clickedBox;\n\n            if (firstClicked.Tag == secondClicked.Tag)\n            {\n                firstClicked = null;\n                secondClicked = null;\n                score += 5;\n                scoreLabel.Text = $\"Score: {score}\";\n                CheckForGameEnd();\n                return;\n            }\n\n            await Task.Delay(800);\n\n            firstClicked.Image = null;\n            secondClicked.Image = null;\n\n            firstClicked = null;\n            secondClicked = null;\n            if (score > 0) score--;\n            scoreLabel.Text = $\"Score: {score}\";\n        }\n\n        private void CheckForGameEnd()\n        {\n            foreach (Control control in tableLayoutPanel1.Controls)\n            {\n                if (control is PictureBox picBox && picBox.Image == null)\n                {\n                    return;\n                }\n            }\n\n            winSound.Play(); \n            MessageBox.Show($\"Congratulations! Your final score is: {score}\");\n        }\n    }"
      },
      {
        "file": "MatchingGame.cs",
        "title": "MatchingGame.cs - Simple Version",
        "language": "C#",
        "content": "using System;\nusing System.Collections.Generic;\nusing System.Drawing;\nusing System.Linq;\nusing System.Windows.Forms;\n\nnamespace MatchingGame\n{\n    public partial class Form1 : Form\n    {\n        Label firstClicked = null;\n        Label secondClicked = null;\n        Random random = new Random();\n        int score = 0;\n\n        // Initialize a list of 52 card values\n        List<string> icons = new List<string>\n        {\n            \"!\", \"!\", \"N\", \"N\", \",\", \",\", \"k\", \"k\",\n            \"i\", \"i\", \"K\", \"K\", \"d\", \"d\", \"a\", \"a\",\n            \"b\", \"b\", \"v\", \"v\", \"w\", \"w\", \"z\", \"z\",\n            \"x\", \"x\", \"q\", \"q\", \"s\", \"s\", \"t\", \"t\",\n            \"u\", \"u\", \"o\", \"o\", \"p\", \"p\", \"l\", \"l\",\n            \"m\", \"m\", \"n\", \"n\", \"e\", \"e\", \"f\", \"f\",\n            \"g\", \"g\", \"h\", \"h\"\n        };\n\n        public Form1()\n        {\n            InitializeComponent();\n            AssignIconsToSquares();\n        }\n\n        private void Form1_Load(object sender, EventArgs e)\n        {\n            // Initialize the form and start the game\n        }\n\n        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)\n        {\n            // Optional: Customize the table layout panel if needed\n        }\n\n        private void label1_Click(object sender, EventArgs e)\n        {\n            if (timer1.Enabled == true)\n                return;\n\n            Label clickedLabel = sender as Label;\n\n            if (clickedLabel != null)\n            {\n                if (clickedLabel.ForeColor == Color.Black)\n                    return;\n\n                if (firstClicked == null)\n                {\n                    firstClicked = clickedLabel;\n                    firstClicked.ForeColor = Color.Black;\n                    return;\n                }\n\n                secondClicked = clickedLabel;\n                secondClicked.ForeColor = Color.Black;\n\n                CheckForWinner();\n\n                if (firstClicked.Text == secondClicked.Text)\n                {\n                    score += 5;\n                    firstClicked = null;\n                    secondClicked = null;\n                    return;\n                }\n                else\n                {\n                    if (score > 0)\n                        score -= 1;\n                    timer1.Start();\n                }\n            }\n        }\n\n        private void AssignIconsToSquares()\n        {\n            foreach (Control control in tableLayoutPanel1.Controls)\n            {\n                Label iconLabel = control as Label;\n                if (iconLabel != null)\n                {\n                    int randomNumber = random.Next(icons.Count);\n                    iconLabel.Text = icons[randomNumber];\n                    iconLabel.ForeColor = iconLabel.BackColor;\n                    icons.RemoveAt(randomNumber);\n                }\n            }\n        }\n\n        private void timer1_Tick(object sender, EventArgs e)\n        {\n            timer1.Stop();\n            firstClicked.ForeColor = firstClicked.BackColor;\n            secondClicked.ForeColor = secondClicked.BackColor;\n            firstClicked = null;\n            secondClicked = null;\n        }\n\n        private void CheckForWinner()\n        {\n            foreach (Control control in tableLayoutPanel1.Controls)\n            {\n                Label iconLabel = control as Label;\n\n                if (iconLabel != null)\n                {\n                    if (iconLabel.ForeColor == iconLabel.BackColor)\n                        return;\n                }\n            }\n\n            MessageBox.Show($\"You matched all the icons! Your score is {score}.\", \"Congratulations\");\n            Close();\n        }\n    }\n}"
      },
      {
        "file": "Form1.Designer.cs",
        "title": "Form1.Designer.cs - UI Design",
        "language": "C#",
        "content": "namespace CardMatchingGame\n{\n    partial class Form1\n    {\n        /// <summary>\n        /// Required designer variable.\n        /// </summary>\n        private System.ComponentModel.IContainer components = null;\n\n        /// <summary>\n        /// Clean up any resources being used.\n        /// </summary>\n        /// <param name=\"disposing\">true if managed resources should be disposed; otherwise, false.</param>\n        protected override void Dispose(bool disposing)\n        {\n            if (disposing && (components != null))\n            {\n                components.Dispose();\n            }\n            base.Dispose(disposing);\n        }\n\n        #region Windows Form Designer generated code\n\n        /// <summary>\n        /// Required method for Designer support - do not modify\n        /// the contents of this method with the code editor.\n        /// </summary>\n        private void InitializeComponent()\n        {\n            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));\n            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();\n            \n            // Initialize 36 PictureBox controls for the 6x6 grid\n            this.pictureBox1 = new System.Windows.Forms.PictureBox();\n            this.pictureBox2 = new System.Windows.Forms.PictureBox();\n            // ... (continue for all 36 picture boxes)\n            this.pictureBox36 = new System.Windows.Forms.PictureBox();\n            \n            this.scoreLabel = new System.Windows.Forms.Label();\n            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();\n            this.progressBar1 = new System.Windows.Forms.ProgressBar();\n            \n            this.tableLayoutPanel1.SuspendLayout();\n            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();\n            // ... (suspend layout for all picture boxes)\n            this.tableLayoutPanel2.SuspendLayout();\n            this.SuspendLayout();\n            \n            // \n            // tableLayoutPanel1\n            // \n            this.tableLayoutPanel1.BackColor = System.Drawing.Color.SeaGreen;\n            this.tableLayoutPanel1.ColumnCount = 6;\n            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));\n            // ... (repeat for all 6 columns)\n            \n            this.tableLayoutPanel1.RowCount = 6;\n            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));\n            // ... (repeat for all 6 rows)\n            \n            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Left;\n            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);\n            this.tableLayoutPanel1.Name = \"tableLayoutPanel1\";\n            this.tableLayoutPanel1.Size = new System.Drawing.Size(748, 870);\n            this.tableLayoutPanel1.TabIndex = 0;\n            \n            // Configure all picture boxes with background images and properties\n            // ... (configuration for all 36 picture boxes)\n            \n            // \n            // scoreLabel\n            // \n            this.scoreLabel.AutoSize = true;\n            this.scoreLabel.Font = new System.Drawing.Font(\"Microsoft Sans Serif\", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));\n            this.scoreLabel.Location = new System.Drawing.Point(754, 0);\n            this.scoreLabel.Name = \"scoreLabel\";\n            this.scoreLabel.Size = new System.Drawing.Size(70, 20);\n            this.scoreLabel.TabIndex = 1;\n            this.scoreLabel.Text = \"Score: 0\";\n            \n            // Set up the form\n            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);\n            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;\n            this.ClientSize = new System.Drawing.Size(1000, 870);\n            this.Controls.Add(this.tableLayoutPanel2);\n            this.Controls.Add(this.scoreLabel);\n            this.Controls.Add(this.tableLayoutPanel1);\n            this.Name = \"Form1\";\n            this.Text = \"Card Matching Game\";\n            this.Load += new System.EventHandler(this.Form1_Load);\n            \n            this.tableLayoutPanel1.ResumeLayout(false);\n            // ... (resume layout for all picture boxes)\n            this.tableLayoutPanel2.ResumeLayout(false);\n            this.ResumeLayout(false);\n            this.PerformLayout();\n        }\n\n        #endregion\n\n        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;\n        private System.Windows.Forms.PictureBox pictureBox1;\n        // ... (declare all 36 picture boxes)\n        private System.Windows.Forms.PictureBox pictureBox36;\n        private System.Windows.Forms.Label scoreLabel;\n        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;\n        private System.Windows.Forms.ProgressBar progressBar1;\n    }\n}"
      },
      {
        "file": "Program.cs",
        "title": "Program.cs - Application Entry Point",
        "language": "C#",
        "content": "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Threading.Tasks;\nusing System.Windows.Forms;\n\nnamespace CardMatchingGame\n{\n    internal static class Program\n    {\n        /// <summary>\n        /// The main entry point for the application.\n        /// </summary>\n        [STAThread]\n        static void Main()\n        {\n            Application.EnableVisualStyles();\n            Application.SetCompatibleTextRenderingDefault(false);\n            Application.Run(new Form1());\n        }\n    }\n}"
      }
    ],
    "stats": [] /* e.g. [{ "value": "96.5%", "label": "Final RTP" }] */,
    "challenge": null /* e.g. { "problem": "...", "strategy": "...", "lesson": "..." } */,
    "playUrl": ""
  }
];

window.ART = [
  {
    "slug": "door-console",
    "title": "Door Console",
    "category": "3D Models",
    "cover": "DC1.png",
    "tags": [
      "Blender",
      "Maya",
      "Sci-Fi"
    ],
    "description": "This futuristic door console features intricate mechanical details, illuminated panels, and modular components suitable for both cinematic and real-time applications. Built with precision and optimized topology, it’s ideal for use in sci-fi games, VR environments, or film set designs.",
    "features": [
      "High-poly detailed modeling",
      "PBR materials with realistic surface detail",
      "Modular and customizable design",
      "Optimized for game engines (Unreal Engine, Unity)",
      "Includes multiple texture and color variants"
    ],
    "images": [
      "DC1.png",
      "DC2.png",
      "DC3.png"
    ],
    "video": ""
  },
  {
    "slug": "cooking-environment",
    "title": "Cooking Environment",
    "category": "3D Models",
    "cover": "CE3.jpg",
    "tags": [
      "Blender",
      "Maya",
      "Environment Design"
    ],
    "description": "I created a fully designed cooking environment inspired by the game Overcooked, featuring a detailed chef character, complete with kitchen tools, equipment, and a functional food truck. The project showcases a vibrant and dynamic setting that captures the fast-paced, chaotic energy of a professional kitchen. From the chef’s expressive design to the interactive cooking setup and food truck, every element was built to reflect creativity, teamwork, and culinary adventure.",
    "features": [
      "Complete kitchen environment",
      "Realistic appliance models",
      "Detailed prop collection",
      "Optimized for real-time rendering",
      "Modular asset system"
    ],
    "images": [
      "CE1.jpg",
      "CE2.jpg",
      "CE3.jpg",
      "E1.jpg",
      "E2.jpg",
      "E3.jpg"
    ],
    "video": ""
  },
  {
    "slug": "food-truck",
    "title": "Food Truck",
    "category": "3D Models",
    "cover": "V1.jpg",
    "tags": [
      "Blender",
      "Texturing",
      "Maya"
    ],
    "description": "This colorful and playful 3D food truck features a bold design with a giant burger sign, detailed serving area, and modular components for easy customization. Ideal for use in stylized environments, games, or animated shorts, this model combines simplicity and charm while maintaining a clean, optimized topology for performance.",
    "features": [
      "Stylized, low-poly design suitable for animation and games",
      "Clean topology and optimized geometry",
      "PBR materials with bright, appealing colors",
      "Fully modeled interior details (burgers, condiments, and props)",
      "Ready for rendering and game engine integration (Unity, Unreal, Blender)"
    ],
    "images": [
      "V1.jpg",
      "V2.jpg",
      "V3.jpg",
      "V4.jpg"
    ],
    "video": ""
  },
  {
    "slug": "chef-character",
    "title": "Chef Character",
    "category": "3D Models",
    "cover": "CC1.jpg",
    "tags": [
      "Blender",
      "Maya",
      "Character Modeling"
    ],
    "description": "This project features a stylized chef character model crafted in Blender, showcasing professional attire, expressive design, and attention to detail. The model is ideal for use in cooking-themed games, animations, or educational simulations. The character was designed with clean topology, balanced proportions, and a playful aesthetic to complement a variety of environments such as kitchen interiors and food trucks.",
    "features": [
      "Stylized and appealing 3D character design",
      "Traditional chef uniform with detailed accessories",
      "Ready for facial rigging and animation",
      "Includes multiple environment renders (kitchen, dining area, food truck)",
      "Optimized for both real-time and rendered scenes"
    ],
    "images": [
      "CC1.jpg",
      "CC2.jpg",
      "CC3.jpg"
    ],
    "video": ""
  },
  {
    "slug": "weapon",
    "title": "Weapon",
    "category": "3D Models",
    "cover": "Weapon1.jpg",
    "tags": [
      "Substance Painter",
      "Weapon Design",
      "Maya"
    ],
    "description": "A highly detailed 3D weapon model designed with a futuristic aesthetic and optimized for real-time rendering. Created using Blender and Maya, it features realistic materials, subtle wear effects, and precise geometry ideal for both cinematic renders and game integration.",
    "features": [
      "Futuristic weapon concept with intricate detailing",
      "Realistic PBR materials and texture workflow",
      "Visible wear, tear, and metallic surface effects",
      "Optimized topology for real-time performance",
      "Rig-ready structure for animation or game use"
    ],
    "images": [
      "Weapon1.jpg",
      "Weapon2.jpg"
    ],
    "video": ""
  },
  {
    "slug": "sci-fi-control-room",
    "title": "Sci-Fi Control Room",
    "category": "3D Models",
    "cover": "PPreview.png",
    "tags": [
      "Blender",
      "Maya",
      "Sci-Fi",
      "Environment Design"
    ],
    "description": "This futuristic control room scene is designed for high-tech environments, spaceship interiors, or sci-fi command centers. It features multiple interactive workstations, holographic display tables, and realistic lighting for cinematic or game-ready renders. With clean topology and modular components, it’s ideal for animation, games, and VR experiences.",
    "features": [
      "High-quality sci-fi environment design",
      "Modular layout for flexible scene setup",
      "Emissive holographic displays and control panels",
      "Optimized geometry and PBR materials",
      "Suitable for cinematic, game, or VR applications"
    ],
    "images": [
      "PPreview.png",
      "P1.jpg",
      "P2.png",
      "P3.jpg",
      "P4.jpg",
      "P5.jpg"
    ],
    "video": ""
  },
  {
    "slug": "sci-fi-wall",
    "title": "Sci-Fi Wall",
    "category": "3D Models",
    "cover": "W1.png",
    "tags": [
      "Substance Painter",
      "Maya",
      "Sci-Fi"
    ],
    "description": "A detailed modular sci-fi wall designed for futuristic or industrial environments. Features emissive lighting, high-quality materials, and realistic wear and tear for immersive scene building.",
    "features": [
      "Modular sci-fi wall sections",
      "Emissive and reflective materials",
      "High-resolution PBR textures",
      "Realistic wear and surface details",
      "Optimized for rendering and game engines"
    ],
    "images": [
      "W1.png",
      "W2.jpg",
      "W3.jpg"
    ],
    "video": ""
  },
  {
    "slug": "chess-piece",
    "title": "Chess Piece",
    "category": "3D Models",
    "cover": "Chess1.jpg",
    "tags": [
      "Blender",
      "Product Design",
      "Maya"
    ],
    "description": "A beautifully crafted chess scene featuring classic piece designs rendered with modern materials, realistic lighting, and fine attention to detail. The composition captures the elegance and atmosphere of a cozy chess setup, showcasing both artistry and technical precision.",
    "features": [
      "Realistic chessboard and piece designs with smooth materials",
      "Warm lighting setup for a cozy, natural atmosphere",
      "Detailed table and props including a cup, lamp, and timer",
      "Physically accurate rendering with reflections and shadows",
      "Balanced scene composition showcasing modeling and texturing skills"
    ],
    "images": [
      "Chess1.jpg",
      "Chess2.jpg",
      "Chess3.jpg"
    ],
    "video": ""
  },
  {
    "slug": "helicopter-island-scene",
    "title": "Helicopter Island Scene",
    "category": "Animations",
    "cover": "H1.jpg",
    "tags": [
      "Maya",
      "Animation",
      "Low-Poly",
      "Environment"
    ],
    "description": "A stylized low-poly island environment showcasing a helicopter landing zone, tropical palm trees, wooden structures, and a scenic coastal view. Perfect for animation projects, games, or environment showcases.",
    "features": [
      "Low-poly helicopter and island assets",
      "Stylized tropical environment",
      "Custom lighting and water shaders",
      "Optimized for animation and rendering",
      "Includes windmill, trees, and house props"
    ],
    "images": [
      "H1.jpg",
      "H2.jpg",
      "H3.jpg",
      "H4.jpg",
      "H5.jpg",
      "H6.jpg",
      "H7.jpg",
      "H8.jpg"
    ],
    "video": "11Xq7OI4QvxzBae7jdit0i8cF5HEtGVX8"
  },
  {
    "slug": "billiards-room",
    "title": "Billiards Room",
    "category": "Animations",
    "cover": "B1.jpg",
    "tags": [
      "Maya",
      "Physics Animation",
      "Environment",
      "Low-Poly"
    ],
    "description": "A detailed billiards room scene featuring a realistic pool table, dynamic lighting, and physics-based ball interactions. Includes wooden flooring, benches, and props like basketballs and decorative objects for added realism.",
    "features": [
      "Physics-based billiard ball simulation",
      "Realistic lighting and materials",
      "Detailed wooden interior design",
      "Dynamic camera and object interaction setup",
      "Optimized for rendering and animation"
    ],
    "images": [
      "B1.jpg",
      "B2.jpg",
      "B3.jpg",
      "B4.jpg",
      "B5.jpg",
      "B6.jpg",
      "B7.jpg",
      "B8.jpg"
    ],
    "video": "1bLBMr42LabfQ65ekSJRjsQ6UgGTFkGO4"
  },
  {
    "slug": "set-drive-helicopter",
    "title": "Set Drive Helicopter",
    "category": "Animations",
    "cover": "SD3.jpg",
    "tags": [
      "Maya",
      "Set Driven Keys",
      "Low-Poly",
      "Animation"
    ],
    "description": "A low-poly city environment showcasing a helicopter animation controlled through set-driven keys. Features animated rotors, landing sequences, and detailed urban surroundings, ideal for animation or simulation projects.",
    "features": [
      "Helicopter animation with set-driven keys",
      "Low-poly city environment",
      "Animated rotor and landing system",
      "Custom lighting and materials",
      "Optimized for rendering and real-time use"
    ],
    "images": [
      "SD1.jpg",
      "SD2.jpg",
      "SD3.jpg",
      "SD4.jpg",
      "SD5.jpg",
      "SD6.jpg"
    ],
    "video": "1uW7RSII1dEifzidpouniQ9AzJdEizruT"
  }
];
