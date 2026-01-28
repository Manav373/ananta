import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate fewer, more elegant block positions
    const particles = useMemo(() => {
        const temp = [];
        // Creates a smaller, denser cluster
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    // Higher thresholds for a more "sculptural" look
                    if (Math.abs(x) + Math.abs(y) + Math.abs(z) < 2)
                        temp.push({ x: x * 0.8, y: y * 0.8, z: z * 0.8 });
                }
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const { clock } = state;
        const scrollY = window.scrollY || 0;
        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);

        // Elegant slow rotation
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.05 + scrollProgress * 0.2;
        groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    });

    return (
        <group>
            <Environment preset="city" />

            {/* 
               CRITICAL FIX: 
               1. Positioned further right (4.5) to clear text.
               2. Pushed back in Z-space (-2) to avoid overlapping UI.
            */}
            <group ref={groupRef} position={[4.5, 0, -2]} rotation={[0.2, -0.5, 0]}>

                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Instances range={particles.length}>
                        <boxGeometry args={[0.6, 0.6, 0.6]} /> {/* Smaller blocks */}
                        <meshStandardMaterial
                            color="#FFD700"
                            roughness={0.15} // Slightly less glossy for realism
                            metalness={0.9}  // High metalness for gold look
                            envMapIntensity={1.2}
                        />

                        {particles.map((data, i) => (
                            <Instance
                                key={i}
                                position={[data.x, data.y, data.z]}
                            />
                        ))}
                    </Instances>
                </Float>

                {/* Decorative Glass Pylons - vertical accents */}
                <Instances range={3}>
                    <boxGeometry args={[0.05, 4, 0.05]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.9}
                        opacity={0.3}
                        transparent
                        roughness={0.1}
                    />
                    <Instance position={[1, 0, 1]} />
                    <Instance position={[-1, 0, -1]} />
                    <Instance position={[1, 0, -1]} />
                </Instances>

            </group>

            {/* Lighting adjustments for depth */}
            <ambientLight intensity={0.4} />
            <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} color="#ffffff" castShadow />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#2563EB" />
        </group>
    );
}
