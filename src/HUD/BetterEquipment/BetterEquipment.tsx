import './BetterEquipment.css'
import Weapon from "./../Weapon/Weapon";
import React from "react";


export default function BetterEquipment(props) {
    const showSecondary = props.secondaryAsPrimary === undefined ? true : !props.secondaryAsPrimary;
    const isDefaultPistol = ['glock', 'usp_silencer', 'hkp2000'].includes(props.secondary?.name);
    const shouldShowWeapon = showSecondary && props.secondary && !isDefaultPistol;



    return (
        <div className="better-equipment">

            {shouldShowWeapon && <Weapon  className={`better-equipment-secondary`}   weapon={props.secondary.name} active={props.secondary.state === "active"} />}

            {props.grenades.map(grenade => (
                [
                    <Weapon className = 'better-equipment-grenade' key={`${grenade.name}-${grenade.state}`} weapon={grenade.name} active={grenade.state === "active"} isGrenade />,
                    grenade.ammo_reserve === 2 ? <Weapon className = 'better-equipment-grenade' key={`${grenade.name}-${grenade.state}-double`} weapon={grenade.name} active={false} isGrenade /> : null,
                ]
            ))}
            {}

        </div>
    );
}




/*
            <div className="grenades">
              {grenades.map(grenade => (
                [
                  <Weapon key={`${grenade.name}-${grenade.state}`} weapon={grenade.name} active={grenade.state === "active"} isGrenade />,
                  grenade.ammo_reserve === 2 ? <Weapon key={`${grenade.name}-${grenade.state}-double`} weapon={grenade.name} active={false} isGrenade /> : null,
                ]
              ))}
            </div>
            <div className="secondary_weapon">{primary && secondary ? <Weapon weapon={secondary.name} active={secondary.state === "active"} /> : ""}</div>
 */