import { WIDTH, HEIGHT } from "@/utils";
import { TetrisBlock } from "./TetrisBlock";

const makeGridBounds = () => {
    let bounds = [];
    for (let y = -1; y < WIDTH + 1; y++) {
        bounds.push([0, y]);
    }
    for (let x = 0; x < HEIGHT; x++) {
        bounds.push([x, -1]);
        bounds.push([x, WIDTH]);
    }
    return bounds;
};

const gridBounds = makeGridBounds();

export const TetrisBounds = () => {
    return (
        <>
            {gridBounds.map((coord, index) => (
                <TetrisBlock key={index} coord={[...coord, -30]} color="#2b2d42" />
            ))}
        </>
    );
};
