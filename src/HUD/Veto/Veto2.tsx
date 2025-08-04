import './Veto.css';
import {Match, Veto} from "../../API/types.ts";
import {CSGO, Map, Team} from "csgogsi";
import * as LOGO from "../../assets/MapLogos/MapLogos"

interface Props { match: Match | null, map: Map, game: CSGO }




export default function Veto2({ match, map }: Props) {



    let noPicks = false;
    if (!match || !match.vetos.length) noPicks = true;
    if(match){
        const picks = match.vetos.filter(veto => veto.type !== "ban" && veto.mapName);
        if(picks.length>3){
            return '';
        }
    }
    let leftTeamID = match.left.id;
    let rightTeamID = match.right.id;

    let matches = (match.vetos.filter(veto => veto.type !== "ban").filter(veto => veto.teamId || veto.type === "decider"));
    const indexDone: number[] = [];
    const indexNotDone: number[] = [];

matches.forEach((match, index) => {
    if (match && typeof match.winner !== 'undefined') {
        indexDone.push(index);
    } else if(match && typeof match.winner === 'undefined'){
        indexNotDone.push(index);
    }
});
    



    return (
        <div className="veto-main-div">
            {match.vetos.filter(veto => veto.type !== "ban").filter(veto => veto.teamId || veto.type === "decider").map((veto, index) =>


                <VetoMapEnty leftTeamID= {leftTeamID} rightTeamID={rightTeamID} key={veto.mapName} veto={veto}  team={veto.type === "decider" ? null : map.team_ct.id === veto.teamId ? map.team_ct : map.team_t} ownIndex={index}
                             indexDone={indexDone} indexNotDone={indexNotDone}
                />)}




        </div>
    );
}


const VetoMapEnty = ({leftTeamID, rightTeamID, veto, team, ownIndex, indexDone, indexNotDone}: {
    indexNotDone: number[],
    ownIndex: number,
    indexDone: number[],
    leftTeamID: string | null,
    rightTeamID: string | null,
    veto: Veto,
    team: Team | null
}) => {
    if (!leftTeamID || !rightTeamID) return '';

    const mapName = veto.mapName?.replace(/.*\//g, '');
    const logoKey = mapName ? `${mapName}_LOGO` as keyof typeof LOGO : null;
    const mapLogo = logoKey ? LOGO[logoKey] : null;

    // Determine the map status
    let status = '';
    if (indexDone.includes(ownIndex)) {
        status = 'DONE';
    } else if (indexNotDone.includes(ownIndex)) {
        // Sort indexNotDone to find the first and second indexes
        const sortedNotDone = [...indexNotDone].sort((a, b) => a - b);
        if (ownIndex === sortedNotDone[0]) {
            status = 'Now';
        } else if (ownIndex === sortedNotDone[1]) {
            status = 'Next';
        } else {
            status = '';
        }
    }

    return (
        <div className="veto-div">
            {veto.type !== "decider" && (<>
                <img src={mapLogo} alt={mapName || 'map'} className="veto-image"/>
                <div className="veto-text">
                    <span className="veto-picked-by">
                        Picked by:
                    </span>
                    <span className="veto-team">
                        {team?.name}
                    </span>
                    {status === 'DONE' ? (
                        <div className="veto-score">
                            <span className="veto-score-left">
                                {veto.score?.[leftTeamID]}
                            </span>
                            <span className="veto-score-center">
                                :
                            </span>
                            <span className="veto-score-right">
                                {veto.score?.[rightTeamID]}
                            </span>
                        </div>
                    ) : (
                        <div className="veto-score">
                            <span className="veto-score-left">
                            </span>
                            <span className="veto-score-center" style={{color: status === 'Now' ? 'white' : undefined}}>
                                {status}
                            </span>
                            <span className="veto-score-right">
                            </span>
                        </div>
                    )}
                </div>
            </>)}

            {veto.type === "decider" && (<>
                <img src={mapLogo} alt={mapName || 'map'} className="veto-image"/>
                <div
                    className={"veto-text-decider" + (status !== 'DONE' && status !== 'Now' && status !== 'Next' ? ' nothin' : '')}>
                    <span className={"veto-picked-by-decider" + (status !== 'DONE' && status !== 'Now' && status !== 'Next' ? ' nothin' : '')}>
                        Decider
                    </span>
                    <span className="veto-team">
                    </span>
                    { (status=='Now' || status=='Next') &&                     <div className="veto-score">
                        <span className="veto-score-left">
                        </span>
                        <span className="veto-score-center decider" style={{color: status === 'Now' ? 'white' : undefined}}>
                            {status}
                        </span>
                        <span className="veto-score-right">
                        </span>
                    </div>}

                </div>
            </>)}
        </div>
    );
}