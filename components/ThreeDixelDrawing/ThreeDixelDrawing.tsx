import React from 'react';
import { Canvas } from 'react-three-fiber';
import ThreeDixel from '~components/ThreeDixel/ThreeDixel';

type Matrix = number[][];
type ThreeDixelDrawingProps = { matrix: Matrix };
const padding = 0.3;

export const ThreeDixelDrawing: React.FC<ThreeDixelDrawingProps> = ({ matrix }: ThreeDixelDrawingProps) => (
  <Canvas style={{ width: '500px', height: '500px', margin: '0 auto' }} camera={{ position: [0, 0, 15] }}>
    <ambientLight intensity={0.3} />
    <spotLight position={[15, 15, 20]} angle={0.25} penumbra={1.3} />
    <pointLight position={[-10, -10, -10]} />
    {matrix.flatMap((row, rowIndex) =>
      row
        .map((col, colIndex) =>
          col ? (
            <ThreeDixel
              key={`${rowIndex}-${colIndex}`}
              position={[
                colIndex + padding * colIndex - row.length / 2,
                -(rowIndex + padding * rowIndex - matrix.length / 2),
                0,
              ]}
            />
          ) : null
        )
        .filter(Boolean)
    )}
  </Canvas>
);
export default ThreeDixelDrawing;
