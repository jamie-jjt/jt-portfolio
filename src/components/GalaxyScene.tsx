import { useMemo, useRef } from 'react';
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import * as THREE from 'three';

type ScrollRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

/**
 * The spiral galaxy of points. Colors blend from a violet core out to
 * nebula blue at the edges.
 */
function GalaxyPoints() {
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

    const minRadius = 0.6; // hollow-ish center so there's no hot core blob
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = minRadius + Math.random() * (radiusMax - minRadius);
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

      const tt = radius / radiusMax;
      const mixed = insideColor.clone().lerp(outsideColor, tt);
      // Slightly dim the innermost particles so the center isn't a hot blob
      // sitting behind the hero text (arms stay full brightness).
      const dim = 0.55 + Math.min(1, tt / 0.35) * 0.45;
      mixed.multiplyScalar(dim);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_state: RootState, delta: number) => {
    if (!pointsRef.current) return;
    // Keep the original v1 hero tilt fixed; the camera now handles the travel.
    // Constant gentle spin so the galaxy stays alive.
    pointsRef.current.rotation.x = -0.3;
    pointsRef.current.rotation.y += delta * 0.05;
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
        size={0.04}
        sizeAttenuation
        color="#6d5aa8"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Camera travels continuously through space as the whole page scrolls,
 * so scrolling feels like moving deeper into the scene.
 */
/** Smoothstep for eased interpolation between flight waypoints. */
function smootherstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Cinematic flight path, sampled by scroll (0..1).
 * WAYPOINT 0 is EXACTLY the v1 hero view — camera [0, 1.2, 6] looking at the
 * origin — so the hero frame is untouched. The journey unfolds as you scroll:
 * zooming in and banking through the galaxy across the other sections.
 */
const WAYPOINTS = [
  // pos [x, y, z]          look [x, y, z]          roll
  // Hero: v1 camera, but look slightly down-left so the bright core sits below
  // the "Jamie" text area instead of directly behind it.
  { pos: [0, 1.2, 6], look: [-0.6, -0.8, 0], roll: 0 },
  { pos: [-3.4, 1.3, 3.4], look: [-0.6, -0.4, -0.4], roll: 0.07 }, // zoom in + bank hard left
  { pos: [3.6, 0.2, 1.2], look: [0.8, 0.2, -1], roll: -0.09 }, // sweep across into the arms
  { pos: [-1.6, -1, 0], look: [0, 0.1, -2], roll: 0.06 }, // skim through the plane
  { pos: [2.4, 1, -2.6], look: [-0.8, 0.2, -1.2], roll: -0.07 }, // rise past the core
  { pos: [0.8, 1.6, -5], look: [-0.2, 0.3, -2.2], roll: -0.03 }, // ease outward
  { pos: [0, 1.3, -8.5], look: [0, 0.3, -3.4], roll: 0 }, // contact: deep field
] as const;

function samplev3(
  a: readonly number[],
  b: readonly number[],
  t: number,
  out: THREE.Vector3,
) {
  out.set(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  );
  return out;
}

function CameraRig({
  scrollRef,
  pointerRef,
}: {
  scrollRef: ScrollRef;
  pointerRef: PointerRef;
}) {
  const pos = useRef(new THREE.Vector3(0, 1.2, 6));
  const look = useRef(new THREE.Vector3(-0.6, -0.8, 0));
  const tmpPos = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  useFrame((state: RootState) => {
    const scroll = Math.min(1, Math.max(0, scrollRef.current));
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    const t = state.clock.elapsedTime;

    const segments = WAYPOINTS.length - 1;
    const scaled = scroll * segments;
    const i = Math.min(segments - 1, Math.floor(scaled));
    const localT = smootherstep(i, i + 1, scaled);
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];

    samplev3(a.pos, b.pos, localT, tmpPos.current);
    samplev3(a.look, b.look, localT, tmpLook.current);

    // Idle drift + cursor parallax layered on top (kept gentle at the hero).
    const idleX = Math.sin(t * 0.15) * 0.3;
    const idleY = Math.cos(t * 0.12) * 0.2;
    tmpPos.current.x += idleX + px * 1.1;
    tmpPos.current.y += idleY - py * 0.7;

    pos.current.lerp(tmpPos.current, 0.05);
    look.current.lerp(tmpLook.current, 0.05);

    state.camera.position.copy(pos.current);
    state.camera.lookAt(look.current);

    const roll = a.roll + (b.roll - a.roll) * localT;
    state.camera.rotation.z += (roll - state.camera.rotation.z) * 0.05;
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
      <GalaxyPoints />
      <CameraRig scrollRef={scrollRef} pointerRef={pointerRef} />
    </Canvas>
  );
}
