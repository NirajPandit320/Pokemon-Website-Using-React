import { useEffect } from "react";
export const Pokemon = () => {

    const API="https://pokeapi.co/api/v2/pokemon?limit=24&offset=24";

    const fetchpokemon = async () => {
        try{
            const response =await fetch(API);
            const data=await response.json();
            console.log(data);

        }catch(error){
            console.error("Error fetching Pokemon:", error);
        }
    }
        
    useEffect(()=>{
        fetchpokemon();
    },[])

    return (
        <div>   
            <h1>Pokemon</h1>
        </div>
    );
}