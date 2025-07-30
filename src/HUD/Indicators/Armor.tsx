import React from "react";
import { ArmorFull, ArmorHelmet } from "./../../assets/Icons";

const Armor = ({ health, armor, helmet, className }: { health: number, armor: number, helmet: boolean, className: string }) => {
  if (!health || !armor) return null;
  return (
    <div className={`${className}`}>
      {helmet ? <ArmorHelmet /> : <ArmorFull />}
    </div>
  );
};

export default React.memo(Armor);
