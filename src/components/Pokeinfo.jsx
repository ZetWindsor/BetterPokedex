/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const Pokeinfo = ({ data }) => {
  const [selectedSprite, setSelectedSprite] = useState(null);

  useEffect(() => {
    setSelectedSprite(data?.sprites?.other?.dream_world?.front_default);
  }, [data]);

  const spriteOptions = {
    DreamWorld: data?.sprites?.other?.dream_world?.front_default,
    Home: data?.sprites?.other?.home?.front_default,
    ShinyHome: data?.sprites?.other?.home?.front_shiny,
    OfficialArtwork: data?.sprites?.other?.official_artwork?.front_default,
    Showdown: data?.sprites?.other?.showdown?.front_default,
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img src={selectedSprite} alt={data.name} />
          <div className="btn-group">
            {Object.entries(spriteOptions).map(
              ([key, value]) =>
                value && (
                  <button key={key} onClick={() => setSelectedSprite(value)}>
                    {key}
                  </button>
                )
            )}
          </div>
          <div className="abilities">
            {data.abilities?.map((ability, index) => (
              <div className="group" key={index}>
                <h2>{ability.ability.name}</h2>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats?.map((stat, index) => (
              <h3 key={index}>
                {stat.stat.name}: {stat.base_stat}
              </h3>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Pokeinfo;
