import { useUpdateAtom } from "jotai/utils";
import { blocksAtom } from "./Tetris";

export const useClearLine = () => {
    const setBlocks = useUpdateAtom(blocksAtom);
    const clearLine = (index: number) => {
        setBlocks((blocks) =>
            blocks
                .filter((move) => move.y !== index)
                .map((move) => ({
                    ...move,
                    y: move.y < index ? move.y + 1 : move.y,
                }))
        );
    };

    return clearLine;
};
