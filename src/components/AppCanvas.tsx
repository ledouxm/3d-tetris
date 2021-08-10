import { Move } from "@/utils";
import { Button, Stack } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import bestGame from "../sampleGame.json";
import { Background } from "./Backgroud";
import { TetrisBounds } from "./Bounds";
import { Tetris, tetrisMachineAtom } from "./Tetris";

export const movesAtom = atom<Move[]>([]);

// const getBestGame = async () => (await api.get("/game/best")).data;
export const AppCanvas = () => {
    const [_, updateMoves] = useAtom(movesAtom);

    const [currentState, send] = useAtom(tetrisMachineAtom);
    // NO useFrame IN CANVAS COMPONENT (?)

    // useQuery("bestGame", getBestGame, {
    //     onSuccess: (data) => updateMoves(data.moves.map((move) => ({ ...move, key: nanoid(12) }))),
    //     refetchOnWindowFocus: false,
    // });
    useEffect(() => {
        updateMoves(bestGame.map((move) => ({ ...move, key: nanoid(12) })));
    }, []);

    return (
        <>
            <Stack pos="absolute" zIndex="1">
                <Button
                    colorScheme="black"
                    onClick={() => {
                        send({ type: "NEW_PIECE" });
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
                <ambientLight intensity={0.7} />
                {/* <pointLight intensity={0.2} /> */}
                <TetrisBounds />
                <Tetris />
                <Background />
            </Canvas>
        </>
    );
};
