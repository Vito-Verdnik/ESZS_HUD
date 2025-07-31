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






/*
export default function TeamUtil(props: Props) {
let side = ['ct', 't'].includes(props.side?.toLowerCase()) ? props.side.toLowerCase() : 'ct';

    return (
        <div className={`team-util-div ${side}`}>
        <FeaturedEquipment numbers={true} fillColor='white' />
        </div>
    )
}
*/

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



/* so the logic is, outer div is team-util-div ${side} that is the rectangle and has the position on the screen. The width is also fixed.
div className featured-equipment is the div that spans the outer div and flexboxes all the inner elements
featured-equipment-incgrenade-div ...   are the divs that hold the grenade icon and number


in essence grenadeContainer is featured-equipment-incgrenade-div
grenades_container is featured-equipment


 */




/*const SideBox = ({ players, side, show }: Props) => {
    const grenades = summarise(players, side);
    const total = Object.values(grenades).reduce((a, b) => a + b, 0);
    return (
        <div className={`utilitybox ${side || ""} ${show ? "show" : "hide"}`}>
            <div className="title_container">
                <div className="title">Utility Level -&nbsp;</div>
                <div className="subtitle" style={{ color: utilityColor(total) }}>
                    {utilityState(total)}
                </div>
            </div>
            <div className="grenades_container">
                <GrenadeContainer grenade="smokegrenade" amount={grenades.smokes} />
                <GrenadeContainer
                    grenade={side === "CT" ? "incgrenade" : "molotov"}
                    amount={grenades.inc}
                />
                <GrenadeContainer grenade="flashbang" amount={grenades.flashes} />
                <GrenadeContainer grenade="hegrenade" amount={grenades.hg} />
            </div>
        </div>
    );
};*/

/*
export default function FeaturedEquipment({ numbers = false, fillColor }: FeaturedEquipmentProps) {
    // Create a style object that will be applied to SVG components
    const svgStyle = fillColor ? { fill: fillColor } : undefined;

    return (
        <div className="featured-equipment">
            <div className='featured-equipment-flashbang-div'>
                <Flashbang className='featured-equipment-flashbang' style={svgStyle} />
                {numbers && <span className='number-flashbang'>1</span>}
            </div>

            <div className='featured-equipment-incgrenade-div'>
                <IncGrenade className='featured-equipment-incgrenade' style={svgStyle} />
                {numbers && <span className='number-incgrenade'>2</span>}
            </div>

            <div className='featured-equipment-hegrenade-div'>
                <HeGrenade className='featured-equipment-hegrenade' style={svgStyle} />
                {numbers && <span className='number-hegrenade'>3</span>}
            </div>

            <div className='featured-equipment-smokegrenade-div'>
                <SmokeGrenade className='featured-equipment-smokegrenade' style={svgStyle} />
                {numbers && <span className='number-smokegrenade'>4</span>}
            </div>
        </div>
    );
}



*/