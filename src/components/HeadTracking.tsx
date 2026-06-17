import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface HeadTrackingProps {
  // We can pass a ref to the robot head group, or we can queries find it in the fiber hierarchy!
  robotGroupRef: React.RefObject<THREE.Group | null>;
}

export default function HeadTracking({ robotGroupRef }: HeadTrackingProps) {
  const { size } = useThree();
  
  // Interpolated tracking states (yaw, pitch) for smooth easing
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);
  
  // Target position overrides from CTA hover events
  const customTarget = useRef<{ x: number; y: number } | null>(null);
  const isCustomTargetActive = useRef(false);

  // Mouse move and click listening logic
  useEffect(() => {
    const handleAttention = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        customTarget.current = { x: customEvent.detail.x, y: customEvent.detail.y };
        isCustomTargetActive.current = true;
      }
    };

    const handleReset = () => {
      customTarget.current = null;
      isCustomTargetActive.current = false;
    };

    window.addEventListener('robot-attention', handleAttention);
    window.addEventListener('robot-reset', handleReset);

    return () => {
      window.removeEventListener('robot-attention', handleAttention);
      window.removeEventListener('robot-reset', handleReset);
    };
  }, []);

  useFrame((state) => {
    // Traverse to locate the child head element group from the overall robot group
    let headElement: THREE.Object3D | null = null;
    let leftIris: THREE.Object3D | null = null;
    let rightIris: THREE.Object3D | null = null;

    if (robotGroupRef.current) {
      robotGroupRef.current.traverse((child) => {
        if (child.name === 'robot-head-element') {
          headElement = child;
        } else if (child.name === 'robot-left-gaze-core') {
          // Eyeballs tracking independently
          leftIris = child;
        } else if (child.name === 'robot-right-gaze-core') {
          rightIris = child;
        }
      });
    }

    if (!headElement) return;

    // Default target coords (normalized screen space -1 to 1)
    let targetX = 0;
    let targetY = 0;

    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    if (isCustomTargetActive.current && customTarget.current) {
      // Use override coordinate from custom CTA button hover event
      targetX = customTarget.current.x;
      targetY = customTarget.current.y;
    } else if (hasMouse) {
      // Use the active high-precision pointer values from R3F pointer state
      targetX = state.pointer.x;
      targetY = state.pointer.y;
    } else {
      // Mobile touch check or slow autonomous breathing loop when inactive
      const touches = state.events.handlers ? state.pointer : null;
      const isTouching = touches && (Math.abs(touches.x) > 0.01 || Math.abs(touches.y) > 0.01);

      if (isTouching && touches) {
        targetX = touches.x;
        targetY = touches.y;
      } else {
        // Slow natural cosmic scouting loop simulating sentience
        const time = state.clock.getElapsedTime();
        targetX = Math.sin(time * 0.45) * 0.35 + Math.cos(time * 0.12) * 0.15;
        targetY = Math.cos(time * 0.35) * 0.15 + Math.sin(time * 0.08) * 0.1;
      }
    }

    // Convert normalized coordinate to angles (limiter clamping)
    // Horizontal head rotational angle bound: ±65 degrees (approx 1.13 radians)
    // Vertical head rotational angle bound: ±38 degrees (approx 0.66 radians)
    const targetYaw = targetX * 1.13;
    const targetPitch = targetY * 0.66;

    // Apply linear interpolation (lerp factor) for butter-smooth visual kinematics
    // Lower factor = slower, smoother spring drift
    const lerpSpeed = 0.065;
    currentYaw.current += (targetYaw - currentYaw.current) * lerpSpeed;
    currentPitch.current += (targetPitch - currentPitch.current) * lerpSpeed;

    // Apply rotations directly onto the composite head joints
    headElement.rotation.y = currentYaw.current;
    
    // Negative pitch to mirror vertical tracking direction correctly (up is up)
    headElement.rotation.x = -currentPitch.current;

    // Eyeballs independent tracking. Eyeballs run on a tighter degree but move faster
    const eyeLerpSpeed = 0.14;
    const targetEyeYaw = targetX * 0.38;
    const targetEyePitch = -targetY * 0.22;

    if (leftIris) {
      leftIris.rotation.y += (targetEyeYaw - leftIris.rotation.y) * eyeLerpSpeed;
      leftIris.rotation.x += (targetEyePitch - leftIris.rotation.x) * eyeLerpSpeed;
    }
    if (rightIris) {
      rightIris.rotation.y += (targetEyeYaw - rightIris.rotation.y) * eyeLerpSpeed;
      rightIris.rotation.x += (targetEyePitch - rightIris.rotation.x) * eyeLerpSpeed;
    }
  });

  return null;
}
