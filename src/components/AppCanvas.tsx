import { api } from "@/api";
import { Move } from "@/utils";
import { Button, Stack } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import { Background } from "./Backgroud";
import { TetrisBounds } from "./Bounds";
import { moveCptAtom, Tetris, tetrisMachineAtom } from "./Tetris";

export const movesAtom = atom<Move[]>([]);

const getBestGame = async () => (await api.get("/game/best")).data;
export const AppCanvas = () => {
    const [moves, updateMoves] = useAtom(movesAtom);
    const [currentCpt, updateCurrentCpt] = useAtom(moveCptAtom);

    const [currentState, send] = useAtom(tetrisMachineAtom);
    // NO useFrame IN CANVAS COMPONENT (?)

    useQuery("bestGame", getBestGame, {
        onSuccess: (data) => updateMoves(data.moves.map((move) => ({ ...move, key: nanoid(12) }))),
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Stack pos="absolute" zIndex="1">
                <Button
                    colorScheme="black"
                    onClick={() => {
                        if (currentCpt < moves.length - 1)
                            updateCurrentCpt((current) => current + 1);
                    }}
                >
                    Next piece
                </Button>

                <Button
                    colorScheme="black"
                    onClick={() => {
                        send({ type: "TOGGLE_AUTOPLAY" });
                    }}
                >
                    Turn {currentState.context?.autoPlay ? "off" : "on"} autoplay
                </Button>
            </Stack>

            <Canvas camera={{ fov: 40, position: [0, 0, 0] }}>
                <ambientLight intensity={0.3} />
                <pointLight intensity={0.2} />
                <TetrisBounds />
                <Tetris />
                <Background />
            </Canvas>
        </>
    );
};
