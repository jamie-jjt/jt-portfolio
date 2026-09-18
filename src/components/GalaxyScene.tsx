import { useMemo, useRef } from 'react';
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import * as THREE from 'three';

type ScrollRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

/**
 * The spiral galaxy of points. Colors blend from a violet core out to
 * nebula blue at the edges.
 */
function GalaxyPoints({ scrollRef }: { scrollRef: ScrollRef }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 9000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const branches = 4;
    const radiusMax = 5;
    const spin = 1.1;
    const randomness = 0.55;
    const randomnessPower = 2.6;

    const insideColor = new THREE.Color('#a855f7');
    const outsideColor = new THREE.Color('#6366f1');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * radiusMax;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const randX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;
      const randY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius *
        0.4;
      const randZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randX;
      positions[i3 + 1] = randY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randZ;

      const mixed = insideColor.clone().lerp(outsideColor, radius / radiusMax);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_state: RootState, delta: number) => {
    if (!pointsRef.current) return;
    const scroll = scrollRef.current; // 0 (top of page) -> 1 (bottom)
    // Gentle constant spin, subtly faster as you travel down
    pointsRef.current.rotation.y += delta * (0.05 + scroll * 0.12);
    // Tilt further as you descend, so the galaxy opens up beneath you
    pointsRef.current.rotation.x = -0.3 - scroll * 0.7;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent
        opacity={0.9}
      />
    </points>
  );
}

/**
 * A large surrounding starfield that gives the sense of depth and travel.
 * Slowly drifts and rotates independently from the galaxy.
 */
function Starfield() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across a big spherical shell around the camera
      const r = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#c4b5fd"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Camera travels continuously through space as the whole page scrolls,
 * so scrolling feels like moving deeper into the scene.
 */
function CameraRig({
  scrollRef,
  pointerRef,
}: {
  scrollRef: ScrollRef;
  pointerRef: PointerRef;
}) {
  useFrame((state: RootState, delta) => {
    const scroll = scrollRef.current;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    // Travel: pull back and rise as you descend the page
    const baseZ = 6 + scroll * 4;
    const baseY = 1.2 + scroll * 2.5;
    // Idle drift so it never feels frozen
    const t = state.clock.elapsedTime;
    const idleX = Math.sin(t * 0.15) * 0.3;

    // Cursor parallax: nudge the camera toward where the pointer is.
    const targetX = idleX + px * 1.1;
    const targetY = baseY - py * 0.7;

    state.camera.position.z += (baseZ - state.camera.position.z) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.lookAt(0, 0, 0);
    void delta;
  });
  return null;
}

export default function GalaxyScene({
  scrollRef,
  pointerRef,
}: {
  scrollRef: ScrollRef;
  pointerRef: PointerRef;
}) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 1.2, 6], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <Starfield />
      <GalaxyPoints scrollRef={scrollRef} />
      <CameraRig scrollRef={scrollRef} pointerRef={pointerRef} />
    </Canvas>
  );
}
