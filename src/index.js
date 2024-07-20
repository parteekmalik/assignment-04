import React from "react";
import ReactDOM from "react-dom/client";
import BasketballPlayerCard from "./component/BasketballPlayerCard";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BasketballPlayerCard
            name="LeBron James"
            image="https://scontent.fixc8-1.fna.fbcdn.net/v/t39.30808-6/386551086_621211286861456_1981619527080879626_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UGyq8R9BWIAQ7kNvgEW4D2A&_nc_ht=scontent.fixc8-1.fna&oh=00_AYCoddpR2mhq8qWx6GBKOHDfr1Mce4V6tvx_K3IQmha0KQ&oe=66A1830A"
            position="Forward"
            stats={{ pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5 }}
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
