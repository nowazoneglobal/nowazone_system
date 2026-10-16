import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FinOpsOrbitCanvasProps {
  activePhase?: number;
  activeIndex?: number;
}

/**
 * FinOpsOrbitCanvas v2 — orbital cost-stream with flowing data particles, pulsing halo, and scroll tilt.
 */
export const FinOpsOrbitCanvas: React.FC<FinOpsOrbitCanvasProps> = ({ activePhase, activeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetAngleRef = useRef(0);
  const phase = activeIndex !== undefined ? activeIndex : (activePhase || 0);

  useEffect(() => {
    targetAngleRef.current = (phase * Math.PI * 2) / 8;
  }, [phase]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const width  = container.clientWidth  || 320;
    const height = container.clientHeight || 320;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const RING_R = 14;

    // Outer orbit ring
    const ringGeo = new THREE.RingGeometry(RING_R - 0.12, RING_R + 0.12, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0F62FE, transparent: true, opacity: 0.22, side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Inner trace ring
    const innerGeo = new THREE.RingGeometry(RING_R * 0.65 - 0.05, RING_R * 0.65 + 0.05, 64);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10B981, transparent: true, opacity: 0.15, side: THREE.DoubleSide,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // 8 phase spheres
    const nodeColors = [0x60A5FA, 0xA78BFA, 0xFBBF24, 0xFB923C, 0x4ADE80, 0x22D3EE, 0xF87171, 0xF472B6];
    const nodesGroup = new THREE.Group();
    const sphereGeo  = new THREE.SphereGeometry(0.72, 20, 20);
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const mat   = new THREE.MeshBasicMaterial({ color: nodeColors[i] });
      const sp    = new THREE.Mesh(sphereGeo, mat);
      sp.position.set(Math.cos(angle) * RING_R, Math.sin(angle) * RING_R, 0);
      nodesGroup.add(sp);
      nodeMeshes.push(sp);
    }
    scene.add(nodesGroup);

    // Active halo
    const haloGeo = new THREE.RingGeometry(1.25, 1.75, 40);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x0F62FE, transparent: true, opacity: 0.85, side: THREE.DoubleSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Flowing stream particles along the ring
    const STREAM_COUNT = 60;
    const streamPos    = new Float32Array(STREAM_COUNT * 3);
    const streamAngles: number[] = [];
    const C_BLUE  = new THREE.Color('#0F62FE');
    const C_GREEN = new THREE.Color('#10B981');
    const C_CYAN  = new THREE.Color('#22D3EE');
    const streamCols = new Float32Array(STREAM_COUNT * 3);
    const streamPal  = [C_BLUE, C_GREEN, C_CYAN];

    for (let i = 0; i < STREAM_COUNT; i++) {
      const ang = Math.random() * Math.PI * 2;
      streamAngles.push(ang);
      streamPos[i * 3]     = Math.cos(ang) * RING_R;
      streamPos[i * 3 + 1] = Math.sin(ang) * RING_R;
      streamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      const c = streamPal[i % 3];
      streamCols[i * 3] = c.r; streamCols[i * 3 + 1] = c.g; streamCols[i * 3 + 2] = c.b;
    }

    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    streamGeo.setAttribute('color',    new THREE.BufferAttribute(streamCols, 3));
    const streamMat = new THREE.PointsMaterial({
      size: 2.2, vertexColors: true, transparent: true,
      opacity: 0.92, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(streamGeo, streamMat));

    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);

    let isVisible = true;
    const obs = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; });
    obs.observe(container);

    let raf: number;
    let currentAngle = targetAngleRef.current;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!isVisible) return;
      t += 0.016;

      currentAngle += (targetAngleRef.current - currentAngle) * 0.08;
      const ax = Math.cos(currentAngle) * RING_R;
      const ay = Math.sin(currentAngle) * RING_R;
      haloMesh.position.set(ax, ay, 0.2);
      haloMat.opacity = 0.7 + Math.sin(t * 3) * 0.15;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.scale.setScalar(idx === activePhase ? 1.5 + Math.sin(t * 4) * 0.08 : 1.0);
      });

      const spa = (streamGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < STREAM_COUNT; i++) {
        streamAngles[i] += 0.008 + (i % 3) * 0.002;
        spa[i * 3]     = Math.cos(streamAngles[i]) * RING_R;
        spa[i * 3 + 1] = Math.sin(streamAngles[i]) * RING_R;
      }
      (streamGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Scroll tilt
      const rect = container.getBoundingClientRect();
      const tilt = (scrollY - (rect.top + scrollY)) * 0.0008;
      ringMesh.rotation.x    = tilt;
      nodesGroup.rotation.x  = tilt * 0.5;

      ringMesh.rotation.z += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      obs.disconnect();
      ringGeo.dispose(); ringMat.dispose(); innerGeo.dispose(); innerMat.dispose();
      sphereGeo.dispose(); haloGeo.dispose(); haloMat.dispose();
      streamGeo.dispose(); streamMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [activePhase]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] flex items-center justify-center relative"
      aria-hidden="true"
    />
  );
};


  useEffect(() => {
    targetAngleRef.current = (phase * Math.PI * 2) / 8;
  }, [phase]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(0, 0, 42);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Orbit Ring
    const ringRadius = 14;
    const ringGeometry = new THREE.RingGeometry(ringRadius - 0.08, ringRadius + 0.08, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x5980A6,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ringMesh);

    // 8 Phase Spheres
    const nodeColors = [
      0x60A5FA, 0xA78BFA, 0xFBBF24, 0xFB923C,
      0x4ADE80, 0x22D3EE, 0xF87171, 0xF472B6,
    ];

    const nodesGroup = new THREE.Group();
    const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const x = Math.cos(angle) * ringRadius;
      const y = Math.sin(angle) * ringRadius;

      const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i] });
      const sphere = new THREE.Mesh(sphereGeometry, mat);
      sphere.position.set(x, y, 0);
      nodesGroup.add(sphere);
      nodeMeshes.push(sphere);
    }
    scene.add(nodesGroup);

    // Active Node Halo Indicator
    const haloGeometry = new THREE.RingGeometry(1.2, 1.6, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x0F62FE,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(haloMesh);

    let animationFrameId: number;
    let currentAngle = targetAngleRef.current;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth rotate towards target phase angle
      currentAngle += (targetAngleRef.current - currentAngle) * 0.08;

      const activeX = Math.cos(currentAngle) * ringRadius;
      const activeY = Math.sin(currentAngle) * ringRadius;
      haloMesh.position.set(activeX, activeY, 0.2);

      // Pulse active node scale
      nodeMeshes.forEach((mesh, idx) => {
        if (idx === activePhase) {
          mesh.scale.set(1.4, 1.4, 1.4);
        } else {
          mesh.scale.set(1, 1, 1);
        }
      });

      ringMesh.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      ringGeometry.dispose();
      ringMaterial.dispose();
      sphereGeometry.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activePhase]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] flex items-center justify-center relative"
      aria-hidden="true"
    />
  );
};
