'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Cylinder, Environment, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { WheelSegment, useWheelStore } from '@/lib/store/wheelStore';
import { ThemeConfig } from '@/lib/utils/themes';
import { soundManager } from '@/lib/utils/sounds';
import { Volume2, VolumeX } from 'lucide-react';

interface Wheel3DProps {
    segments: WheelSegment[];
    themeConfig: ThemeConfig;
    onSpinComplete?: () => void;
}

function WheelMesh({ segments, themeConfig, rotation }: { segments: WheelSegment[], themeConfig: ThemeConfig, rotation: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const segmentCount = segments.length || 1;
    const segmentAngle = (Math.PI * 2) / segmentCount;

    useFrame(() => {
        if (groupRef.current) {
            // Convert degrees to radians and apply rotation
            // rotation is expected to be total degrees spun
            groupRef.current.rotation.z = -THREE.MathUtils.degToRad(rotation);
        }
    });

    return (
        <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
            {/* Outer Ring */}
            <mesh position={[0, 0, -0.2]}>
                <cylinderGeometry args={[2.2, 2.2, 0.5, 64]} />
                <meshStandardMaterial color={themeConfig.outerRing || '#333'} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Segments */}
            {segments.map((segment, i) => (
                <group key={i} rotation={[0, -segmentAngle * i - segmentAngle / 2, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry
                            args={[2, 2, 0.4, 32, 1, false, 0, segmentAngle]}
                        />
                        <meshStandardMaterial color={segment.color} metalness={0.3} roughness={0.4} />
                    </mesh>

                    {/* Text Label */}
                    <group rotation={[0, segmentAngle / 2, 0]} position={[1.2, 0.21, 0]}>
                        <Text
                            position={[0, 0, 0]}
                            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                            fontSize={0.2}
                            color={themeConfig.textColor || 'white'}
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.5}
                        >
                            {segment.text.length > 15 ? segment.text.substring(0, 15) + '...' : segment.text}
                        </Text>
                    </group>
                </group>
            ))}

            {/* Center Hub */}
            <mesh position={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
                <meshStandardMaterial color={themeConfig.centerColor || 'white'} metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}

function Pointer() {
    return (
        <group position={[0, 2.1, 0.5]} rotation={[0, 0, Math.PI]}>
            <mesh rotation={[0, 0, 0]}>
                <coneGeometry args={[0.2, 0.5, 4]} />
                <meshStandardMaterial color="gold" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    );
}

export default function Wheel3D({ segments, themeConfig, onSpinComplete }: Wheel3DProps) {
    const [rotation, setRotation] = React.useState(0);
    const [isSpinning, setIsSpinning] = React.useState(false);

    // Sound Manager
    const { soundEnabled, toggleSound } = useWheelStore();
    React.useEffect(() => {
        soundManager.setEnabled(soundEnabled);
    }, [soundEnabled]);

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const newRotation = rotation + 1440 + Math.random() * 360; // 4+ spins

        // Simple animation loop simulation for React state (in real app, useFrame would drive this smoothly)
        let current = rotation;
        const duration = 5000;
        const startTime = Date.now();
        const segmentAngle = 360 / (segments.length || 1);
        let lastTick = rotation;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            if (elapsed < duration) {
                const t = elapsed / duration;
                // easeOutCubic
                const ease = 1 - Math.pow(1 - t, 3);
                const nextRotation = current + (newRotation - current) * ease;

                // Tick Sound Logic
                if (Math.floor(nextRotation / segmentAngle) !== Math.floor(lastTick / segmentAngle)) {
                    soundManager.playTick();
                }
                lastTick = nextRotation;

                setRotation(nextRotation);
                requestAnimationFrame(animate);
            } else {
                setRotation(newRotation);
                setIsSpinning(false);
                soundManager.playWin();
                if (onSpinComplete) onSpinComplete();
            }
        };
        requestAnimationFrame(animate);
    };

    return (
        <div className="w-full relative flex flex-col items-center">
            <div className="w-full h-[400px] md:h-[500px]">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                    <Environment preset="city" />

                    <WheelMesh segments={segments} themeConfig={themeConfig} rotation={rotation} />
                    <Pointer />

                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                </Canvas>
            </div>

            <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="absolute bottom-4 z-10 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSpinning ? 'Spinning...' : 'SPIN 3D!'}
            </button>

            {/* Sound Toggle */}
            <button
                onClick={toggleSound}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 text-white"
            >
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
    );
}
