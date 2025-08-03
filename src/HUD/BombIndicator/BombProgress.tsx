import { useState, useEffect } from 'react';
import './BombProgress.css'
import { MAX_TIMER } from "./../Timers/Countdown";
import { onGSI } from "../../API/contexts/actions";

export default function BombProgress(props) {
    const [showIt, setShowIt] = useState(false);

    useEffect(() => {
        if (props.state === "planted" || props.state === "defusing") {
            setShowIt(true);
        }
    }, [props.state]);

    onGSI("roundEnd", () => {
        setShowIt(false);
    });

    return (
        <div className={`bomb-progress-container ${showIt ? 'live': 'dead'}`} >
            <div className={"bomb-progress-bar"} style={{ width: `${props.bombTime*100/MAX_TIMER.bomb}%` }}/>
            <span className={"bomb-progress-text"}> {props.bombTime.toFixed(2).padStart(5, '0')}</span>
        </div>
    );
}