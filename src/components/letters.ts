import { randomHexColor } from "@/utils";
import { Vector3 } from "three";

export const RLetter = {
    offset: new Vector3(0, -2, 10),
    color: "#0a9396",
    cubes: [
        [0, 0, -0],
        [0, 1, -0],
        [0, 2, -0],
        [0, 3, -0],
        [0, 4, -0],
        [0, 4, -1],
        [0, 4, -2],
        [0, 3, -3],
        [0, 2, -2],
        [0, 2, -1],
        [0, 1, -2],
        [0, 0, -3],
    ],
};

export const ALetter = {
    offset: new Vector3(0, -2, 4),
    color: "#94d2bd",
    cubes: [
        [0, 0, -0],
        [0, 1, -0],
        [0, 2, -0],
        [0, 3, -0],
        [0, 4, -1],
        [0, 4, -2],
        [0, 3, -3],
        [0, 2, -3],
        [0, 1, -3],
        [0, 0, -3],
        [0, 2, -1],
        [0, 2, -2],
    ],
};
export const TLetter = {
    offset: new Vector3(0, -2, -1),
    color: "#ca6702",
    cubes: [
        [0, 0, -1],
        [0, 1, -1],
        [0, 2, -1],
        [0, 3, -1],
        [0, 4, -1],
        [0, 4, -0],
        [0, 4, -2],
    ],
};
export const ILetter = {
    offset: new Vector3(0, -2, -5),
    color: "#bb3e03",
    cubes: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 2, 0],
        [0, 3, 0],
        [0, 4, 0],
    ],
};
export const OLetter = {
    offset: new Vector3(0, -2, -10),
    color: "#9b2226",
    cubes: [
        [0, 1, 0],
        [0, 2, 0],
        [0, 3, 0],
        [0, 4, 1],
        [0, 4, 2],
        [0, 1, 3],
        [0, 2, 3],
        [0, 3, 3],
        [0, 0, 1],
        [0, 0, 2],
    ],
};

export const letters = [RLetter, ALetter, TLetter, ILetter, OLetter];
