import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { Coord, Coord3d, TetrisBlock, WithCoord3d } from "./AppCanvas";
import { OFFSET_V, HEIGHT, WIDTH, OFFSET_H } from "./utils";

const START_POS = [0, HEIGHT, -30];

const shapes: Record<string, Coord[]> = {
    L: [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
    ],
};

export const AnimatedTetromino = ({
    cells,
    x,
    goalY,
    name,
}: {
    name: string;
    cells: any;
    x: number;
    goalY: number;
}) => {
    // const [_, goalY] = coord;
    const [_, startY, startZ] = START_POS;
    const [currentCoords, setCurrentCoords] = useState([x, startY, startZ]);

    useFrame(() => {
        if (currentCoords[1] <= HEIGHT - goalY) return;
        setCurrentCoords([currentCoords[0], currentCoords[1] - 0.5, currentCoords[2]]);
    });

    const newCells = cells.map((coord) => ({
        x: currentCoords[1] - coord.y,
        y: coord.x,
    }));
    console.log({ cells, currentCoords, newCells });

    return <Tetromino cells={newCells} />;
};

export const Tetromino = ({ cells }: { cells: { x: number; y: number }[] }) => {
    return (
        <>
            {cells.map(({ x: shapeX, y: shapeY }, index) => (
                <TetrisBlock coord={[shapeX, shapeY]} />
            ))}
        </>
    );
};
