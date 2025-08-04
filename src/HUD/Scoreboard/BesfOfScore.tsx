import './Scoreboard.css'
import * as I from "csgogsi";
import { Match } from "../../API/types";

interface Props {
    map: I.Map;
    match: Match | null;
    side: string;
}

export default function BesfOfScore({map, match, side}: Props) {
    const amountOfMaps = (match && Math.floor(Number(match.matchType.substr(-1)) / 2) + 1) || 0;
    const bo = (match && Number(match.matchType.substr(-1))) || 0;
    
    let team = null;
    if(side === 'ct'){
        team = map.team_ct;
    } else if (side === 't'){
        team = map.team_t;
    }
    
    const wins = team?.matches_won_this_series || 0;
    const isRight = team?.orientation === 'right';



    const mapIndicators = Array(amountOfMaps).fill(0).map((_, index) => {
        const isWin = index < wins;

        const className = `best-of-score-shape${isWin ? ` ${side.toLowerCase()}` : ''}`;
        return <div key={index} className={className} />;
    });
    if (isRight) {
        mapIndicators.reverse();
    }


    return (
        <div className='best-of-score-div'>
            {mapIndicators}
        </div>
    );
}