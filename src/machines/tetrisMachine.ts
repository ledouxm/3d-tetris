import { activeRef } from "@/components/Tetris";
import { Block } from "@/components/TetrisBlock";
import { assign, createMachine } from "xstate";
import { HEIGHT, Move, moveDtoToBlocks } from "../utils";

export const tetrisMachine = createMachine(
    {
        initial: "initial",
        context: {
            moves: [] as Move[],
            currentIndex: 0,
            blocks: [] as Block[],
            lastAdded: [] as Block["key"][],
            linesToClear: [] as number[],
            autoPlay: false,
        },
        states: {
            initial: { on: { START: { target: "started", actions: "setMoves" } } },
            started: {
                always: { cond: "isAutoPlay", target: "falling", actions: "newPiece" },
                on: {
                    NEW_PIECE: { target: "falling", actions: "newPiece" },
                },
            },
            falling: {
                invoke: {
                    src: async (context, event) => waitForEachBlockToLand(context.lastAdded, 100),
                    onDone: [
                        {
                            target: "tetris",
                            actions: "checkTetris",
                            cond: "shouldClearLine",
                        },
                        {
                            target: "started",
                            actions: "checkTetris",
                        },
                    ],
                },
            },
            tetris: {
                on: { CLEARED: { target: "started", actions: "clear" } },
            },
        },
        on: {
            TOGGLE_AUTOPLAY: { actions: "toggleAutoPlay" },
        },
    },
    {
        actions: {
            toggleAutoPlay: assign((context) => ({ ...context, autoPlay: !context.autoPlay })),
            newPiece: assign((context) => {
                const lastAdded = moveDtoToBlocks(context.moves[context.currentIndex]);
                lastAdded.forEach((block) => {
                    activeRef.actives.set(block.key, true);
                });
                return {
                    ...context,
                    currentIndex: context.currentIndex + 1,
                    blocks: [...context.blocks, ...lastAdded],
                    lastAdded: lastAdded.map((block) => block.key),
                };
            }),
            clear: assign((context) => {
                let { blocks, linesToClear } = context;
                linesToClear.forEach((y) => {
                    blocks = blocks
                        .filter((move) => move.y !== y)
                        .map((move) => {
                            if (move.y >= y) return { ...move, y: move.y };
                            activeRef.actives.set(move.key, true);
                            return {
                                ...move,
                                y: move.y + 1,
                            };
                        });
                });
                return { ...context, linesToClear: [], blocks };
            }),
            setMoves: assign((context, event: any) => ({
                ...context,
                moves: event.moves,
            })),
            checkTetris: assign((context) => {
                const linesToClear = [];
                let blocks = context.blocks;
                for (let y = 0; y < HEIGHT; y++) {
                    if (blocks.filter((block) => block.y === y).length === 10) {
                        linesToClear.push(y);
                    }
                }

                return { ...context, blocks, linesToClear };
            }),
        },
        guards: {
            isAutoPlay: (context) => !!context.autoPlay,
            shouldClearLine: (context, event) => {
                let blocks = context.blocks;
                let clearLines = false;
                for (let y = 0; y < HEIGHT; y++) {
                    if (blocks.filter((block) => block.y === y).length === 10) clearLines = true;
                }
                return clearLines;
            },
        },
    }
);

const waitForEachBlockToLand = (blocks: Block["key"][], delay: number) =>
    new Promise((resolve) => {
        setInterval(() => {
            if (blocks.every((key) => !activeRef.actives.has(key)))
                setTimeout(() => resolve("ok"), 100);
        }, 10);
    });

export const explosionDelay = 1000;
