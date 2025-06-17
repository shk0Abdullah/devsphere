// Three.js setup adapted from your main.js
const scene = new THREE.Scene();

// Get canvas element
const canvas = document.querySelector("#canvas");

// Sphere (adjusted size for container)
const geometry = new THREE.SphereGeometry(8, 20, 16);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 0.6,
  wireframe: true,
  color: 0x888888,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(20, 20, 30);
scene.add(ambientLight, directionalLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 25;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});

// Function to update renderer size based on canvas dimensions
function updateRendererSize() {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.updateProjectionMatrix();
}

// Initial size setup
updateRendererSize();

// OrbitControls implementation
let controls;

// Create a simple OrbitControls-like implementation
function createOrbitControls(camera, domElement) {
  const controls = {
    enableDamping: true,
    dampingFactor: 0.05,
    target: new THREE.Vector3(0, 0, 0),

    // Internal state
    spherical: new THREE.Spherical(),
    sphericalDelta: new THREE.Spherical(),
    scale: 1,
    panOffset: new THREE.Vector3(),
    zoomChanged: false,

    rotateStart: new THREE.Vector2(),
    rotateEnd: new THREE.Vector2(),
    rotateDelta: new THREE.Vector2(),

    panStart: new THREE.Vector2(),
    panEnd: new THREE.Vector2(),
    panDelta: new THREE.Vector2(),

    dollyStart: new THREE.Vector2(),
    dollyEnd: new THREE.Vector2(),
    dollyDelta: new THREE.Vector2(),

    state: "NONE",

    update: (function () {
      const offset = new THREE.Vector3();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        camera.up,
        new THREE.Vector3(0, 1, 0)
      );
      const quatInverse = quat.clone().invert();

      const lastPosition = new THREE.Vector3();
      const lastQuaternion = new THREE.Quaternion();

      return function update() {
        const position = camera.position;

        offset.copy(position).sub(this.target);
        offset.applyQuaternion(quat);

        this.spherical.setFromVector3(offset);

        if (this.enableDamping) {
          this.spherical.theta +=
            this.sphericalDelta.theta * this.dampingFactor;
          this.spherical.phi += this.sphericalDelta.phi * this.dampingFactor;
        } else {
          this.spherical.theta += this.sphericalDelta.theta;
          this.spherical.phi += this.sphericalDelta.phi;
        }

        this.spherical.makeSafe();
        this.spherical.radius *= this.scale;

        offset.setFromSpherical(this.spherical);
        offset.applyQuaternion(quatInverse);

        position.copy(this.target).add(offset);
        camera.lookAt(this.target);

        if (this.enableDamping) {
          this.sphericalDelta.theta *= 1 - this.dampingFactor;
          this.sphericalDelta.phi *= 1 - this.dampingFactor;
        } else {
          this.sphericalDelta.set(0, 0, 0);
        }

        this.scale = 1;

        if (
          this.zoomChanged ||
          lastPosition.distanceToSquared(camera.position) > 0.01 ||
          8 * (1 - lastQuaternion.dot(camera.quaternion)) > 0.01
        ) {
          lastPosition.copy(camera.position);
          lastQuaternion.copy(camera.quaternion);
          this.zoomChanged = false;

          return true;
        }

        return false;
      };
    })(),
  };

  // Mouse event handlers
  function onMouseDown(event) {
    event.preventDefault();

    if (event.button === 0) {
      controls.state = "ROTATE";
      controls.rotateStart.set(event.clientX, event.clientY);
    }
  }

  function onMouseMove(event) {
    event.preventDefault();

    if (controls.state === "ROTATE") {
      controls.rotateEnd.set(event.clientX, event.clientY);
      controls.rotateDelta.subVectors(controls.rotateEnd, controls.rotateStart);

      const element = domElement;

      controls.sphericalDelta.theta -=
        (2 * Math.PI * controls.rotateDelta.x) / element.clientHeight;
      controls.sphericalDelta.phi -=
        (2 * Math.PI * controls.rotateDelta.y) / element.clientHeight;

      controls.rotateStart.copy(controls.rotateEnd);
    }
  }

  function onMouseUp(event) {
    event.preventDefault();
    controls.state = "NONE";
  }

  // Touch event handlers
  function onTouchStart(event) {
    event.preventDefault();

    if (event.touches.length === 1) {
      controls.state = "ROTATE";
      controls.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    }
  }

  function onTouchMove(event) {
    event.preventDefault();

    if (event.touches.length === 1 && controls.state === "ROTATE") {
      controls.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
      controls.rotateDelta.subVectors(controls.rotateEnd, controls.rotateStart);

      const element = domElement;

      controls.sphericalDelta.theta -=
        (2 * Math.PI * controls.rotateDelta.x) / element.clientHeight;
      controls.sphericalDelta.phi -=
        (2 * Math.PI * controls.rotateDelta.y) / element.clientHeight;

      controls.rotateStart.copy(controls.rotateEnd);
    }
  }

  function onTouchEnd(event) {
    event.preventDefault();
    controls.state = "NONE";
  }

  // Add event listeners
  domElement.addEventListener("mousedown", onMouseDown);
  domElement.addEventListener("mousemove", onMouseMove);
  domElement.addEventListener("mouseup", onMouseUp);
  domElement.addEventListener("touchstart", onTouchStart);
  domElement.addEventListener("touchmove", onTouchMove);
  domElement.addEventListener("touchend", onTouchEnd);

  return controls;
}

// Initialize controls
controls = createOrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Auto rotation when not interacting
  if (controls.state === "NONE") {
    sphere.rotation.y += 0.005;
  }

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener("resize", updateRendererSize);

// Initial render
renderer.render(scene, camera);
