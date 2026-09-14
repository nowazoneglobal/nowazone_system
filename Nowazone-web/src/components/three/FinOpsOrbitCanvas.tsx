import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FinOpsOrbitCanvasProps {
  activePhase?: number;
  activeIndex?: number;
}

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
