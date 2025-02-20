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
    setNextUrl(res.data.next);
    setPreviousUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    const pokemonList = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    
    // Ordinare i dati per ID
    pokemonList.sort((a, b) => a.id - b.id);
    setPokeData(pokemonList);
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
              disabled={!previousUrl}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
              disabled={!nextUrl}
            >
              Next
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
