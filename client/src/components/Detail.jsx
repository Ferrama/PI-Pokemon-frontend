import React, {  useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let pokemon = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
   
 function clearDetail(){
   dispatch (resetDetail())
 }


  return (
    <div className="detailRender">
      {pokemon.length > 0 ? (
        <div className="detailCard">
          <div className="image">
            <img
              src={pokemon[0].imageDetail}
              alt=""
              
            />
          </div>
          <div className="midRight">
            <div className="midSup">
              
                <Link to="/home" >
                  <button className="btnBack" onClick={clearDetail} >Back</button>
                </Link>
                
              
            </div>
            <div className="midInf">
              <div className='name'>
              <span> ID:{pokemon[0].id}</span>
                <h1>NAME: {pokemon[0].name.replace(pokemon[0].name.charAt(0), pokemon[0].name.charAt(0).toUpperCase())}</h1>
                
              </div>

              <div className="heWe">
                <span> Height: {pokemon[0].height}</span>
                <span> Weitgh: {pokemon[0].weight}</span>
                <span> Base Experience: {pokemon[0].baseExp}</span>
              </div>
              <div className='stats'>
                
                <span id="hp">Hp: <progress  className ='progress'id="hp" max="200" value={pokemon[0].hp}/> {pokemon[0].hp}</span>
                <span id="speed">Speed:<progress className ='progress' id="speed" max="200" value={pokemon[0].speed}/> {pokemon[0].speed}</span>
                
                
                <span id="attack">Attack: <progress className ='progress'id="attack" max="200" value={pokemon[0].attack}/> {pokemon[0].attack}</span>
                <span id="defense">Defense: <progress className ='progress' id="defense" max="200" value={pokemon[0].defense}/> {pokemon[0].defense}</span>
                
              </div>
              <div className='types'>
                <h4 className='h4'>
                  Types:</h4>
                  {pokemon[0].types?.map((e) => (
                    <div id={e} className='type'>{e.replace(e.charAt(0), e.charAt(0).toUpperCase())}</div>
                  ))}
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>LOADING...</p>
      )}
    </div>
  );
}
