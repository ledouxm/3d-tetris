export interface BasePiece {
    name: string;
    cells: Array<{ x: number; y: number }>;
    rotation: number;
}

export const basePieces: BasePiece[] = [
    {
        name: "I",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 2,
            },
        ],
        rotation: 0,
    },
    {
        name: "J",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: 1,
                y: 1,
            },
        ],
        rotation: 0,
    },
    {
        name: "L",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 1,
            },
        ],
        rotation: 0,
    },
    {
        name: "Z",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            },
        ],
        rotation: 0,
    },
    {
        name: "S",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: -1,
            },
        ],
        rotation: 0,
    },
    {
        name: "O",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            },
        ],
        rotation: 0,
    },
    {
        name: "T",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 1,
                y: 0,
            },
        ],
        rotation: 0,
    },
    {
        name: "I",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 2,
                y: 0,
            },
        ],
        rotation: 90,
    },
    {
        name: "J",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: -1,
            },
        ],
        rotation: 90,
    },
    {
        name: "L",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            },
        ],
        rotation: 90,
    },
    {
        name: "Z",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 1,
                y: -1,
            },
        ],
        rotation: 90,
    },
    {
        name: "S",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: -1,
                y: -1,
            },
        ],
        rotation: 90,
    },
    {
        name: "O",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 1,
                y: -1,
            },
        ],
        rotation: 90,
    },
    {
        name: "T",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
        ],
        rotation: 90,
    },
    {
        name: "I",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: -2,
            },
        ],
        rotation: 180,
    },
    {
        name: "J",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: -1,
                y: -1,
            },
        ],
        rotation: 180,
    },
    {
        name: "L",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 1,
                y: -1,
            },
        ],
        rotation: 180,
    },
    {
        name: "Z",
        cells: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -1,
                y: -1,
            },
        ],
        rotation: 180,
    },
    {
        name: "S",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -1,
                y: 1,
            },
        ],
        rotation: 180,
    },
    {
        name: "O",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -1,
                y: -1,
            },
        ],
        rotation: 180,
    },
    {
        name: "T",
        cells: [
            {
                x: 0,
                y: -1,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 0,
            },
        ],
        rotation: 180,
    },
    {
        name: "I",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -2,
                y: 0,
            },
        ],
        rotation: 270,
    },
    {
        name: "J",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -1,
                y: 1,
            },
        ],
        rotation: 270,
    },
    {
        name: "L",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: -1,
                y: -1,
            },
        ],
        rotation: 270,
    },
    {
        name: "Z",
        cells: [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 1,
            },
        ],
        rotation: 270,
    },
    {
        name: "S",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: 1,
                y: 1,
            },
        ],
        rotation: 270,
    },
    {
        name: "O",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 1,
            },
        ],
        rotation: 270,
    },
    {
        name: "T",
        cells: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
        ],
        rotation: 270,
    },
];
