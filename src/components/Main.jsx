import { useEffect, useState } from "react";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import Card from "./Card";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFunction = async () => {
    setLoading(true);
    const res = await axios.get(url);
    //console.log(res.data.results);
    setNextUrl(res.data.next);
    setPreviousUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
    // console.log(pokeData);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      // console.log(result.data);
      setPokeData((state) => {
        state = [...state, result.data];

        return state;
      });
    });
  };

  useEffect(() => {
    pokeFunction();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-container">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btn-group">
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(previousUrl);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              next
            </button>
          </div>
        </div>
        <div className="right-container">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;
