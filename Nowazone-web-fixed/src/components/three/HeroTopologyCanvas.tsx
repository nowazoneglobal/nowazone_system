import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroTopologyCanvas v2 — denser scroll-driven + mouse-parallax particle field.
 * Performance: IntersectionObserver pauses render, capped pixel ratio, mobile-reduced counts.
 */
export const HeroTopologyCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 55 : 110;
    const CONN_DIST  = isMobile ? 20 : 26;

    const width  = container.clientWidth  || window.innerWidth;
    const height = container.clientHeight || 720;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const C_PRIMARY = new THREE.Color('#0F62FE');
    const C_EMERALD = new THREE.Color('#10B981');
    const C_SLATE   = new THREE.Color('#5980A6');
    const C_CYAN    = new THREE.Color('#22D3EE');
    const palette   = [C_PRIMARY, C_EMERALD, C_SLATE, C_CYAN];

    const positions = new Float32Array(NODE_COUNT * 3);
    const colors    = new Float32Array(NODE_COUNT * 3);

    type NodeData = { x: number; y: number; z: number; vx: number; vy: number };
    const nodes: NodeData[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 130;
      const y = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 50;
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      nodes.push({ x, y, z, vx: (Math.random() - 0.5) * 0.018, vy: (Math.random() - 0.5) * 0.018 });
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 3.5, vertexColors: true, transparent: true,
      opacity: 0.88, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointsMesh);

    const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePos  = new Float32Array(maxLines * 6);
    const lineCol  = new Float32Array(maxLines * 6);
    const lineGeo  = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineCol, 3));
    const lineMat  = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    let targetMX = 0, targetMY = 0, currentMX = 0, currentMY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 7;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 4.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; });
    observer.observe(container);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      currentMX += (targetMX - currentMX) * 0.05;
      currentMY += (targetMY - currentMY) * 0.05;

      const sf = scrollY * 0.018;
      camera.position.x = currentMX;
      camera.position.y = -currentMY - sf * 0.4;
      camera.position.z = 90 + sf * 1.2;
      camera.lookAt(0, 0, 0);

      const posArr = (pointsGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (Math.abs(nodes[i].x) > 65) nodes[i].vx *= -1;
        if (Math.abs(nodes[i].y) > 38) nodes[i].vy *= -1;
        posArr[i * 3]     = nodes[i].x;
        posArr[i * 3 + 1] = nodes[i].y;
      }
      (pointsGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      let vi = 0;
      const lp = (lineGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const lc = (lineGeo.attributes.color    as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONN_DIST) {
            const t = dist / CONN_DIST;
            const r = C_PRIMARY.r * (1 - t) + C_EMERALD.r * t;
            const g = C_PRIMARY.g * (1 - t) + C_EMERALD.g * t;
            const b = C_PRIMARY.b * (1 - t) + C_EMERALD.b * t;
            lp[vi * 3] = nodes[i].x; lp[vi * 3 + 1] = nodes[i].y; lp[vi * 3 + 2] = nodes[i].z;
            lp[(vi + 1) * 3] = nodes[j].x; lp[(vi + 1) * 3 + 1] = nodes[j].y; lp[(vi + 1) * 3 + 2] = nodes[j].z;
            lc[vi * 3] = r; lc[vi * 3 + 1] = g; lc[vi * 3 + 2] = b;
            lc[(vi + 1) * 3] = r; lc[(vi + 1) * 3 + 1] = g; lc[(vi + 1) * 3 + 2] = b;
            vi += 2;
          }
        }
      }
      lineGeo.setDrawRange(0, vi);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color    as THREE.BufferAttribute).needsUpdate = true;

      pointsMesh.rotation.y += 0.0003;
      linesMesh.rotation.y  += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      pointsGeo.dispose(); pointsMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-55 dark:opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
