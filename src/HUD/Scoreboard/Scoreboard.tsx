import React from 'react';
import './Scoreboard.css'
/*import SF_LOGO from '../../../../../BASIC HUD/basic-hud/src/assets/images/SF_Logo.png'
import TS_LOGO from '../../../../../BASIC HUD/basic-hud/src/assets/images/TS_Logo.png'
import SDP_LOGO from '../../../../../BASIC HUD/basic-hud/src/assets/images/SDP_LOGO.png'*/
import BesfOfScore from "./BesfOfScore.tsx";
import { Match } from './../../API/types';
import * as I from "csgogsi";
import * as B from './../../API/types';
import {LogoCT, LogoT} from "../../assets/Icons.tsx";
import TeamLogo2 from "./TeamLogo2.tsx";
import api, { apiUrl } from './../../API';
import { useAction } from '../../API/contexts/actions';
import { useEffect, useState } from 'react';
import SDP_LOGO from '../../assets/SDP24-25.png'

function stringToClock(time: string | number, pad = true) {
    if (typeof time === "string") {
        time = parseFloat(time);
    }
    const countdown = Math.abs(Math.ceil(time));
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown - minutes * 60;
    if (pad && seconds < 10) {
        return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

interface IProps {
    match: Match | null;
    map: I.Map;
    phase: I.CSGO["phase_countdowns"],
    bomb: I.Bomb | null,
}

const getRoundLabel = (mapRound: number) => {
    const round = mapRound + 1;
    if (round <= 24) {
        return `Round ${round}/24`;
    }
    const additionalRounds = round - 24;
    const OT = Math.ceil(additionalRounds/6);
    return `OT ${OT} (${additionalRounds - (OT - 1)*6}/6)`;
}


export default function Scoreboard(props: IProps) {


    const [ teams, setTeams ] = useState<B.Team[]>([]);





    let isTournamentLogo = false;
    let tournamentName = '';
    const [ tournament, setTournament ] = useState<B.Tournament | null>(null);
    useEffect(() => {
        api.tournaments.get().then(({ tournament }) => {
            if(tournament){
                setTournament(tournament);

                Promise.allSettled([api.teams.get()]).then(([teams]) =>{
                    setTeams(teams.status === "fulfilled" ? teams.value : []);
                });

            }
        })
    }, []);

    if(tournament){
        if(tournament.logo){
            isTournamentLogo = true;

        }
        tournamentName = tournament.name;
    }




    const{bomb, match, map, phase} = props;
    const left = map.team_ct.orientation === "left" ? map.team_ct : map.team_t;
    const right = map.team_ct.orientation === "left" ? map.team_t : map.team_ct;
    let scoreLeft = left.score;
    let scoreRight =right.score;
    let boLeft = left.matches_won_this_series;
    let boRight = right.matches_won_this_series;
    let time = phase?.phase_ends_in ? stringToClock(phase.phase_ends_in) : "0:00";
    let round = getRoundLabel(map.round);
    let stage = 'GRAND FINALE'
    let nameLeft = left.name;
    let nameRight = right.name;
    let sideLeft = left.side.toLowerCase();
    let shortLeft = teams.find(team => team._id === left.id)?.shortName || left.name;
    let shortRight = teams.find(team => team._id === right.id)?.shortName || right.name;

    let sideRight = right.side.toLowerCase();
    const bo = (match && Number(match.matchType.substr(-1))) || 0;



    return (
        <div className='scoreboard-div'>
            <div className='scoreboard-div-main'>

                    <span className='scoreboard-name-left'>{shortLeft}</span>
                    <span className='scoreboard-name-right'>{shortRight}</span>


                    {/*<img src={SF_LOGO} className='scoreboard-logo-left'/>
                    <img src={TS_LOGO} className='scoreboard-logo-right'/>*/}
                    <TeamLogo2 team={left} side={"left"} />
                    <TeamLogo2 team={right} side={"right"} />



                    <div className='scoreboard-bo-left'>
                        <BesfOfScore side={sideLeft} map={map} match={match}/>
                    </div>

                    <div className='scoreboard-bo-right'>
                        <BesfOfScore side={sideRight} map={map} match={match}/>
                    </div>



                    <span className='scoreboard-score-left'>{scoreLeft}</span>
                    <span className='scoreboard-score-right'>{scoreRight}</span>





                <span className='scoreboard-time'>{time}</span>
                <span className='scoreboard-round'>{round}</span>


            </div>
            {/*TODO: WAIT FOR LHM TO FIX THEIR STUFF {isTournamentLogo && tournament.logo && <img className='tournament-logo' src={`data:image/jpeg;base64,${tournament.logo}`} alt={tournament.name} />}*/}
            <img className='tournament-logo' src={SDP_LOGO} />

            <div className='scoreboard-stage-div'>
                <span className='scoreboard-stage-text'>{stage}</span>
            </div>
            <div className={`scoreboard-side left ${sideLeft}`}> </div>
            <div className={`scoreboard-side right ${sideRight}`}> </div>


        </div>
    )
}