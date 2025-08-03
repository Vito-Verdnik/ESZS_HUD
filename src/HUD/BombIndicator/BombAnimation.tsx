import videoSource from '../../assets/videos/PLLLLLLLLLLLLLLLLLEASE.webm';
import { useRef } from 'react';

import './BombAnimation.css';
import { useBombTimer } from "./../Timers/Countdown";


export default function BombAnimation() {
    const videoRef = useRef<HTMLVideoElement>(null);

    let playIt = true;
    let bombData = useBombTimer();


    let showIt = (bombData.state === 'planting' || (bombData.state === "planted" && bombData.bombTime > 38));
    let failedPlant = (bombData.state !== "planted" && bombData.state !== "planting" && bombData.state !== "defused" && bombData.state !== "defusing");

    if(showIt){
        playIt = true;

    }

    if(bombData.state == "planting" && bombData.plantTime < 3 && bombData.plantTime > 2.9){
        videoRef.current?.play();
    }

/*&& (bombData.state !== "planting") && (bombData.state !== "planted") && videoRef.current && videoRef.current.currentTime != 0)*/
    if(bombData.plantTime > 2.95 && bombData.plantTime < 3 && videoRef.current && videoRef.current.currentTime !=0){
        resetIt();
        playIt = false;
        console.log('reset');

    }
    function resetIt(){
        if (videoRef.current && videoRef.current.currentTime !=0) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

    }

    return (
        <div className={`video-container ${showIt ? 'live': 'dead'} ${failedPlant ? 'failed': 'dead'}` } >
            <video 
                src={videoSource}
                ref={videoRef}

                preload="auto"
                muted
                onError={(e) => console.error('Video loading error:', e)}
                autoPlay={playIt}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}