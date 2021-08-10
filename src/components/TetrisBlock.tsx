import { colorByPieceName, HEIGHT, OFFSET_H, OFFSET_V, WithCoord3d } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { activeRef } from "./Tetris";

export interface Block {
    x: number;
    y: number;
    name: string;
    key: string;
}

export const TetrisBlock = ({ coord, color }: WithCoord3d & { color?: string }) => {
    const [x, y, z] = coord;

    return (
        <mesh position={[OFFSET_H + y, OFFSET_V + x, z]}>
            <boxBufferGeometry />
            <meshStandardMaterial color={color || "pink"} />
        </mesh>
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
