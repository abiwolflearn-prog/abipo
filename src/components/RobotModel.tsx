import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function RobotModel() {
  const headGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftGearRef = useRef<THREE.Group>(null);
  const rightGearRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const mainGroupRef = useRef<THREE.Group>(null);
  const neckGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Tracking targets for smooth interpolation (yaw, pitch, blink, nod, click effect)
  const [blink, setBlink] = useState(false);
  const [nodOffset, setNodOffset] = useState(0);
  const [nodVelocity, setNodVelocity] = useState(0);

  // Event dispatch handlers for click/nod responses
  useEffect(() => {
    const handleAction = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type === 'click') {
        // Trigger mechanical nod velocity impulse
        setNodVelocity(0.35);
      }
    };

    window.addEventListener('robot-action', handleAction);
    return () => window.removeEventListener('robot-action', handleAction);
  }, []);

  // Periodic blinking timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      timer = setTimeout(triggerBlink, 3800 + Math.random() * 2500);
    };
    timer = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Frame animation loop executing head tracking & fine robotic micro-movements
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Idle breathing kinematics
    const breatheY = Math.sin(time * 1.8) * 0.045;
    const breatheRotationX = Math.cos(time * 1.8) * 0.008;
    
    if (mainGroupRef.current) {
      mainGroupRef.current.position.y = -0.55 + breatheY;
    }

    // 2. Mechanical nod simulation using simple physics spring damping
    let currentNod = nodOffset;
    let currentVel = nodVelocity;

    const stiffness = 165;
    const damping = 12;

    const springForce = -stiffness * currentNod;
    const dampingForce = -damping * currentVel;
    const accel = springForce + dampingForce;

    currentVel += accel * 0.016; 
    currentNod += currentVel * 0.016;

    if (Math.abs(currentNod) < 0.001 && Math.abs(currentVel) < 0.001) {
      currentNod = 0;
      currentVel = 0;
    }

    setNodOffset(currentNod);
    setNodVelocity(currentVel);

    // Apply the mechanical nod rotation offset to the head mesh
    if (headGroupRef.current) {
      headGroupRef.current.rotation.x += currentNod;
    }

    // 3. Rotating auxiliary ear ear-pieces
    if (leftGearRef.current) leftGearRef.current.rotation.z += 0.012;
    if (rightGearRef.current) rightGearRef.current.rotation.z -= 0.012;
    if (ringRef.current) ringRef.current.rotation.y = time * 0.45;

    // 4. Glowing reactor core breathing pulse
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 3.5) * 0.22;
      coreRef.current.scale.set(pulse, pulse, pulse);
      if (coreRef.current.material) {
        (coreRef.current.material as THREE.MeshBasicMaterial).color.setRGB(
          0.12, 
          0.45 + Math.sin(time * 3.5) * 0.1, 
          0.9 + Math.sin(time * 3.5) * 0.1
        );
      }
    }

    // 5. Intelligent blink simulation
    const targetScaleY = blink ? 0.05 : 1.0;
    if (leftEyeRef.current) {
      leftEyeRef.current.scale.y += (targetScaleY - leftEyeRef.current.scale.y) * 0.35;
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.scale.y += (targetScaleY - rightEyeRef.current.scale.y) * 0.35;
    }

    // 6. Micro body movement logic (swaying shoulders)
    if (neckGroupRef.current) {
      neckGroupRef.current.rotation.y = Math.sin(time * 0.6) * 0.015;
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, -0.55, 0]} name="robot-main-group-mesh">
      {/* ========================================================== */}
      {/* BASE CHASSIS / COLLARBONE / SHOULDERS */}
      {/* ========================================================== */}
      <group name="robot-shoulders-base">
        {/* Core Chest Plate */}
        <mesh position={[0, -0.35, 0]} rotation={[0.08, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.1, 0.5, 32]} />
          <meshStandardMaterial
            color="#080c14"
            roughness={0.4}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Polished Shoulder Braces */}
        <mesh position={[-1.15, -0.42, 0]} rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.5, 0.4, 0.55]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
        <mesh position={[1.15, -0.42, 0]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.5, 0.4, 0.55]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        {/* Outer glowing shoulder details */}
        <mesh position={[-1.3, -0.42, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[1.3, -0.42, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>

        {/* Central Emissive Arc-Reactor Core */}
        <group position={[0, -0.28, 0.45]} rotation={[0.72, 0, 0]}>
          {/* Bezel */}
          <mesh>
            <torusGeometry args={[0.26, 0.06, 16, 64]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.99} />
          </mesh>
          {/* Glowing Inner reactor node */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.16, 32, 32]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
          {/* Glass shroud overlay */}
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshPhysicalMaterial
              color="#0284c7"
              transparent
              opacity={0.35}
              roughness={0}
              transmission={1.0}
            />
          </mesh>
        </group>
      </group>

      {/* ========================================================== */}
      {/* HYDRAULIC MECHANICAL NECK SYSTEM */}
      {/* ========================================================== */}
      <group ref={neckGroupRef} name="robot-neck-assembly">
        {/* Main spinal column */}
        <mesh position={[0, -0.12, -0.1]}>
          <cylinderGeometry args={[0.22, 0.28, 0.55, 16]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.5}
            metalness={0.7}
          />
        </mesh>

        {/* Polished chrome sleeve */}
        <mesh position={[0, -0.05, -0.1]}>
          <cylinderGeometry args={[0.24, 0.24, 0.2, 16]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.05}
            metalness={1.0}
          />
        </mesh>

        {/* Dual Hydraulic side Pistons Left/Right */}
        <mesh position={[-0.38, -0.15, -0.05]} rotation={[0.1, 0, -0.08]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.38, -0.02, -0.05]} rotation={[0.1, 0, -0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={1.0} roughness={0.05} />
        </mesh>

        <mesh position={[0.38, -0.15, -0.05]} rotation={[0.1, 0, 0.08]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.38, -0.02, -0.05]} rotation={[0.1, 0, 0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={1.0} roughness={0.05} />
        </mesh>

        {/* Thick electrical conduits/cables back neck */}
        <mesh position={[0, -0.16, -0.25]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.45, 12]} />
          <meshStandardMaterial color="#090d16" roughness={0.7} />
        </mesh>
      </group>

      {/* ========================================================== */}
      {/* FUTURISTIC PREMIUM ROBOT HEAD ASSEMBLY */}
      {/* ========================================================== */}
      {/* The Head tracking rotation is dynamically driven in Scene parent component */}
      <group ref={headGroupRef} position={[0, 0.32, 0.05]} name="robot-head-element">
        
        {/* Glowing Head Halo / Orbit Ring back of head */}
        <mesh ref={ringRef} position={[0, 0.12, -0.55]} rotation={[0.3, 0.4, 0]}>
          <torusGeometry args={[0.82, 0.02, 12, 128]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.65} />
        </mesh>

        {/* Primary Head Chassis Sphere */}
        <mesh>
          <sphereGeometry args={[0.72, 64, 64]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.32}
            metalness={0.95}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Premium Dark Glass Faceplate Visor */}
        <mesh position={[0, 0.08, 0.22]} rotation={[0.18, 0, 0]}>
          <sphereGeometry args={[0.66, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          <meshStandardMaterial
            color="#020617"
            roughness={0.02}
            metalness={0.9}
          />
        </mesh>

        {/* Humanoid Contoured Jaw & Cheek Plates */}
        <mesh position={[0, -0.25, 0.18]} rotation={[0.42, 0, 0]}>
          <boxGeometry args={[0.56, 0.26, 0.42]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.92} />
        </mesh>
        
        {/* Chiseled Chin Plate */}
        <mesh position={[0, -0.38, 0.32]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.28, 0.16, 0.2]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={1.0} />
        </mesh>

        {/* Human-like Nose Bridge Accent */}
        <mesh position={[0, 0.02, 0.52]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.08, 0.24, 0.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.95} />
        </mesh>

        {/* Sleek outer helmet ears / Shell details */}
        <mesh position={[-0.72, 0.08, 0]} rotation={[0, 1.57, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.16, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0.72, 0.08, 0]} rotation={[0, -1.57, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.16, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Rotating Ear Cog Gears Left/Right (Micro mechanical motion) */}
        <group ref={leftGearRef} position={[-0.82, 0.08, 0]} rotation={[0, 1.57, 0]}>
          <mesh>
            <torusGeometry args={[0.18, 0.035, 12, 16]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={1.0} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.06, 0.38, 0.012]} />
            <meshStandardMaterial color="#475569" roughness={0.1} metalness={1.0} />
          </mesh>
          <mesh rotation={[0, 0, 1.57]}>
            <boxGeometry args={[0.06, 0.38, 0.012]} />
            <meshStandardMaterial color="#475569" roughness={0.1} metalness={1.0} />
          </mesh>
        </group>

        <group ref={rightGearRef} position={[0.82, 0.08, 0]} rotation={[0, -1.57, 0]}>
          <mesh>
            <torusGeometry args={[0.18, 0.035, 12, 16]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={1.0} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.06, 0.38, 0.012]} />
            <meshStandardMaterial color="#475569" roughness={0.1} metalness={1.0} />
          </mesh>
          <mesh rotation={[0, 0, 1.57]}>
            <boxGeometry args={[0.06, 0.38, 0.012]} />
            <meshStandardMaterial color="#475569" roughness={0.1} metalness={1.0} />
          </mesh>
        </group>

        {/* Outer illuminated temporal nodes (Small glowing indicator lights) */}
        <mesh position={[-0.85, 0.08, 0.1]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[0.85, 0.08, 0.1]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* ========================================================== */}
        {/* HIGH-TECH GLOWING INDEPENDENT EYES SYSTEMS */}
        {/* ========================================================== */}
        {/* Left Eye Segment */}
        <group position={[-0.26, 0.11, 0.56]} name="robot-left-gaze-core">
          {/* Eyeball Shell socket background */}
          <mesh>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
          </mesh>
          
          {/* Glowing blue iris core */}
          <mesh ref={leftEyeRef} position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.052, 32, 32]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
          {/* Intense pupil highlight */}
          <mesh position={[0, 0, 0.068]}>
            <sphereGeometry args={[0.018, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Lens shroud trim edge */}
          <mesh position={[0, 0, 0.03]}>
            <torusGeometry args={[0.065, 0.015, 8, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={1.0} />
          </mesh>
        </group>

        {/* Right Eye Segment */}
        <group position={[0.26, 0.11, 0.56]} name="robot-right-gaze-core">
          {/* Eyeball Shell socket background */}
          <mesh>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
          </mesh>
          
          {/* Glowing blue iris core */}
          <mesh ref={rightEyeRef} position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.052, 32, 32]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
          {/* Intense pupil highlight */}
          <mesh position={[0, 0, 0.068]}>
            <sphereGeometry args={[0.018, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Lens shroud trim edge */}
          <mesh position={[0, 0, 0.03]}>
            <torusGeometry args={[0.065, 0.015, 8, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={1.0} />
          </mesh>
        </group>

        {/* Central HUD Scan line detail / Cheek lines (High tech grooves) */}
        <mesh position={[0, -0.1, 0.51]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[0.42, 0.015, 0.12]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>

        <mesh position={[0, -0.16, 0.48]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[0.24, 0.012, 0.12]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
        </mesh>

        {/* Sleek metallic crown crest */}
        <mesh position={[0, 0.68, 0.01]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.12, 0.28, 0.35]} />
          <meshStandardMaterial color="#64748b" roughness={0.1} metalness={1.0} />
        </mesh>
        <mesh position={[0, 0.74, -0.15]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      </group>
    </group>
  );
}
