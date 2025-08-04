import { useState } from "react";
import TeamBox from "./../Players/TeamBox";
import Veto2 from "./../Veto/Veto2";
import Sponsor from "./../Sponsor/Sponsor";
import Killfeed from "../Killfeed/Killfeed";
import { CSGO } from "csgogsi";
import { Match } from "../../API/types";
import { useAction } from "../../API/contexts/actions";
import Featured from "../Featured/Featured.tsx";
import Scoreboard from "../Scoreboard/Scoreboard.tsx";
import TeamUtil from "../TeamUtil/TeamUtil";


interface Props {
  game: CSGO,
  match: Match | null
}

const Layout = ({game, match}: Props) => {

  
  const [ forceHide, setForceHide ] = useState(false);

  useAction('boxesState', (state) => {
    console.log("UPDATE STATE UMC", state);
    if (state === "show") {
       setForceHide(false);
    } else if (state === "hide") {
      setForceHide(true);
    }
  });

  const left = game.map.team_ct.orientation === "left" ? game.map.team_ct : game.map.team_t;
  const right = game.map.team_ct.orientation === "left" ? game.map.team_t : game.map.team_ct;
    const alivePlayersCT = game.players.filter(player => !(player.state.health === 0) && (player.team.side === "CT")).length > 0;
    const alivePlayersT = game.players.filter(player => !(player.state.health === 0) && (player.team.side === "T")).length > 0;

  const leftPlayers = game.players.filter(player => player.team.side === left.side);
  const rightPlayers = game.players.filter(player => player.team.side === right.side);
  const isFreezetime = (game.round && game.round.phase === "freezetime") || game.phase_countdowns.phase === "freezetime";
    const isTeamUtil = (game.round && game.round.phase === "freezetime") || game.phase_countdowns.phase === "freezetime" || game.round?.bomb === "planted" && alivePlayersT && alivePlayersCT;
  return (
    <div className="layout">

      <Killfeed />

        <Scoreboard match={match} map={game.map} phase={game.phase_countdowns} bomb={game.bomb} />
        <Veto2 match={match} map={game.map} game={game} />
        <Featured player={game.player}/>
        <Sponsor />

      <TeamBox team={left} players={leftPlayers} side="left" current={game.player} />
      <TeamBox team={right} players={rightPlayers} side="right" current={game.player} />
        <TeamUtil position={"left"} show={isTeamUtil && !forceHide} side={left.side} players={game.players} />  {/*TODO: MAKE IT SO THE SHOWBOXES BUTTONS HAS A BUTTON CALLED AUTOMATED BEHAVIOUR*/}
        <TeamUtil position={"right"} show={isTeamUtil && !forceHide} side={right.side} players={game.players} />

    </div>
  );
}
export default Layout;