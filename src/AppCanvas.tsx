import { Button } from "@chakra-ui/react";
import { Physics, Triplet, useBox, usePlane } from "@react-three/cannon";
import { Canvas, useFrame } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { useState } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import { api } from "./api";
import { Move, moveCptAtom, Tetris } from "./Tetris";
import { AnimatedTetromino } from "./Tetrominos";
import { HEIGHT, WIDTH, OFFSET_V, OFFSET_H } from "./utils";

const BLOCK_SIZE = 1;

const gridBounds = [
    [0, 0],
    [HEIGHT - 1, 0],
    [HEIGHT - 1, WIDTH - 1],
    [0, WIDTH - 1],
];

const TetrisBounds = () => {
    const mesh = useRef(null);

    return (
        <>
            {gridBounds.map((coord, index) => (
                <TetrisBlock key={index} coord={coord} />
            ))}
        </>
    );
};

const floorRotation: Triplet = [-Math.PI / 2, 0, 0];
const lateralWallRotation: Triplet = [0, -Math.PI / 2, 0];
const Floor = () => {
    const [ref] = usePlane(() => ({
        position: [0, OFFSET_V - BLOCK_SIZE / 2, 0],
        rotation: floorRotation,
        status: "static",
    }));

    return (
        <mesh ref={ref} rotation={floorRotation} receiveShadow scale={200}>
            <planeBufferGeometry />
            <meshStandardMaterial attach="material" color="gray" />
        </mesh>
    );
};

const Wall = () => {
    const [ref] = usePlane(() => ({
        position: [1, 0, 0],
        rotation: lateralWallRotation,
        status: "static",
    }));

    return (
        <mesh rotation={lateralWallRotation} receiveShadow scale={200} ref={ref}>
            <planeBufferGeometry />
            <meshStandardMaterial attach="material" color="red" />
        </mesh>
    );
};
export type Coord = number[];
export type Coord3d = number[];

export interface WithCoord {
    coord: Coord;
}
export interface WithCoord3d {
    coord: Coord3d;
}
export const TetrisBlock = ({ coord }: WithCoord) => {
    const [x, y] = coord;
    console.log({ coord });
    return (
        <mesh position={[OFFSET_H + y, OFFSET_V + x, -30]}>
            <boxBufferGeometry />
            <meshStandardMaterial wireframe color="pink" />
        </mesh>
    );
};

export const movesAtom = atom<Move[]>([]);

const getBestGame = async () => (await api.get("/game/best")).data;

export const AppCanvas = () => {
    const [moves, updateMoves] = useAtom(movesAtom);
    const [current, updateCurrent] = useAtom(moveCptAtom);

    // NO useFrame IN CANVAS COMPONENT (?)

    useQuery("bestGame", getBestGame, {
        onSuccess: (data) => updateMoves(data.moves),
    });
    return (
        <>
            <Button
                onClick={() => {
                    if (current < moves.length - 1) updateCurrent((current) => current + 1);
                }}
            >
                next
            </Button>
            <Canvas camera={{ fov: 50, position: [0, 0, 0] }}>
                <ambientLight intensity={0.3} />
                <pointLight />
                <Physics>
                    <TetrisBounds />
                    <Tetris />
                    <Floor />
                    {/* <Wall /> */}
                </Physics>
            </Canvas>
        </>
    );
};
