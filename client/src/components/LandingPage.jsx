import React,{useEffect} from "react";  
import "./LandingPage.css"
import {Link} from "react-router-dom";
import {
    getPokemons,
    
    getTypes,
  } from "../actions";
  import { useDispatch, } from "react-redux";

export default function LandingPage(){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
      }, [dispatch]); 
    return(
        <div className='body-landing'>
            
            <div>
            <Link to ='/home'>
                <button className='btn-landing'>START</button>
            </Link>
            </div>
        </div>
    )
}