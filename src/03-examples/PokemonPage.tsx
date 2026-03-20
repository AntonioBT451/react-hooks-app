import { useCounter } from "./hooks/useCounter";
import { usePokemon } from "./hooks/usePokemon";

export const PokemonPage = () => {

    const { counter, increment, decrement } = useCounter(1);
    const { pokemon, isLoading, formattedId } = usePokemon({ id: counter });

    if (isLoading) {
        return (
            <div className="bg-gradient flex flex-col items-center min-h-screen">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">Cargando...</h3>
            </div>
        )
    };

    if (!pokemon) {
        return (
            <div className="bg-gradient flex flex-col items-center min-h-screen">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">Pokemon no encontrado</h3>
            </div>
        )
    };

    return (
        <div className="bg-gradient flex flex-col items-center min-h-screen">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">#{formattedId} {pokemon.name}</h3>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
            />

            <div className="flex gap-2">

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
                    onClick={decrement}
                    disabled={counter === 1}
                >
                    Anterior
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
                    onClick={increment}

                >
                    Siguiente
                </button>

            </div>
        </div>
    );
};