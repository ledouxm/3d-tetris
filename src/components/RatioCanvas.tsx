import { Stack } from "@chakra-ui/react";
import { Physics, useBox } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { letters } from "./letters";

/*
    x: depth
    y: height
    z: width
*/

interface Cube {
    dest: Vector3;
    basePosition: Vector3;
    color: string;
}
const randomPosition = (offset: Vector3) =>
    new THREE.Vector3(
        -Math.random() * 20 + 10,
        -Math.random() * 20 + 10,
        -Math.random() * 20 + 10
    ).add(offset);

const makeCube = (dest: Vector3, offset: Vector3, color: string) => {
    return {
        dest: dest.add(offset),
        basePosition: randomPosition(offset),
        color,
    };
};

const cubes = letters.flatMap((letter) =>
    letter.cubes.map((cube) => makeCube(new THREE.Vector3(...cube), letter.offset, letter.color))
);

export const RatioCanvas = () => {
    const [shouldGather, setShouldGather] = useState(false);

    useEffect(() => {
        console.log(shouldGather);
        shouldGatherRef.current = shouldGather;
    }, [shouldGather]);

    return (
        <Stack boxSize="100%" onClick={() => setShouldGather((current) => !current)}>
            <Canvas camera={{ fov: 70, position: [15, 0, 0] }}>
                <ambientLight intensity={0.3} />
                <pointLight intensity={0.7} position={[5, 0, 0]} />
                <Background />
                <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
                    {cubes.map((cube, index) => (
                        <BoxMesh {...cube} key={index} />
                    ))}
                </Physics>
            </Canvas>
        </Stack>
    );
};

const Background = () => {
    return (
        <mesh
            position={[-50, 0, 0]}
            receiveShadow
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            scale={500}
        >
            <planeBufferGeometry />
            <meshBasicMaterial attach="material" color="white" />
        </mesh>
    );
};
const shouldGatherRef = {
    current: false,
};

const attractionStrength = 50;
export const BoxMesh = ({ dest, basePosition, color }: Cube) => {
    const [ref, api] = useBox(() => ({
        mass: 5,
        linearDamping: 0.95,
        position: basePosition.toArray(),
        angularFactor: [0, 0, 0],
    }));

    useEffect(() => {
        api.position.subscribe((p) => {
            // substract current position to destination to get needed force
            if (shouldGatherRef.current) {
                const forceVec = new THREE.Vector3(dest.x - p[0], dest.y - p[1], dest.z - p[2])
                    // apply a strength factor
                    .multiplyScalar(attractionStrength);
                api.applyForce(forceVec.toArray(), dest.toArray());
            } else {
                const forceVec = new THREE.Vector3(
                    basePosition.x - p[0] - Math.random(),
                    basePosition.y - p[1] - Math.random(),
                    basePosition.z - p[2] - Math.random()
                )
                    // apply a strength factor
                    .multiplyScalar(attractionStrength);
                api.applyForce(forceVec.toArray(), basePosition.toArray());
            }
        });
    }, []);

    return (
        <mesh ref={ref}>
            <boxGeometry />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};
