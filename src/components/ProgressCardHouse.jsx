import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AnimatedProgressProvider from './AnimatedProgressProvider';
import { easeQuadInOut } from "d3-ease";
import ChangingProgressProvider from "./ChangingProgressProvider";
const ProgressCardHouse = () => {

    const percentage = 65;
    return (
        <div className="max-container gap-2" style={{ width: 100, height: 150 }}>
            <CircularProgressbar
                value={percentage}
                text={`144 M`}
                styles={buildStyles({
                    // This is in units relative to the 100x100px
                    // SVG viewbox.
                    textColor: "white",
                    pathColor: "#00309e",
                    textSize: "16px"
                })}
            />
            <p className="text-center font-bold m-2 text-white">Cables Laid</p>
        </div>
        
    )
}

export default ProgressCardHouse