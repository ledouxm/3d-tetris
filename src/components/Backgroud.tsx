const backgroundRotation = [0, 0, 0];
export const Background = () => {
    return (
        //@ts-ignore
        <mesh position={[1, 0, -30.5]} rotation={backgroundRotation} receiveShadow scale={200}>
            <planeBufferGeometry />
            <meshStandardMaterial attach="material" color="#f2e9e4" />
        </mesh>
    );
};
