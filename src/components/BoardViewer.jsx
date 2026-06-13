import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Путь к модели; учитываем base из vite (./)
const MODEL_URL = `${import.meta.env.BASE_URL}models/board.glb`;

export default function BoardViewer() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.set(0.16, 0.12, 0.22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Освещение — холодный ключевой + тёплый контровой под неон-тему
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xbdf5ec, 2.2);
    key.position.set(1, 1.4, 1);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xfbbf24, 0.8);
    rim.position.set(-1.2, 0.4, -0.8);
    scene.add(rim);

    const fill = new THREE.HemisphereLight(0x2dd4bf, 0x0a0e14, 0.6);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;

    let frameId;
    let model = null;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        model = gltf.scene;

        // Центрируем и масштабируем модель под кадр
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const dist = maxDim * 1.9;
        camera.position.set(dist * 0.7, dist * 0.55, dist * 0.9);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.minDistance = maxDim * 0.6;
        controls.maxDistance = maxDim * 4;
        controls.update();

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Не удалось загрузить 3D-модель:", err);
        setError("Не удалось загрузить 3D-модель");
        setLoading(false);
      }
    );

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Останавливаем автоповорот при взаимодействии
    const stopAuto = () => { controls.autoRotate = false; };
    renderer.domElement.addEventListener("pointerdown", stopAuto);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", stopAuto);
      controls.dispose();
      renderer.dispose();
      if (model) {
        model.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((m) => m.dispose());
          }
        });
      }
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="viewer" ref={mountRef}>
      {loading && !error && (
        <div className="viewer__loader">
          <div className="spinner" />
          <span>Загрузка модели…</span>
        </div>
      )}
      {error && <div className="viewer__loader">{error}</div>}
      {!loading && !error && (
        <div className="viewer__hint">
          ЛКМ — вращать · колесо — масштаб · ПКМ — сдвиг
        </div>
      )}
    </div>
  );
}
