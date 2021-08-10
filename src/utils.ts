import { nanoid } from "nanoid";

export const WIDTH = 10;
export const HEIGHT = 20;

export const OFFSET_H = -WIDTH / 2;
export const OFFSET_V = -HEIGHT / 2;

export type Coord = number[];
export type Coord3d = number[];

export interface WithCoord {
    coord: Coord;
}
export interface WithCoord3d {
    coord: Coord3d;
}

export const colorByPieceName: Record<string, string> = {
    I: "#264653",
    J: "#2a9d8f",
    L: "#8AB17D",
    Z: "#BABB74",
    S: "#E9C46A",
    O: "#F4A261",
    T: "#E76F51",
};
export interface Move {
    cells: { x: number; y: number }[];
    piece: string;
}

export const moveDtoToBlocks = (move: Move) => {
    const cells = move.cells.map((cell) => ({
        x: cell.y,
        y: cell.x,
        name: move.piece,
        key: nanoid(12),
    }));
    return cells;
};
