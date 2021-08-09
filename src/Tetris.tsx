import { api } from "./api";
import { useQuery } from "react-query";
import { AnimatedTetromino } from "./Tetrominos";
import { atom, useAtom } from "jotai";
import { movesAtom } from "./AppCanvas";
import { useState } from "react";
import { useAtomValue } from "jotai/utils";

export const moveCptAtom = atom(0);

export const Tetris = () => {
    const moves = useAtomValue(movesAtom);
    const [current, setCurrent] = useAtom(moveCptAtom);
    if (!moves.length) return null;

    console.log({ moves, current: moves[current] });
    return (
        <>
            {moves.slice(0, current).map((move) => (
                <AnimatedTetromino {...moveDtoToMove(move)} />
            ))}
        </>
    );
};

export interface Move {
    cells: { x: number; y: number }[];
    piece: string;
}

const moveDtoToMove = (move: Move) => {
    const x = move.cells[0].y;
    const goalY = Math.min(...move.cells.map((cell) => cell.x));

    const cells = move.cells.map((cell) => ({ y: cell.x - goalY, x: cell.y }));
    console.log({ x, goalY, cells, name: move.piece });
    return { x, goalY, cells, name: move.piece };
};
