import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
type ThreeDixelProps = {
  position: [number, number, number];
};
export const ThreeDixel: React.FC<ThreeDixelProps> = ({ position, ...rest }: ThreeDixelProps) => {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    const node = mesh.current;
    node.rotation.x += 0.007;
    node.rotation.y += 0.007;
  });
  return (
    <mesh
      {...rest}
      ref={mesh}
      position={position}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" color={hovered ? 'pink' : 'red'} />
    </mesh>
  );
};
export default ThreeDixel;
