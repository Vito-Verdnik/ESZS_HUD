import './Player2.css'
//import {Awp, Ak47, Deagle} from '../assets/Weapons.tsx'
//import {HealthIcon, DeathIcon, CrosshairIcon, PlayerNumberIcon, ObservedIcon} from '../assets/Stats.tsx'
//import {Armor} from '../assets/Equipment.tsx'
//import FeaturedKIR from "./FeaturedKIR.tsx"
//import BetterEquipment from "./BetterEquipment.tsx"

export default function Player2(props) {
    let position:string = ['l', 'r'].includes(props.position?.toLowerCase()) ? props.position.toLowerCase() : 'l';
    let alive:boolean = props.alive;
    let observed:boolean = props.observed;
    let side = ['ct', 't'].includes(props.side?.toLowerCase()) ? props.side.toLowerCase() : 'ct';
    let killsInRound = 5;
    let hp = 70;
    let kills = 3;
    let deaths = 3;
    let name = 'Mlady Swagalot';
    let money = '1000';
    let playerNumber = 2;
    let dmg = 421;
    let left = props.offset;
    let top = props.top;

    return (
        <div className={`player-div`} style={{
            [position === 'r' ? 'right' : 'left']: `${left}vw`, top: `${top}vw`}}>
            <div className={`player-main-div ${position} ${side} ${!alive ? 'dead' : ''} ${observed ? 'observed' : ''}`}>
                <div className={`player-top-div ${position} ${side} ${!alive ? 'dead' : ''}`}>
                    <span className={`player-top-name ${position}  ${side} ${!alive ? 'dead' : ''}`}>{name}</span>
                    {/* {alive && (<Ak47 className={`player-top-primary ${position} ${side}`}/>)}*/}

                </div>

                <div className={`player-middle-div ${position} ${side}`}>
                    {/*{alive && (<Armor className={`player-middle-armor-icon ${position} ${side}`}/>)}*/}
                    <div className={`player-middle-kills ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        {/*<CrosshairIcon className={`player-middle-kills-icon ${position} ${side} ${!alive ? 'dead' : ''}`}/>*/}
                        <span className={`player-middle-kills-count ${position} ${side} ${!alive ? 'dead' : ''}`}>{kills}</span>
                    </div>
                    <div className={`player-middle-deaths ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        {/* <DeathIcon className={`player-middle-deaths-icon ${position} ${side} ${!alive ? 'dead' : ''}`}/>*/}
                        <span className={`player-middle-deaths-count ${position}  ${side} ${!alive ? 'dead' : ''}`}>{deaths}</span>
                    </div>
                    <div className={`player-middle-kir-container ${position} ${side} ${!alive ? 'dead' : ''}`}>
                        {/* <FeaturedKIR alive={alive} count={killsInRound}/>*/}
                    </div>

                    {alive && (<div className={`player-middle-equipment-container ${position} ${side}`}>
                        {/* <BetterEquipment secondary={true}/>*/}
                    </div>)}
                </div>

                <div className={`player-bottom-div ${position} ${side} ${!alive ? 'dead' : ''}`}>
                    {alive && (<div className={`player-bottom-bar ${position} ${side}`} style={{width: `${hp}%`}}/>)}
                    {alive && (<div className={`player-bottom-hp ${position} ${side}`}>
                        {/*  <HealthIcon className='player-bottom-hp-icon'/>*/}
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

            {/* {alive && (<PlayerNumberIcon className={`player-number-icon ${position} ${side}`}/>)}*/}
            {alive && (<span className={`player-number-text ${position} ${side}`}>{playerNumber}</span>)}

            {observed && (<div className={`player-observed-div ${position} ${side}`}>
                {/* <ObservedIcon className='player-observed-icon'/>*/}
            </div>)}
        </div>
    )
}