import {
    colorByPieceName,
    HEIGHT,
    hexColorByPieceName,
    OFFSET_H,
    OFFSET_V,
    WithCoord3d,
} from "@/utils";
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

export const TetrisBlock = ({ coord, color }: WithCoord3d & { color?: number }) => {
    const [x, y, z] = coord;
    const position = [OFFSET_H + y, OFFSET_V + x, z];

    const meshes = useMemo(() => {
        const meshes = [];
        const geo = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ map: createTexture(color) });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(position[0], position[1], position[2]);

        meshes.push(mesh);

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
            if (currentCoords[2] >= -31.5) {
                shouldUpdateState = true;
                coords[2] = currentCoords[2] - 0.02;
                if (currentCoords[2] > 30.5) explosionCallback?.();
            } else explosionCallback?.();
        }

        if (shouldUpdateState) setCurrentCoords(coords);
    });

    const data = [currentCoords[1], block.x, currentCoords[2]];

    return <TetrisBlock coord={data} color={hexColorByPieceName[block.name]} />;
};
const textureSize = 40;

const borderWidth = 2;
const borderMax = textureSize - 1 - borderWidth;
const borderMin = borderWidth;

const createTexture = (hexColor: number) => {
    const w = textureSize;
    const h = textureSize;
    const size = w * h;

    const data = new Uint8Array(3 * size);
    const color = new THREE.Color(hexColor);
    const blackColor = new THREE.Color(0x000000);

    const isIn = (x: number, y: number) => {
        return x > borderMin && x < borderMax && y > borderMin && y < borderMax;
    };

    for (let i = 0; i < size; i++) {
        const y = i % w;
        const x = Math.floor(i / w);

        const stride = i * 3;
        if (isIn(x, y)) {
            data[stride] = Math.floor(color.r * 255);
            data[stride + 1] = Math.floor(color.g * 255);
            data[stride + 2] = Math.floor(color.b * 255);
        } else {
            data[stride] = Math.floor(blackColor.r * 255);
            data[stride + 1] = Math.floor(blackColor.g * 255);
            data[stride + 2] = Math.floor(blackColor.b * 255);
        }
    }
    const texture = new THREE.DataTexture(data, w, h, THREE.RGBFormat);
    return texture;
};
