import React from "react";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const date = new Date();
let day = weekday[date.getDay()];
let hour = date.getHours()+1; // between 0 and 23, what kind of psychopath wrote this

function Banner() {
    if (day === "Saturday" || day === "Sunday") {
        if(hour <= 9)
            return (
                <div className="Banner">
                    <h1>Buses are not currently running, buses will begin running at 9am!</h1>
                </div>
            )
    } else {
        if(hour <= 6)
            return (
                <div className="Banner">
                    <h1>Buses are not currently running, buses will begin running at 6am!</h1>
                </div>
            )
    }
}

export default Banner;