import React, { useEffect, useState, useMemo } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface MathWireframeProps {
  type: "hyperbolic" | "torus" | "concentric";
  width?: number;
  height?: number;
  className?: string;
  speed?: number;
}

export default function MathWireframe({
  type,
  width = 400,
  height = 400,
  className = "",
  speed = 0.3,
}: MathWireframeProps) {
  // Rotation angles
  const [angleX, setAngleX] = useState(0.2);
  const [angleY, setAngleY] = useState(0.5);
  const [angleZ, setAngleZ] = useState(0.1);

  // Slow continuous rotation
  useEffect(() => {
    let frameId: number;
    const update = () => {
      setAngleY((prev) => (prev + 0.002 * speed) % (Math.PI * 2));
      setAngleZ((prev) => (prev + 0.001 * speed) % (Math.PI * 2));
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [speed]);

  // Project 3D coordinate to 2D
  const project = (pt: Point3D): { x: number; y: number } => {
    // 3D rotations
    // Rotate about Z
    let x1 = pt.x * Math.cos(angleZ) - pt.y * Math.sin(angleZ);
    let y1 = pt.x * Math.sin(angleZ) + pt.y * Math.cos(angleZ);
    let z1 = pt.z;

    // Rotate about X
    let x2 = x1;
    let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
    let z2 = y1 * Math.sin(angleX) + z1 * Math.cos(angleX);

    // Rotate about Y
    let x3 = x2 * Math.cos(angleY) + z2 * Math.sin(angleY);
    let y3 = y2;
    let z3 = -x2 * Math.sin(angleY) + z2 * Math.cos(angleY);

    // Perspective projection
    const d = 260; // camera distance
    const fov = 350; // perspective scaling factor
    const scale = fov / (d + z3);

    const screenX = width / 2 + x3 * scale;
    const screenY = height / 2 + y3 * scale;

    return { x: screenX, y: screenY };
  };

  // Generate 3D grid data based on mathematical formulas
  const gridLines = useMemo(() => {
    const paths: Point3D[][] = [];

    if (type === "hyperbolic") {
      // Hyperboloid structure (looks like grid wireframe mesh overlay)
      const uSegments = 16;
      const vSegments = 16;
      
      // Lines along U
      for (let i = 0; i < uSegments; i++) {
        const u = -1.2 + (2.4 * i) / (uSegments - 1);
        const line: Point3D[] = [];
        for (let j = 0; j < vSegments; j++) {
          const theta = (2 * Math.PI * j) / (vSegments - 1);
          const r = Math.sqrt(1 + u * u) * 45; // scale radius
          line.push({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: u * 60,
          });
        }
        paths.push(line);
      }

      // Lines along V (cross-section circles)
      for (let j = 0; j < vSegments; j++) {
        const theta = (2 * Math.PI * j) / vSegments;
        const line: Point3D[] = [];
        for (let i = 0; i < uSegments; i++) {
          const u = -1.2 + (2.4 * i) / (uSegments - 1);
          const r = Math.sqrt(1 + u * u) * 45;
          line.push({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: u * 60,
          });
        }
        paths.push(line);
      }
    } else if (type === "torus") {
      // Horn Torus structure
      const uSegments = 18;
      const vSegments = 18;
      const R = 50; // Major radius
      const r_minor = 25; // Minor radius

      // Longitudinal circles
      for (let i = 0; i < uSegments; i++) {
        const u = (Math.PI * 2 * i) / uSegments;
        const line: Point3D[] = [];
        for (let j = 0; j <= vSegments; j++) {
          const v = (Math.PI * 2 * j) / vSegments;
          line.push({
            x: (R + r_minor * Math.cos(v)) * Math.cos(u),
            y: (R + r_minor * Math.cos(v)) * Math.sin(u),
            z: r_minor * Math.sin(v),
          });
        }
        paths.push(line);
      }

      // Latitudinal circles
      for (let j = 0; j < vSegments; j++) {
        const v = (Math.PI * 2 * j) / vSegments;
        const line: Point3D[] = [];
        for (let i = 0; i <= uSegments; i++) {
          const u = (Math.PI * 2 * i) / uSegments;
          line.push({
            x: (R + r_minor * Math.cos(v)) * Math.cos(u),
            y: (R + r_minor * Math.cos(v)) * Math.sin(u),
            z: r_minor * Math.sin(v),
          });
        }
        paths.push(line);
      }
    } else {
      // Concentric waves spiral / flat circular mesh
      const ringSegments = 12;
      const radialSegments = 18;

      // Concentric circles
      for (let rIdx = 1; rIdx <= ringSegments; rIdx++) {
        const radius = (rIdx / ringSegments) * 75;
        const line: Point3D[] = [];
        for (let sIdx = 0; sIdx <= radialSegments; sIdx++) {
          const angle = (Math.PI * 2 * sIdx) / radialSegments;
          // Z displacement based on Bessel-like oscillation function
          const z = Math.sin(radius * 0.08) * 20;
          line.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            z: z,
          });
        }
        paths.push(line);
      }

      // Radial spokes
      for (let sIdx = 0; sIdx < radialSegments; sIdx++) {
        const angle = (Math.PI * 2 * sIdx) / radialSegments;
        const line: Point3D[] = [];
        for (let rIdx = 0; rIdx <= ringSegments; rIdx++) {
          const radius = (rIdx / ringSegments) * 75;
          const z = Math.sin(radius * 0.08) * 20;
          line.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            z: z,
          });
        }
        paths.push(line);
      }
    }

    return paths;
  }, [type]);

  // Project all 3D points to 2D screen coordinates
  const projectedPaths = gridLines.map((line) => line.map(project));

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible select-none pointer-events-none ${className}`}
      id={`wireframe-${type}`}
    >
      <defs>
        <linearGradient id="wireframeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      
      {/* Draw paths */}
      {projectedPaths.map((segments, pathIdx) => {
        if (segments.length < 2) return null;
        let d = `M ${segments[0].x.toFixed(1)} ${segments[0].y.toFixed(1)}`;
        for (let i = 1; i < segments.length; i++) {
          d += ` L ${segments[i].x.toFixed(1)} ${segments[i].y.toFixed(1)}`;
        }
        return (
          <path
            key={pathIdx}
            d={d}
            fill="none"
            stroke="url(#wireframeGrad)"
            strokeWidth="0.8"
            className="hover:stroke-fuchsia-400 transition-colors duration-300"
            opacity="0.65"
          />
        );
      })}
    </svg>
  );
}
