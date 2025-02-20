/* eslint-disable react/prop-types */

const Card = ({ pokemon, loading, infoPokemon }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!Array.isArray(pokemon) || pokemon.length === 0) {
    return <h2>Nessun Pokémon trovato</h2>;
  }

  return (
    <div className="card-container">
      {pokemon.map((item) => (
        <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
          <h2>{item.id}</h2>
          <img src={item.sprites?.front_default} alt={item.name} />
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Card;
