"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Hero() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Sphere
    const geometry = new THREE.SphereGeometry(8, 20, 16);
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.6,
      wireframe: true,
      color: "#4F46E5", // Indigo color to match your theme
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(20, 20, 30);
    scene.add(ambientLight, directionalLight);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 25;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    // Function to update renderer size
    function updateRendererSize() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // Initial size setup
    updateRendererSize();

    // Simple OrbitControls implementation
    function createOrbitControls(camera, domElement) {
      const controls = {
        enableDamping: true,
        dampingFactor: 0.05,
        target: new THREE.Vector3(0, 0, 0),
        spherical: new THREE.Spherical(),
        sphericalDelta: new THREE.Spherical(),
        scale: 1,
        state: "NONE",
        rotateStart: new THREE.Vector2(),
        rotateEnd: new THREE.Vector2(),
        rotateDelta: new THREE.Vector2(),

        update: (function () {
          const offset = new THREE.Vector3();
          const quat = new THREE.Quaternion().setFromUnitVectors(
            camera.up,
            new THREE.Vector3(0, 1, 0)
          );
          const quatInverse = quat.clone().invert();

          return function update() {
            const position = camera.position;

            offset.copy(position).sub(this.target);
            offset.applyQuaternion(quat);

            this.spherical.setFromVector3(offset);

            if (this.enableDamping) {
              this.spherical.theta +=
                this.sphericalDelta.theta * this.dampingFactor;
              this.spherical.phi +=
                this.sphericalDelta.phi * this.dampingFactor;
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
          controls.rotateDelta.subVectors(
            controls.rotateEnd,
            controls.rotateStart
          );

          controls.sphericalDelta.theta -=
            (2 * Math.PI * controls.rotateDelta.x) / domElement.clientHeight;
          controls.sphericalDelta.phi -=
            (2 * Math.PI * controls.rotateDelta.y) / domElement.clientHeight;

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
          controls.rotateStart.set(
            event.touches[0].pageX,
            event.touches[0].pageY
          );
        }
      }

      function onTouchMove(event) {
        event.preventDefault();
        if (event.touches.length === 1 && controls.state === "ROTATE") {
          controls.rotateEnd.set(
            event.touches[0].pageX,
            event.touches[0].pageY
          );
          controls.rotateDelta.subVectors(
            controls.rotateEnd,
            controls.rotateStart
          );

          controls.sphericalDelta.theta -=
            (2 * Math.PI * controls.rotateDelta.x) / domElement.clientHeight;
          controls.sphericalDelta.phi -=
            (2 * Math.PI * controls.rotateDelta.y) / domElement.clientHeight;

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
    const controls = createOrbitControls(camera, canvasRef.current);
    controlsRef.current = controls;

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);

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
    const handleResize = () => updateRendererSize();
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <section id="home" className="relative">
      <div className="relative w-full min-h-screen bg-black flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 pt-20 pb-8 lg:py-0">
        <div className="flex-1 max-w-lg text-left mb-6 lg:mb-0 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Your Trusted{" "}
            <span className="text-indigo-400">AI Development Company</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl mt-4 text-gray-300 leading-relaxed px-2 sm:px-0">
            We build meaningful AI Web based Solutions to shape the future of
            your business.
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              Transforming complex challenges into intelligent, scalable
              solutions that drive innovation.
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              Partner with us to unlock the full potential of artificial
              intelligence for your industry.
            </span>
          </p>
        </div>

        <div className="relative flex-shrink-0 lg:ml-8">
          <canvas
            ref={canvasRef}
            className="block w-80 h-80 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
