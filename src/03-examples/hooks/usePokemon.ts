
import { useEffect, useState } from 'react'
import type { PokemonApi } from '../interfaces/PokemonApi';

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

interface usePokemonProps {
    id: number;
}

export const usePokemon = ({ id }: usePokemonProps) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getPokemonById = async (id: number) => {

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            };

            const data: PokemonApi = await response.json();

            setPokemon({
                id: id,
                name: data.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al cargar Pokemon');
            setPokemon(null);

        } finally {
            setIsLoading(false);
        }


        setIsLoading(false);
    }

    useEffect(() => {
        getPokemonById(id);

    }, [id]);


    return {
        pokemon,
        isLoading,
        error,

        formattedId: id.toString().padStart(3, '0'),

    }
}
