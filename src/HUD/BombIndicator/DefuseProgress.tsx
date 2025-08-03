import './DefuseProgress.css'
import {MAX_TIMER} from "./../Timers/Countdown";



export default function DefuseProgress(props){

    let showIt = (props.state === "defusing");




    return(
        <div className={`defuse-progress-container ${showIt ? 'live': 'dead'}`} >
            <div className={"defuse-progress-bar"} style={{ width: `${(props.defuseTime * 100 / (props.player?.state.defusekit ? MAX_TIMER.defuse_kit : MAX_TIMER.defuse_nokit ))}%` }}/>
        </div>
    )
}



