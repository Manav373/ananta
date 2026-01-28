import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

export default function Scene3D({ children, className, ...props }: any) {
    return (
        <Canvas
            className={className}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 6], fov: 45 }}
            {...props}
        >
            <Suspense fallback={null}>
                {children}
            </Suspense>
            <Preload all />
        </Canvas>
    );
}
