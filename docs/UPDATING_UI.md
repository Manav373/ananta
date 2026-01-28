# Updating the Ananta Advanced UI

This guide covers how to maintain and update the new 3D and interactive features added to the Ananta website.

## 1. 3D Hero Section
The 3D hero section is built using **React Three Fiber**.
- **Location**: `src/components/canvas/`
- **Main Scene**: `Scene3D.tsx` (Configures the Canvas, lights, and camera)
- **Content**: `FloatingShapes.tsx` (Contains the 3D meshes and animation logic)

### Changing the Shapes
To modify the 3D shapes or their behavior, edit `src/components/canvas/FloatingShapes.tsx`.
- Modify the `<Icosahedron>` args to change shape.
- Adjust `Floating` props (`speed`, `rotationIntensity`) to change the movement.
- Change `MeshDistortMaterial` props (`color`, `distort`) to alter the liquid metal effect.

## 2. Smooth Scrolling
We use **Lenis** for smooth inertia scrolling.
- **Configuration**: `src/components/SmoothScroll.tsx`
- **Adjusting Speed**: Change `duration` (currently `1.2`) or `touchMultiplier` in the `Lenis` configuration object.

## 3. Interactive Components
We added reusable components in `src/components/ui/`:

### Parallax Card
Wraps any content with a 3D tilt effect on hover.
```tsx
import ParallaxCard from '../components/ui/ParallaxCard';

<ParallaxCard className="rounded-xl overflow-hidden">
  <img src="..." />
  <h3>Title</h3>
</ParallaxCard>
```

### Magnetic Button
Button that attracts to the cursor magnetism.
```tsx
import MagneticButton from '../components/ui/MagneticButton';

<MagneticButton onClick={handleClick}>
  Click Me
</MagneticButton>
```

## 4. Performance & Images
- **3D**: The 3D scene creates a WebGL context. Ensure to keep geometry count low.
- **Images**: Use `.webp` formatted images whenever possible.
- **Lazy Loading**: `Scene3D` naturally handles suspense. For heavy assets, ensuring they are preloaded or lazy loaded is automatic with modern R3F patterns.
