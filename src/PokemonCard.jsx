export const PokemonCard = ({ pokemonData, isFavourite, onToggleFavourite }) => {
  const pokemonImage =
    pokemonData.sprites.other?.["official-artwork"]?.front_default ||
    pokemonData.sprites.other?.home?.front_default ||
    pokemonData.sprites.front_default;

    return (
        <li className="pokemon-card">
                <button
          type="button"
          className={`favourite-btn ${isFavourite ? "active" : ""}`}
          onClick={() => onToggleFavourite(pokemonData.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite ? "★" : "☆"}
        </button>
            
                <figure>
          <img src={pokemonImage} alt={pokemonData.name} className="pokemon-image" />
                </figure>
                <h1 className="pokemon-name">{pokemonData.name}</h1>

                <div>
                    <p>
                        {pokemonData.types.map((curtype)=>curtype.type.name).join(", ")}
                    </p>
                </div>

        <div className="grid-three-cols">
        <p className="pokemon-info">
          <span> Height:</span> {pokemonData.height}
        </p>
        <p className="pokemon-info">
          <span> Weight:</span> {pokemonData.weight}
        </p>
        <p className="pokemon-info">
          <span> speed:</span> {pokemonData.stats[5].base_stat}
        </p>
      </div>

        <div className="grid-three-cols">
            <div className="pokemon-info">
                <p>{pokemonData.base_experience}</p>
                    <span> Experience:</span>
            </div>
        </div>
        <div className="pokemon-info">
          <p>{pokemonData.stats[1].base_stat}</p>
                    <span>Attack:</span>
        </div>

         <div className="pokemon-info">
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span> Abilities: </span>
        </div>
        </li>
    );
}