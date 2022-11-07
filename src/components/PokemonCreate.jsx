import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, postPokemon, } from "../actions";
import "./PokemonCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Required name";
  if (!input.imageCard) errors.imageCard = "Required Image Card";
  if (!input.imageDetail) errors.imageDetail = "Required Image Detail";
  if (input.height <= 0 || input.height > 10000)
    errors.height = "Required min 0 || max 10000";
  if (input.weight <= 0 || input.weight > 6000)
    errors.weight = "Required min 0 || max 6000";
  if (input.baseExp <= 0 || input.baseExp > 6000) errors.baseExp = "Required Base Experience";
  if (input.hp <= 0 || input.hp > 6000) errors.hp = "Required min 0 || max 6000";
  if (input.speed <= 0 || input.speed > 6000) errors.speed = "Required min 0 || max 6000";
  if (input.attack <= 0 || input.attack > 6000) errors.attack = "Required min 0 || max 6000";
  if (input.defense <= 0 || input.defense > 6000) errors.defense = "Required min 0 || max 6000";

  if (input.types.length === 0) errors.types = "Required Types";

  return errors;
}
function buttonHab(p) {
  if (Object.keys(p).length === 0) return false;
  else return true;
}

export default function PokemonCreate(props) {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState([{
    name: "Required name",
    imageCard: "Required Image Card",
    imageDetail: "Required Image Detail",
    height: "Required min 0 || max 10000",
    baseExp: "Required Base Experience",
    types: "Required Types",
    hp: "Required HP",
    weight: "Required min 0 || max 6000",
    attack: "Required Attack",
    speed: "Required Speed",
    defense: "Required Defense",
  }]);
  const [input, setInput] = useState({
    name: "",
    imageCard: "",
    imageDetail: "",
    height: "",
    weight: "",
    baseExp: "",
    hp: "",
    types: [],
    attack: "",
    defense: "",
    speed: "",
  });

  let [button, setButton] = useState(true);

  useEffect(() => {
    setButton(buttonHab(errors));
  }, [errors]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    if (e.target.value !== "select") {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    setErrors(validate({ ...input, types: [...input.types, e.target.value] }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    toast.success("Pokemon was created!", {
      position: toast.POSITION.TOP_CENTER
    });
    setInput({
      name: "",
      imageCard: "",
      imageDetail: "",
      height: "",
      weight: "",
      baseExp: "",
      hp: "",
      types: [],
      attack: "",
      defense: "",
      speed: "",
    });
    dispatch(getPokemons())
    //setTimeout(navigate("/home") , 2000);
  }
  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  }

  return (
    <div className="create">
      <div className="divBtnCreate">
        <Link to="/home">
          <button className="btnBackCreate">Back</button>
        </Link>
      </div>
      <div className="content">
        <div className="divData">
          <div>
            <h1>Create your Pokemon</h1>
          </div>
          <div className="divForm">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="form"
              id="formulario"
            >
              <div className="midInfCreate">
                <div className="midLeft">
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Name:</label>
                      <input
                      className="inputForm"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.name && <span> {errors.name}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Image Card:</label>
                      <input
                      className="inputForm"
                        type="text"
                        value={input.imageCard}
                        name="imageCard"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.imageCard && <span> {errors.imageCard}</span>}</div>
                    </div>
                  </div>

                  <div id='controled'>
                    <div>
                      <label className="labelForm">Image Detail:</label>
                      <input
                      className="inputForm"
                        type="text"
                        value={input.imageDetail}
                        name="imageDetail"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.imageDetail && <span> {errors.imageDetail}</span>}
                      </div>
                      
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Height:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.height && <span> {errors.height}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Weight:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.weight && <span> {errors.weight}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Base Experience:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.baseExp}
                        name="baseExp"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.baseExp && <span> {errors.baseExp}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">HP:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.hp && <span>{errors.hp}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Speed:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.speed && <span> {errors.speed}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Attack:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.attack && <span> {errors.attack}</span>}</div>
                    </div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label className="labelForm">Defense:</label>
                      <input
                      className="inputForm"
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={(e) => handleChange(e)}
                      />
                      <div id='controlerColor'>{errors.defense && <span> {errors.defense}</span>}</div>
                    </div>
                  </div>
                </div>
                <div className="midRight">
                  <div>
                    <label className="labelForm">Types:</label>
                    <select 
                    className="selectForm"
                    onChange={(e) => handleSelect(e)}>
                      <option value="select">Select</option>
                      {types &&
                        types.map((e) => (
                          <option name="types" value={e.name}>
                            {e.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="inputTypes">
                    {input.types?.map((e) => (
                      <div>
                        <label className="labelForm">{e}</label>
                        <button onClick={() => handleDelete(e)}>x</button>
                      </div>
                    ))}
                    <div id='controlerColor'>{errors.types && <span> {errors.types}</span>}</div>
                  </div>
                  <div>
                    <button
                      className="btnCreate"
                      disabled={button}
                      form="formulario"
                    >
                      Create Pokemon
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

