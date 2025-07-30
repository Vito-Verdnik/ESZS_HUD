import {KirIcon} from "./../../assets/Icons.tsx";
import './FeaturedKIR.css';

interface FeaturedKIRProps {
    alive?: boolean;
    count: number;
}

export default function FeaturedKIR(props: FeaturedKIRProps) {
    const alive = props.alive ?? true;
    return (
        <div className='featured-kir-div'>
            <div className='featured-kir-icon-container'>
                <KirIcon className={`featured-kir-icon${!alive ? ' dead' : ''}`} />
            </div>

            <div className='featured-kir-count-container'>
                <span className={`featured-kir-count${!alive ? ' dead' : ''}`}>{props.count}</span>
            </div>
        </div>
    )
}