import { Rotate3d } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef } from "react";
import type { SolidId } from "../lib/solids";

/* Paraméterekből three.js geometria — ugyanaz a test, mint az appban */
function buildGeometry(id: SolidId, vals: number[]): THREE.BufferGeometry {
  switch (id) {
    case "cube":
      return new THREE.BoxGeometry(vals[0], vals[0], vals[0]);
    case "cuboid":
      return new THREE.BoxGeometry(vals[0], vals[2], vals[1]);
    case "cylinder":
      return new THREE.CylinderGeometry(vals[0], vals[0], vals[1], 48);
    case "pyramid": {
      const g = new THREE.ConeGeometry((vals[0] / Math.SQRT2) * 1.0, vals[1], 4, 1);
      g.rotateY(Math.PI / 4);
      return g;
    }
    case "cone":
      return new THREE.ConeGeometry(vals[0], vals[1], 48);
    case "sphere":
      return new THREE.SphereGeometry(vals[0], 48, 32);
  }
}

export default function SolidViewer({ id, vals }: { id: SolidId; vals: number[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    group: THREE.Group;
    grid: THREE.GridHelper;
    rebuild: (id: SolidId, vals: number[]) => void;
  } | null>(null);

  /* jelenet — egyszer épül fel */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(3.4, 2.4, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x22d3ee, 1.2);
    rim.position.set(-5, -2, -4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const grid = new THREE.GridHelper(9, 18, 0x22d3ee, 0x14333a);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.28;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    /* mobilon a függőleges simítás görget, a vízszintes húzás forgat */
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    renderer.domElement.style.touchAction = "pan-y";

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
    });
    controls.addEventListener("end", () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => (controls.autoRotate = true), 2500);
    });

    const fillMat = new THREE.MeshStandardMaterial({
      color: 0x0e7490,
      transparent: true,
      opacity: 0.28,
      roughness: 0.35,
      metalness: 0.15,
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x22d3ee });

    const rebuild = (sid: SolidId, v: number[]) => {
      while (group.children.length) {
        const c = group.children.pop()!;
        group.remove(c);
        (c as THREE.Mesh).geometry?.dispose?.();
      }
      const geo = buildGeometry(sid, v);
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const size = new THREE.Vector3();
      bb.getSize(size);
      const center = new THREE.Vector3();
      bb.getCenter(center);
      geo.translate(-center.x, -center.y, -center.z);

      const mesh = new THREE.Mesh(geo, fillMat);
      group.add(mesh);

      /* gömbnél a sima élek üresek lennének — ritka drótváz megy rá */
      if (sid === "sphere") {
        const wire = new THREE.WireframeGeometry(
          new THREE.SphereGeometry(1, 14, 10),
        );
        const s = Math.max(size.x, size.y, size.z) / 2;
        wire.scale(s, s, s);
        group.add(new THREE.LineSegments(wire, edgeMat));
      } else {
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat));
      }

      /* mérettől függetlenül mindig kifér a képből */
      const maxDim = Math.max(size.x, size.y, size.z);
      group.scale.setScalar(2.4 / maxDim);
      grid.position.y = (-size.y / 2) * (2.4 / maxDim) - 0.18;
    };

    stateRef.current = { group, grid, rebuild };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      controls.dispose();
      while (group.children.length) {
        const c = group.children.pop()!;
        (c as THREE.Mesh).geometry?.dispose?.();
      }
      fillMat.dispose();
      edgeMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, []);

  /* paraméter- vagy testváltás → geometria csere */
  useEffect(() => {
    stateRef.current?.rebuild(id, vals);
  }, [id, vals]);

  return (
    <div className="relative">
      <div ref={mountRef} className="h-64 w-full cursor-grab active:cursor-grabbing md:h-72" />
      <p className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-black/60 dark:border-white/10 dark:bg-black/50 dark:text-white/50 backdrop-blur">
        <Rotate3d size={13} className="text-cyan-700 dark:text-cyan-300" />
        húzd a forgatáshoz
      </p>
    </div>
  );
}
