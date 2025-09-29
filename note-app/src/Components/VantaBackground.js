import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";

export default function VantaBackground() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                BIRDS({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    backgroundColor: 0x061700,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            style={{
                width: "100%",
                height: "100vh",
                position: "fixed",  // <-- fixed, stays behind
                top: 0,
                left: 0,
                zIndex: -1,         // stays below all content
            }}
        />
    );
}
