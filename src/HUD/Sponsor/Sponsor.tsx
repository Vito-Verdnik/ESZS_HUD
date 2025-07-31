import './Sponsor.css'
import { onexbetlogo as Bet_LOGO } from "../../assets/SponsorLogos/SponsorLogos";


export default function Sponsor() {
    return (
        <div className='sponsor-div'>
            <img src={Bet_LOGO} alt="nah" className="sponsor-image"/>
        </div>
    )
}