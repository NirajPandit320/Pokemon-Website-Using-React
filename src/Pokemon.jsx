import { useEffect ,useState} from "react";
export const Pokemon = () => {

    const[pokemon,setPokemon]=useState([]); 

    const API="https://pokeapi.co/api/v2/pokemon?limit=24&offset=24";

    const fetchpokemon = async () => {
        try{
            const response =await fetch(API);
            const data=await response.json();
            console.log(data);

            const detailedPokemonData= data.results.map(async(curElem)=>
            {
                const res=await fetch(curElem.url);
                const data= await res.json();
                return data;    
            });
            console.log(detailedPokemonData);

            const detailedData= await Promise.all(detailedPokemonData);
            console.log(detailedData);

            setPokemon(detailedData);

        }catch(error){
            console.error("Error fetching Pokemon:", error);
        }
    }
        
    useEffect(()=>{
        fetchpokemon();
    },[])

    return (
        <section className="container">
            <header>
                <h1>Pokemon Website</h1>
            </header> 

        
            <div>
                <ul className="cards">

                    {pokemon.map((curElem) => (

                    <li key={curElem.id}>
                        {curElem.name}
                    </li>
                        ))}

                </ul>
            </div>
        </section>
        
        
    );
}