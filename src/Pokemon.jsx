import { useEffect ,useState} from "react";
import { PokemonCard } from "./PokemonCard";
import { SearchHistory } from "./SearchHistory";
import { Pagination } from "./Pagination";
import { Favourite } from "./Favourite";
export const Pokemon = () => {

    const[pokemon,setPokemon]=useState([]); 
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[search,setSearch]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    const[favouriteIds,setFavouriteIds]=useState(()=>{
        const saved=localStorage.getItem("favouritePokemonIds");
        return saved? JSON.parse(saved):[];
    });
    
    const[showOnlyFavourites,setShowOnlyFavourites]=useState(false);
    const[searchHistory,setSearchHistory]=useState(()=>{
        const saved=localStorage.getItem("pokemonSearchHistory");
        return saved? JSON.parse(saved):[];
    });

    const ITEMS_PER_PAGE = 12;

    const API="https://pokeapi.co/api/v2/pokemon?limit=124&offset=24";

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
            setLoading(false);

        }catch(error){
            console.error("Error fetching Pokemon:", error);
            setLoading(false);
            setError(error);
        }
    }
        
    useEffect(()=>{
        fetchpokemon();
    },[])

    useEffect(()=>{
        localStorage.setItem("favouritePokemonIds", JSON.stringify(favouriteIds));
    },[favouriteIds]);

    useEffect(()=>{
        localStorage.setItem("pokemonSearchHistory", JSON.stringify(searchHistory));
    },[searchHistory]);

    useEffect(()=>{
        const trimmed=search.trim().toLowerCase();
        if(!trimmed){
            return;
        }
        const timeoutId=setTimeout(()=>{
            setSearchHistory((prev)=>{
                const withoutCurrent=prev.filter((item)=>item!==trimmed);
                return [trimmed,...withoutCurrent].slice(0,5);
            });
        },500);

        return ()=>clearTimeout(timeoutId);
    },[search]);

    useEffect(()=>{
        setCurrentPage(1);
    },[search,showOnlyFavourites]);

    //Search 
    const searched=pokemon.filter((curElem)=>
    curElem.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredPokemon=showOnlyFavourites
        ? searched.filter((curElem)=>favouriteIds.includes(curElem.id))
        : searched;

    const totalPages=Math.max(1,Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE));
    const startIndex=(currentPage-1) * ITEMS_PER_PAGE;
    const paginatedPokemon=filteredPokemon.slice(startIndex,startIndex + ITEMS_PER_PAGE);

    useEffect(()=>{
        if(currentPage>totalPages){
            setCurrentPage(totalPages);
        }
    },[currentPage,totalPages]);

    if(loading){
        return <p>Loading...</p>;
    }

    if(error){
        return <p>Error: {error.message}</p>;
    }

    const toggleFavourite=(id)=>{
        setFavouriteIds((prev)=>
            prev.includes(id)
                ? prev.filter((itemId)=>itemId!==id)
                : [...prev,id]
        );
    };

    const goNextPage=()=>{
        setCurrentPage((prev)=>Math.min(prev+1,totalPages));
    };

    const goPrevPage=()=>{
        setCurrentPage((prev)=>Math.max(prev-1,1));
    };

    const clearSearchHistory=()=>{
        setSearchHistory([]);
    };

    return (
        <section className="container">
            <header>
                <h1>Pokemon Website</h1>
            </header> 

            <Favourite
                count={favouriteIds.length}
                showOnly={showOnlyFavourites}
                onToggleShowOnly={()=>setShowOnlyFavourites((prev)=>!prev)}
            />

            <div className="pokemon-search">
                <input type="text" placeholder="Search Pokemon..." value= {search} 
                onChange={(e) => setSearch(e.target.value)} />

            </div>

            <SearchHistory
                history={searchHistory}
                onSelectTerm={(term)=>setSearch(term)}
                onClearHistory={clearSearchHistory}
            />

        
            <div>
                <ul className="cards">

                    {paginatedPokemon.map((curElem) => (
                        <PokemonCard
                            key={curElem.id}
                            pokemonData={curElem}
                            isFavourite={favouriteIds.includes(curElem.id)}
                            onToggleFavourite={toggleFavourite}
                        />
                    ))}

                </ul>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={goPrevPage}
                onNext={goNextPage}
            />
        </section>
        
        
    );
}