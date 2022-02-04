import React from "react";  
import "./LandingPage.css"
import {Link} from "react-router-dom";


export default function LandingPage(){
    return(
        <div className='body-landing'>
            {/* <div className='title-landing'>
            <h1>Welcome to Pokepage</h1>
            </div> */}
            <div>
            <Link to ='/home'>
                <button className='btn-landing'>START</button>
            </Link>
            </div>
        </div>
    )
}