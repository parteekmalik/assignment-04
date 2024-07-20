import "./BackgroudComponent.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ParticleAnimation from "./Canvas";
const BackgroudComponent = ({ children }) => {
    const canvasRef = useRef(null);
    let [blurAmount, setblurAmount] = useState(0);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const [height, width] = [canvasRef.current?.offsetHeight, canvasRef.current?.offsetWidth];
            const maxHeight = Math.max(height, width);
            const options = {
                quantity: canvas.dataset.particleQuantity,
                staticity: canvas.dataset.particleStaticity,
                ease: canvas.dataset.particleEase,
                ParticleSize: [maxHeight / 10, maxHeight / 8],
            };
            console.log(options);
            const x = new ParticleAnimation(canvas, options);

            setblurAmount(Math.floor(Math.max(height, width) / 10));
        }
    }, [canvasRef]);
    return (
        <>
            {children}
            <div className="cointainer-blobs">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <canvas
                    style={{
                        filter: `url(#goo) blur(${blurAmount}px)`,
                        WebkitFilter: `url(#goo) blur(${blurAmount}px)`,
                    }}
                    ref={canvasRef}
                    data-particle-animation
                    data-particle-quantity={`10`}
                    data-particle-staticity="4"
                    data-particle-ease="60"
                ></canvas>
            </div>
        </>
    );
};
export default BackgroudComponent;
