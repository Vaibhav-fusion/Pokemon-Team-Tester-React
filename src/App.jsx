import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import PokeCards from './PokeCards/PokeCards';

function App() {
  const [pokemonNames, setPokemonNames] = useState(["", "", "", "", "", ""]);
  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokemon = async () => {

    //test one
    // setTypeStorage([])
    //
    const fetchedData = [];

    for (const name of pokemonNames) {
      if (!name) continue;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error(`${name}`);
        const data = await response.json();
        fetchedData.push(data);
      } catch (err) {
        console.log(err);
      }
    }


    setPokemonData(fetchedData); // Set the fetched data to pokemonData state

    console.log(fetchedData,"this is data")
  };

  const getRandomPokemon = async () => {
    const randomIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1024) + 1);
    setPokemonNames(randomIds.map((id) => id.toString()));
  };

 
  return (
    <>
      <h1>Pokemon Team Tester</h1>

      <div>
        {pokemonNames.map((name, index) => (
          <input
            key={index}
            type='text'
            value={name}
            //input handling
            onChange={(e) => {
              const newNames = [...pokemonNames];
              newNames[index] = e.target.value;
              setPokemonNames(newNames);
            }}
            placeholder={`pokemon ${index + 1}`}
          />
        ))}
      </div>

      <div>
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
        <button onClick={getRandomPokemon}>Random Pokemon</button>
      </div>

     <PokeCards pokemonData={pokemonData}  />
    </>
  );
}

export default App;