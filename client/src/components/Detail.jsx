import React, {  useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let pokemon = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
   
//  function clearDetail{
//    dispatch
//  }
// nClick={clearDetail}

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
              <div className="detail">
                <Link to="/home" >
                  <button className="btnBack" >Back</button>
                </Link>
              </div>
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
                <div className='stat1'>
                <span>Hp: {pokemon[0].hp}</span>
                <span>Speed: {pokemon[0].speed}</span>
                </div>
                <div className='stat2'>
                <span>Att: {pokemon[0].attack}</span>
                <span>Def: {pokemon[0].defense}</span>
                </div>
              </div>
              <div className='types'>
                <h4 className='h4'>
                  Types:</h4>
                  {pokemon[0].types?.map((e) => (
                    <div className='type'>{e.replace(e.charAt(0), e.charAt(0).toUpperCase())}</div>
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
