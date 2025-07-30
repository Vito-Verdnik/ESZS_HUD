import './Player2.css'
//import {Awp, Ak47, Deagle} from '../assets/Weapons.tsx'
//import {HealthIcon, DeathIcon, CrosshairIcon, PlayerNumberIcon, ObservedIcon} from '../assets/Stats.tsx'
//import {Armor} from '../assets/Equipment.tsx'
import FeaturedKIR from "./../FeaturedKIR/FeaturedKIR.tsx"
//import BetterEquipment from "./BetterEquipment.tsx"
import * as I from "csgogsi";
import Weapon from "./../Weapon/Weapon";
import Armor from "./../Indicators/Armor";
import {
    HealthIcon,
    DeathIcon,
    CrosshairIcon,
    PlayerNumberIcon,
    ObservedIcon,
    DefuserIcon,
    BombIcon
} from "./../../assets/Icons.tsx";
import Bomb from "./../Indicators/Bomb";
import Defuse from "./../Indicators/Defuse";
import React from "react";
import BetterEquipment from "../BetterEquipment/BetterEquipment.tsx";

interface IProps {
    player: I.Player,
    isObserved: boolean,
}

const compareWeapon = (weaponOne: I.WeaponRaw, weaponTwo: I.WeaponRaw) => {
    if (weaponOne.name === weaponTwo.name &&
        weaponOne.paintkit === weaponTwo.paintkit &&
        weaponOne.type === weaponTwo.type &&
        weaponOne.ammo_clip === weaponTwo.ammo_clip &&
        weaponOne.ammo_clip_max === weaponTwo.ammo_clip_max &&
        weaponOne.ammo_reserve === weaponTwo.ammo_reserve &&
        weaponOne.state === weaponTwo.state
    ) return true;

    return false;
}

const compareWeapons = (weaponsObjectOne: I.Weapon[], weaponsObjectTwo: I.Weapon[]) => {
    const weaponsOne = [...weaponsObjectOne].sort((a, b) => a.name.localeCompare(b.name))
    const weaponsTwo = [...weaponsObjectTwo].sort((a, b) => a.name.localeCompare(b.name))

    if (weaponsOne.length !== weaponsTwo.length) return false;

    return weaponsOne.every((weapon, i) => compareWeapon(weapon, weaponsTwo[i]));
}

const arePlayersEqual = (playerOne: I.Player, playerTwo: I.Player) => {
    if (playerOne.name === playerTwo.name &&
        playerOne.steamid === playerTwo.steamid &&
        playerOne.observer_slot === playerTwo.observer_slot &&
        playerOne.defaultName === playerTwo.defaultName &&
        playerOne.clan === playerTwo.clan &&
        playerOne.stats.kills === playerTwo.stats.kills &&
        playerOne.stats.assists === playerTwo.stats.assists &&
        playerOne.stats.deaths === playerTwo.stats.deaths &&
        playerOne.stats.mvps === playerTwo.stats.mvps &&
        playerOne.stats.score === playerTwo.stats.score &&
        playerOne.state.health === playerTwo.state.health &&
        playerOne.state.armor === playerTwo.state.armor &&
        playerOne.state.helmet === playerTwo.state.helmet &&
        playerOne.state.defusekit === playerTwo.state.defusekit &&
        playerOne.state.flashed === playerTwo.state.flashed &&
        playerOne.state.smoked === playerTwo.state.smoked &&
        playerOne.state.burning === playerTwo.state.burning &&
        playerOne.state.money === playerTwo.state.money &&
        playerOne.state.round_killhs === playerTwo.state.round_killhs &&
        playerOne.state.round_kills === playerTwo.state.round_kills &&
        playerOne.state.round_totaldmg === playerTwo.state.round_totaldmg &&
        playerOne.state.equip_value === playerTwo.state.equip_value &&
        playerOne.state.adr === playerTwo.state.adr &&
        playerOne.avatar === playerTwo.avatar &&
        !!playerOne.team.id === !!playerTwo.team.id &&
        playerOne.team.side === playerTwo.team.side &&
        playerOne.country === playerTwo.country &&
        playerOne.realName === playerTwo.realName &&
        compareWeapons(playerOne.weapons, playerTwo.weapons)
    ) return true;

    return false;
}

const Player2 = ({ player, isObserved }: IProps) => {
   
    let hasDefuser = player.state.defusekit === true;

    let alive:boolean = !(player.state.health === 0);
    let observed:boolean = isObserved;

    let side = player.team.side.toLowerCase();
    let position:string = (player.team.orientation === "left") ? 'l' : 'r';
    let killsInRound = player.state.round_kills;
    let hp = player.state.health;
    let kills = player.stats.kills;
    let deaths = player.stats.deaths;
    let name = player.name;
    let money = player.state.money;
    let playerNumber = player.observer_slot;
    let dmg = player.state.round_totaldmg;
    let secondaryAsPrimary = false;

    const weapons = player.weapons.map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
    const primary = weapons.filter(weapon => !['C4', 'Pistol', 'Knife', 'Grenade', undefined].includes(weapon.type))[0] || null;
    const secondary = weapons.filter(weapon => weapon.type === "Pistol")[0] || null;
    const grenades = weapons.filter(weapon => weapon.type === "Grenade");
 
    
    
    let hasBomb = Object.values(weapons).some(weapon => weapon.type === "C4");
    
    
    
    if(primary === null) {
        secondaryAsPrimary = true;
    }


    return (
        <div className={`player-div`}>
            <div className={`player-main-div ${position} ${side} ${!alive ? 'dead' : ''} ${observed ? 'observed-player' : ''}`}>
                <div className={`player-top-div ${position} ${side} ${!alive ? 'dead' : ''}`}>
                    <span className={`player-top-name ${position}  ${side} ${!alive ? 'dead' : ''}`}>{name}</span>
                    {/*{alive && (<Ak47 className={`player-top-primary ${position} ${side}`}/>)}  DONE */}
                    {(alive && primary) && <Weapon  className={`player-top-primary ${position} ${side}`}   weapon={primary.name} active={primary.state === "active"} />}
                    {(alive && secondaryAsPrimary) && <Weapon  className={`player-top-primary ${position} ${side}`}   weapon={secondary.name} active={secondary.state === "active"} />}
                    {(!alive && !primary && !secondary) && <div className={`player-top-primary ${position} ${side}`}/>}

                </div>

                <div className={`player-middle-div ${position} ${side}`}>
                    {/*{alive && (<Armor className={`player-middle-armor-icon ${position} ${side}`}/>)}   DONE */}
                    {alive && <Armor className={`player-middle-armor-icon ${position} ${side}`} health={player.state.health} armor={player.state.armor} helmet={player.state.helmet} />}
                    <div className={`player-middle-kills ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        <CrosshairIcon className={`player-middle-kills-icon ${position} ${side} ${!alive ? 'dead' : ''}`}/>
                        <span className={`player-middle-kills-count ${position} ${side} ${!alive ? 'dead' : ''}`}>{kills}</span>
                    </div>
                    <div className={`player-middle-deaths ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        <DeathIcon className={`player-middle-deaths-icon ${position} ${side} ${!alive ? 'dead' : ''}`}/>
                        <span className={`player-middle-deaths-count ${position}  ${side} ${!alive ? 'dead' : ''}`}>{deaths}</span>
                    </div>
                    <div className={`player-middle-kir-container ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        <FeaturedKIR alive={alive} count={killsInRound}/>
                    </div>

                    {alive && (<div className={`player-middle-equipment-container ${position} ${side}`}>
                        <BetterEquipment grenades={grenades} secondary={secondary} secondaryAsPrimary = {secondaryAsPrimary} />
                    </div>)}
                </div>

                <div className={`player-bottom-div ${position} ${side} ${!alive ? 'dead' : ''}`}>
                    {alive && (<div className={`player-bottom-bar ${position} ${side}`} style={{width: `${hp}%`}}/>)}
                    {alive && (<div className={`player-bottom-hp ${position} ${side}`}>
                          <HealthIcon className='player-bottom-hp-icon'/>
                        <span className={`player-bottom-hp-text ${position} ${side}`}>{hp}</span>
                    </div>)}

                    <div className={`player-bottom-money ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        <span className={`player-bottom-money-text ${position} ${side} ${!alive ? 'dead' : ''}`}>${money}</span>
                    </div>
                    {!alive && (<div className={`player-bottom-dmg-container ${position} ${side}`}>
                        <span className={'player-bottom-dmg'}>DMG:</span>
                        <span className={`player-bottom-dmg-text ${position} ${side}`}>{dmg}</span>
                    </div>)}
                </div>
            </div>

             {alive && (<PlayerNumberIcon className={`player-number-icon ${position} ${side}`}/>)}
            {alive && (<span className={`player-number-text ${position} ${side}`}>{playerNumber}</span>)}

            {observed && (<div className={`player-observed-div ${position} ${side}`}>
                 <ObservedIcon className='player-observed-icon'/>
            </div>)}

            {hasDefuser && (<div className={`player-defuser-div ${position}`}>
                <DefuserIcon className='player-defuser-icon'/>
            </div>)}

            {hasBomb && (<div className={`player-bomb-div ${position}`}>
                <BombIcon className='player-bomb-icon'/>
            </div>)}





        </div>
/*        TODO: Damaged hp bar animation, flashed indicator
          */

    )
}

const arePropsEqual = (prevProps: Readonly<IProps>, nextProps: Readonly<IProps>) => {
    if (prevProps.isObserved !== nextProps.isObserved) return false;

    return arePlayersEqual(prevProps.player, nextProps.player);
}

export default React.memo(Player2, arePropsEqual);