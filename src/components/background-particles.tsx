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
        
        // Create a circular texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        let particleTexture: THREE.CanvasTexture | undefined;

        if (context) {
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.7)');
            gradient.addColorStop(0.8, 'rgba(255,255,255,0.1)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            particleTexture = new THREE.CanvasTexture(canvas);
        }

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            map: particleTexture,
            color: 0xffffff,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
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
            if (currentMount && renderer.domElement) {
                try {
                    currentMount.removeChild(renderer.domElement);
                } catch (e) {
                    // Ignore if already removed
                }
            }
            renderer.dispose();
            if (particleTexture) {
                particleTexture.dispose();
            }
        }
    }, [isMobile]);

    if(isMobile) return null;

    return <div className="absolute inset-0 z-10" ref={mountRef} />;
}
