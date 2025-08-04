import './TeamUtil.css';
import Weapon from "./../Weapon/Weapon";
import { Player, Side, WeaponRaw } from "csgogsi";

interface Props {
    sides?: "reversed";
    show: boolean;
    position: "left" | "right";
    side: "CT" | "T";
    players: Player[];
}





function sum(grenades: WeaponRaw[], name: string) {
    return (
        grenades.filter((grenade) => grenade.name === name).reduce(
            (prev, next) => ({
                ...next,
                ammo_reserve: (prev.ammo_reserve || 0) + (next.ammo_reserve || 0),
            }),
            { name: "", ammo_reserve: 0 },
        )
            .ammo_reserve || 0
    );
}

function parseGrenades(players: Player[], side: Side) {
    const grenades = players
        .filter((player) => player.team.side === side)
        .map((player) =>
            Object.values(player.weapons).filter((weapon) =>
                weapon.type === "Grenade"
            )
        )
        .flat()
        .map((grenade) => ({
            ...grenade,
            name: grenade.name.replace("weapon_", ""),
        }));
    return grenades;
}

export function summarise(players: Player[], side: Side) {
    const grenades = parseGrenades(players, side);
    return {
        hg: sum(grenades, "hegrenade"),
        flashes: sum(grenades, "flashbang"),
        smokes: sum(grenades, "smokegrenade"),
        inc: sum(grenades, "incgrenade") + sum(grenades, "molotov"),
    };
}

const GrenadeContainer = (
    { grenade, amount}: { grenade: string; amount: number},
) => {

    return (
        <div className={`featured-equipment-${grenade}-div`}>
            <div className={`featured-equipment-${grenade}`}>
                <Weapon className={`featured-equipment-${grenade}`} weapon={grenade} active={false} isGrenade />
            </div>
            <div className={`number-${grenade}`}>{amount}</div>
        </div>
    );
};







export default function TeamUtil({players, side, show, position}: Props) {
    const grenades = summarise(players, side);
    const alivePlayers = players.filter(player => !(player.state.health === 0) && (player.team.side === side)).length;

    return (
    <div className={`team-util-div ${position} ${show ? "show" : "hide"}`}>
        <div className="featured-equipment">
            {grenades.smokes > 0 && <GrenadeContainer grenade="smokegrenade" amount={grenades.smokes} />}
            {grenades.inc > 0 && <GrenadeContainer
                grenade={side === "CT" ? "incgrenade" : "molotov"}
                amount={grenades.inc}
            />}
                {grenades.flashes > 0 && <GrenadeContainer grenade="flashbang" amount={grenades.flashes} />}
                        {grenades.hg > 0 && <GrenadeContainer grenade="hegrenade" amount={grenades.hg} />}




        </div>
    </div>
    );
}



