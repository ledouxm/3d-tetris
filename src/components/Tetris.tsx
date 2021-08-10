import { useMachine } from "@xstate/react";
import { atom, useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { atomWithMachine } from "jotai/xstate";
import { useEffect, useRef } from "react";
import { tetrisMachine } from "../machines/tetrisMachine";
import { movesAtom } from "./AppCanvas";
import { AnimatedBlock, Block } from "./TetrisBlock";

export const moveCptAtom = atom(-1);
export const blocksAtom = atom<Block[]>([]);

export const activeRef = { actives: new Map() };

export const tetrisMachineAtom = atomWithMachine(tetrisMachine);

export const Tetris = () => {
    const moves = useAtomValue(movesAtom);
    const moveCpt = useAtomValue(moveCptAtom);
    const [current, send] = useAtom(tetrisMachineAtom);

    const prevMoveCpt = useRef(0);

    // initialize tetrisMachine with fetched moves
    useEffect(() => {
        if (!moves) return;
        send({ type: "START", moves });
    }, [moves]);

    const playMove = async () => {
        send({ type: "NEW_PIECE" });
    };

    // TODO: do something better with atom probably?
    // play next move if moveCpt changed
    useEffect(() => {
        if (prevMoveCpt.current === moveCpt) return;

        playMove();
        prevMoveCpt.current = moveCpt;
    }, [moveCpt]);

    if (!moves.length) return null;

    const { context } = current;
    const { blocks } = context;

    return (
        <>
            {blocks.map((block) => {
                const isExploding =
                    current.matches("tetris") && current.context.linesToClear.includes(block.y);
                return (
                    <AnimatedBlock
                        block={block}
                        key={block.key}
                        isExploding={isExploding}
                        explosionCallback={
                            isExploding ? () => send({ type: "CLEARED" }) : undefined
                        }
                    />
                );
            })}
        </>
    );
};
