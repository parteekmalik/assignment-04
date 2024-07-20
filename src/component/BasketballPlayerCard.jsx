import React from "react";
import "./BasketballPlayerCard.css";
import BorderSpin from "./borderSpin/borderSpin";
import BackgroudComponent from ".//BackgroudComponent/BackgroudComponent";

const BasketballPlayerCard = ({ name, image, position, stats }) => {
    return (
        <BorderSpin>
            <BackgroudComponent>
                <div className="player-card">
                    <img src={image} alt={`${name}`} className="player-image" />
                    <p className="player-name">{name}</p>
                    <p className="player-position">{position}</p>
                    <div className="player-stats">
                        <p>Points per Game: {stats.pointsPerGame}</p>
                        <p>Assists per Game: {stats.assistsPerGame}</p>
                        <p>Rebounds per Game: {stats.reboundsPerGame}</p>
                    </div>
                </div>
            </BackgroudComponent>
        </BorderSpin>
    );
};
export default BasketballPlayerCard;
