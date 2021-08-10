import { api } from "@/api";
import { Move } from "@/utils";
import { Button } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import { Background } from "./Backgroud";
import { TetrisBounds } from "./Bounds";
import { moveCptAtom, Tetris } from "./Tetris";

export const movesAtom = atom<Move[]>([]);

const getBestGame = async () => (await api.get("/game/best")).data;
export const AppCanvas = () => {
    const [moves, updateMoves] = useAtom(movesAtom);
    const [current, updateCurrent] = useAtom(moveCptAtom);

    // NO useFrame IN CANVAS COMPONENT (?)

    useQuery("bestGame", getBestGame, {
        onSuccess: (data) => updateMoves(data.moves.map((move) => ({ ...move, key: nanoid(12) }))),
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Button
                pos="absolute"
                zIndex="1"
                colorScheme="blue"
                onClick={() => {
                    if (current < moves.length - 1) updateCurrent((current) => current + 1);
                }}
            >
                Next piece
            </Button>
            <Canvas camera={{ fov: 40, position: [0, 0, 0] }}>
                <ambientLight intensity={0.3} />
                <pointLight intensity={0.5} />
                <TetrisBounds />
                <Tetris />
                <Background />
            </Canvas>
        </>
    );
};
