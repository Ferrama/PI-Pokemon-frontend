import React from "react";
import "./Card.css";
export default function Card({ name, imageCard, types, id }) {
  return (
    <div className="card">
      <div className="middleSup">
        <div className="nameCard">
          <h3 className="h3">{name.replace(name.charAt(0), name.charAt(0).toUpperCase())}</h3>
        </div>
      </div>
      <div className="middleMidd">
        <div className="imageCard" >
          <img src={imageCard} alt=""/>
        </div>
      </div>
      <div className="middleInf">
        <div className="types">
          {types?.map((e) => {
            return (
              <div className="type">
                <span>{e.replace(e.charAt(0), e.charAt(0).toUpperCase())}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
