import { colorByPieceName, HEIGHT, OFFSET_H, OFFSET_V, WithCoord3d } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { activeRef } from "./Tetris";
import * as THREE from "three";

export interface Block {
    x: number;
    y: number;
    name: string;
    key: string;
}

export const TetrisBlock = ({ coord, color }: WithCoord3d & { color?: string }) => {
    const [x, y, z] = coord;
    const position = [OFFSET_H + y, OFFSET_V + x, z];

    const meshes = useMemo(() => {
        const meshes = [];
        const geo = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: "black" });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(position[0], position[1], position[2]);

        meshes.push(mesh);

        const outlineMaterial = new THREE.MeshStandardMaterial({ color: color || "pink" });
        let outlineMesh = new THREE.Mesh(geo, outlineMaterial);
        outlineMesh.position.set(position[0], position[1], position[2]);
        outlineMesh.scale.x = 0.9;
        outlineMesh.scale.y = 0.9;
        outlineMesh.scale.z = 0.5;
        outlineMesh.position.z += 0.25;
        outlineMesh.renderOrder = 100;

        meshes.push(outlineMesh);

        outlineMesh = new THREE.Mesh(geo, outlineMaterial);
        outlineMesh.position.set(position[0], position[1], position[2]);
        outlineMesh.scale.x = 0.5;
        outlineMesh.scale.y = 0.9;
        outlineMesh.scale.z = 0.9;
        outlineMesh.position.x += 0.25;
        outlineMesh.renderOrder = 100;

        meshes.push(outlineMesh);

        outlineMesh = new THREE.Mesh(geo, outlineMaterial);
        outlineMesh.position.set(position[0], position[1], position[2]);
        outlineMesh.scale.x = 0.5;
        outlineMesh.scale.y = 0.9;
        outlineMesh.scale.z = 0.9;
        outlineMesh.position.x -= 0.25;
        outlineMesh.renderOrder = 100;

        meshes.push(outlineMesh);

        outlineMesh = new THREE.Mesh(geo, outlineMaterial);
        outlineMesh.position.set(position[0], position[1], position[2]);
        outlineMesh.scale.x = 0.9;
        outlineMesh.scale.y = 0.5;
        outlineMesh.scale.z = 0.9;
        outlineMesh.position.y += 0.25;

        meshes.push(outlineMesh);

        return meshes;
    }, [coord]);

    useFrame(() => {});
    return (
        <group dispose={null}>
            {meshes.map((mesh, index) => (
                <mesh key={index} {...mesh} />
            ))}
        </group>
    );
};

const START_POS = [0, HEIGHT, -30];

export const AnimatedBlock = ({
    block,
    isExploding,
    explosionCallback,
}: {
    block: Block;
    isExploding?: boolean;
    explosionCallback?: Function;
}) => {
    const [_, startY, startZ] = START_POS;
    const [currentCoords, setCurrentCoords] = useState([block.x, startY, startZ]);

    useFrame(() => {
        let coords = [...currentCoords];
        let shouldUpdateState = false;
        if (currentCoords[1] <= HEIGHT - block.y) {
            activeRef.actives.delete(block.key);
        } else {
            shouldUpdateState = true;
            coords[1] = currentCoords[1] - 0.5;
        }

        if (isExploding) {
            if (currentCoords[2] > -31) {
                shouldUpdateState = true;
                coords[2] = currentCoords[2] - 0.02;
            } else explosionCallback?.();
        }

        if (shouldUpdateState) setCurrentCoords(coords);
    });

    const data = [currentCoords[1], block.x, currentCoords[2]];

    return <TetrisBlock coord={data} color={colorByPieceName[block.name]} />;
};
