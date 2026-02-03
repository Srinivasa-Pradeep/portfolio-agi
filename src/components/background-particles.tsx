'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

export default function BackgroundParticles() {
    const mountRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (isMobile === true || !mountRef.current) return;
        if (isMobile === undefined) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0xffffff, // Silver/White color
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending // Glow effect
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            // Calculate target rotation based on normalized mouse position (-0.5 to 0.5)
            const targetX = (mouse.current.y / window.innerHeight - 0.5) * 0.5;
            const targetY = (mouse.current.x / window.innerWidth - 0.5) * 0.5;

            // Smoothly interpolate (lerp) the particle rotation towards the target.
            // This creates a gentle, lagging "drift" effect.
            particlesMesh.rotation.x += (targetX - particlesMesh.rotation.x) * 0.02;
            particlesMesh.rotation.y += (targetY - particlesMesh.rotation.y) * 0.02;

            renderer.render(scene, camera);
        }
        animate();

        const currentMount = mountRef.current;
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (currentMount) {
              currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        }
    }, [isMobile]);

    if(isMobile) return null;

    return <div className="absolute inset-0 z-10" ref={mountRef} />;
}
