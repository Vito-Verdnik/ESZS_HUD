import FeaturedKIR from "./../FeaturedKIR/FeaturedKIR.tsx"
import BetterEquipment from "../BetterEquipment/BetterEquipment.tsx";
import './Featured.css';
import {HealthIcon, BulletIcon} from './../../assets/Icons.tsx'
import Armor from "./../Indicators/Armor";
import {Player} from "csgogsi";

export default function Featured({ player }: { player: Player | null }) {


    if (!player) return null;
    let alive:boolean = !(player.state.health === 0);

    let killsInRound = player.state.round_kills;
    let hp = player.state.health;
    let armor = player.state.armor;


    let kills=player.stats.kills;
    let deaths=player.stats.deaths;
    let adr=player.state.adr;
    let name = player.name;
    let side = player.team.side.toLowerCase();

    const weapons = player.weapons.map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
    let primary = weapons.filter(weapon => !['C4', 'Pistol', 'Knife', 'Grenade', undefined].includes(weapon.type))[0] || null;
    const secondary = weapons.filter(weapon => weapon.type === "Pistol")[0] || null;
    const grenades = weapons.filter(weapon => weapon.type === "Grenade");

    const currentWeapon = player.weapons.filter(weapon => weapon.state === "active")[0];
    let bulletsMain = currentWeapon?.ammo_clip?.toString() ?? "*";
    let bulletsReserve= currentWeapon?.ammo_reserve?.toString() ?? "*";
    return(
        <div className='featured-div'>
            <div className={`featured-div-main ${side}`}>
                <div className={`featured-main-healthbar ${side}`}>
                    <div className={`featured-main-healthbar-bar ${side}`} style={{width: `${hp}%`}}>
                    </div>
                    {[25, 50, 75].map((percent) => (
                        <div
                            key={percent}
                            className={`progress-marker ${side}`}
                            style={{ left: `${percent}%` }}
                        />
                    ))}
                </div>

                <div className='featured-main-hp-div'>
                    <HealthIcon className={`featured-main-hp-icon ${side}`}/>
                    <span className='featured-main-hp-text'>{hp}</span>
                </div>

                <div className='featured-main-armor-div'>
                    <Armor className={`featured-main-armor-icon ${side}`} health={hp} armor={armor} helmet={player.state.helmet}/>
                    <span className='featured-main-armor-text'>{armor}</span>
                </div>

                <div className='featured-main-bullets-div'>
                    <BulletIcon className='featured-main-bullets-icon'/>
                    <span className='featured-main-bullets-text'>{bulletsMain}</span>
                    <span className={`featured-main-bullets-text-slash ${side}`}>/</span>
                    <span className={`featured-main-bullets-text-reserve ${side}`}>{bulletsReserve}</span>
                </div>

                <div className='featured-main-kills-div'>
                    <span className={`featured-main-kills-text ${side}`}>K</span>
                    <span className='featured-main-kills-count'>{kills}</span>
                </div>
                <div className='featured-main-deaths-div'>
                    <span className={`featured-main-deaths-text ${side}`}>D</span>
                    <span className='featured-main-deaths-count'>{deaths}</span>
                </div>
                <div className='featured-main-adr-div'>
                    <span className={`featured-main-adr-text ${side}`}>ADR</span>
                    <span className='featured-main-adr-count'>{adr}</span>
                </div>

                <div className='featured-main-util-div'>
                    <BetterEquipment
                        secondaryAsPrimary = {true}
                        secondary = {secondary}
                        grenades = {grenades}
                        centerIt = {true}
                    />
                </div>
            </div>

            <div className='featured-div-name'>
                <span className='featured-name-text'>{name}</span>
            </div>

            {(killsInRound > 0) && <div className='featured-div-kir'>
                <FeaturedKIR alive={alive} count = {killsInRound} />
            </div>}
        </div>

    )
}

//TODO: HP bar red animation
//TODO: KIR div gets animated up