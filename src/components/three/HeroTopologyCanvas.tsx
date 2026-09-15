import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroTopologyCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 85;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Build Topology Lattice Nodes
    const nodeCount = 42;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const primaryColor = new THREE.Color('#0F62FE');
    const emeraldColor = new THREE.Color('#10B981');
    const slateColor = new THREE.Color('#5980A6');

    const nodesData: Array<{ x: number; y: number; z: number; vx: number; vy: number }> = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 110;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      nodesData.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
      });

      const chosenColor = i % 5 === 0 ? emeraldColor : i % 2 === 0 ? primaryColor : slateColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsMesh);

    // Build dynamic connecting line lattice
    const maxLines = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 6;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // IntersectionObserver to pause when out of view
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Parallax easing
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX;
      camera.position.y = -currentMouseY;
      camera.lookAt(0, 0, 0);

      // Node movement
      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        nodesData[i].x += nodesData[i].vx;
        nodesData[i].y += nodesData[i].vy;

        if (Math.abs(nodesData[i].x) > 60) nodesData[i].vx *= -1;
        if (Math.abs(nodesData[i].y) > 35) nodesData[i].vy *= -1;

        posArray[i * 3] = nodesData[i].x;
        posArray[i * 3 + 1] = nodesData[i].y;
      }
      posAttr.needsUpdate = true;

      // Dynamic connections between nearby nodes
      let lineVertexIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      const connectionDistance = 24;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodesData[i].x - nodesData[j].x;
          const dy = nodesData[i].y - nodesData[j].y;
          const dz = nodesData[i].z - nodesData[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePosArray[lineVertexIndex * 3] = nodesData[i].x;
            linePosArray[lineVertexIndex * 3 + 1] = nodesData[i].y;
            linePosArray[lineVertexIndex * 3 + 2] = nodesData[i].z;

            linePosArray[(lineVertexIndex + 1) * 3] = nodesData[j].x;
            linePosArray[(lineVertexIndex + 1) * 3 + 1] = nodesData[j].y;
            linePosArray[(lineVertexIndex + 1) * 3 + 2] = nodesData[j].z;

            const alpha = 1 - dist / connectionDistance;
            lineColArray[lineVertexIndex * 3] = 0.06 * alpha;
            lineColArray[lineVertexIndex * 3 + 1] = 0.38 * alpha;
            lineColArray[lineVertexIndex * 3 + 2] = 1.0 * alpha;

            lineColArray[(lineVertexIndex + 1) * 3] = 0.06 * alpha;
            lineColArray[(lineVertexIndex + 1) * 3 + 1] = 0.38 * alpha;
            lineColArray[(lineVertexIndex + 1) * 3 + 2] = 1.0 * alpha;

            lineVertexIndex += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      pointsMesh.rotation.y += 0.0004;
      linesMesh.rotation.y += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean Up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 dark:opacity-80 transition-opacity"
      aria-hidden="true"
    />
  );
};
