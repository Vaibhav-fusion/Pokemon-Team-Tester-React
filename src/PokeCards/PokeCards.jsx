import React from 'react';
import { useEffect, useState } from 'react'
///funtion for my ussage
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
///type chart matrix
const typeEffectiveness = {
    Normal:    { ...allTypes(1), Fighting: 2, Ghost: 0 },
    Fire:      { ...allTypes(1), Fire: 0.5, Water: 2, Grass: 0.5, Ice: 0.5, Bug: 0.5, Rock: 2, Steel: 0.5 ,Ground:2},
    Water:     { ...allTypes(1), Fire: 0.5, Water: 0.5, Grass: 2, Electric: 2, Ice: 0.5, Steel: 0.5 },
    Grass:     { ...allTypes(1), Fire: 2, Water: 0.5, Grass: 0.5, Ice: 2, Poison: 2, Ground: 0.5, Flying: 2, Bug: 2 },
    Electric:  { ...allTypes(1), Electric: 0.5, Ground: 2, Flying: 0.5, Steel: 0.5 },
    Ice:       { ...allTypes(1), Fire: 2, Ice: 0.5, Fighting: 2, Rock: 2, Steel: 2 },
    Fighting:  { ...allTypes(1), Flying: 2, Psychic: 2, Bug: 0.5, Rock: 0.5, Dark: 0.5, Fairy: 2 },
    Poison:    { ...allTypes(1), Grass: 0.5, Fighting: 0.5, Poison: 0.5, Ground: 2, Psychic: 2, Bug: 0.5, Fairy: 0.5 },
    Ground:    { ...allTypes(1), Water: 2, Grass: 2, Electric: 0, Ice: 2, Poison: 0.5, Rock: 0.5 },
    Flying:    { ...allTypes(1), Electric: 2, Rock: 2, Fighting: 0.5, Bug: 0.5, Grass: 0.5, Ground: 0 },
    Psychic:   { ...allTypes(1), Fighting: 0.5, Psychic: 0.5, Bug: 2, Ghost: 2, Dark: 2 },
    Bug:       { ...allTypes(1), Fire: 2, Fighting: 0.5, Poison: 0.5, Flying: 2, Rock: 2, Grass: 0.5 },
    Rock:      { ...allTypes(1), Normal: 0.5, Fire: 0.5, Water: 2, Grass: 2, Fighting: 2, Poison: 0.5, Ground: 2, Steel: 2 },
    Ghost:     { ...allTypes(1), Normal: 0, Fighting: 0, Poison: 0.5, Bug: 0.5, Ghost: 2, Dark: 2 },
    Dragon:    { ...allTypes(1), Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 0.5, Ice: 2, Dragon: 2, Fairy: 2 },
    Dark:      { ...allTypes(1), Fighting: 2, Bug: 2, Ghost: 0.5, Psychic: 0, Dark: 0.5, Fairy: 2 },
    Steel:     { ...allTypes(1), Normal: 0.5, Fire: 2, Grass: 0.5, Ice: 0.5, Fighting: 2, Poison: 0, Ground: 2, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 0.5, Dragon: 0.5, Steel: 0.5, Fairy: 0.5 },
    Fairy:     { ...allTypes(1), Fighting: 0.5, Poison: 2, Bug: 0.5, Dragon: 0, Dark: 0.5, Steel: 2 }
  };
  function allTypes(value) {
    return {
      Normal: value, Fire: value, Water: value, Grass: value, Electric: value, Ice: value, Fighting: value,
      Poison: value, Ground: value, Flying: value, Psychic: value, Bug: value, Rock: value, Ghost: value,
      Dragon: value, Dark: value, Steel: value, Fairy: value
    };
  }
  // console.log(typeEffectiveness);
///
/// funtion for type calculation and giving an array
function TypeCalculator(type1,type2=""){

    let type2Object = type2.length==0? allTypes(1) : typeEffectiveness[type2]
    // console.log(type2Object,"f")

    let dualMatrix = Object.entries(typeEffectiveness[type1]).map((eachType)=>{
        
        return [eachType[0],eachType[1]*type2Object[eachType[0]]]
        
    })

    // let dualMatrix_obj= Object.fromEntries(dualMatrix)

    let final_effectiven_obj={"Weak to:":[],"Resist against:":[],"Immune to:":[],"4X Weak to:":[],"0.25X resist against:":[]}

    dualMatrix.forEach(ele => {
        if(ele[1]==2){
            final_effectiven_obj["Weak to:"].push(ele[0])
        }
        if(ele[1]==0.5){
            final_effectiven_obj["Resist against:"].push(ele[0])
        }
        if(ele[1]==0){
            final_effectiven_obj["Immune to:"].push(ele[0])
        }
        if(ele[1]==4){
            final_effectiven_obj["4X Weak to:"].push(ele[0])
        }
        if(ele[1]==0.25){
            final_effectiven_obj["0.25X resist against:"].push(ele[0])
        }
    });
   
    // console.log(final_effectiven_obj,"main")
    return final_effectiven_obj
}

////

///reacti componenet
function TypeEffectivnessCard(typeArray){

  
    typeArray.push("")
    typeArray[0]=capitalizeFirstLetter(typeArray[0])
    typeArray[1]=capitalizeFirstLetter(typeArray[1])
    
    // console.log(typeArray)
    
    let final_effectiven_obj=TypeCalculator(typeArray[0],typeArray[1])

    return <>
    {Object.entries(final_effectiven_obj).map((ele)=>(
        <p>{ele[1].length==0?"":ele[0]+" "+ ele[1].join(" ") }</p>
    ))}
    </>
}
//


function AllTypesCount(typeStorArr){
  let typeCount = allTypes(0);
  
  typeStorArr.forEach((eachPoke) => {
    // Skip if not an array
    if (!Array.isArray(eachPoke)) return;
    
    eachPoke.forEach((e) => {
      // Only process if it's a valid entry
      if (Array.isArray(e) && e.length >= 2 && typeof e[1] === 'number') {
        if (e[1] > 1) {
          typeCount[e[0]] = (typeCount[e[0]] || 0) + 1;
        }
        else if (e[1] < 1) {
          typeCount[e[0]] = (typeCount[e[0]] || 0) - 1;
        }
      }
    });
  });
  return <>
    {
      Object.entries(typeCount).map((ele,index)=>(
        <div key={index}>
          <h2>{ele[0]}</h2>
          <p>{ele[1]}</p>

        </div>
      ))
    }
  </>
}


function PokeCards({ pokemonData }) {

  
  const [typeStorage , setTypeStorage] = useState(["", "", "", "", "", ""])

  useEffect(() => {
    if (pokemonData.length > 0) {
      const newTypeStorage = pokemonData.map(poke => {
        const types = poke.types.map(t => t.type.name);
        const type1 = capitalizeFirstLetter(types[0]);
        const type2 = types[1] ? capitalizeFirstLetter(types[1]) : "";
        
        // Get the type2 modifier object (1x for all types if no second type)
        const type2Object = type2 ? typeEffectiveness[type2] : allTypes(1);
        
        // Calculate and store the raw dualMatrix
        return Object.entries(typeEffectiveness[type1]).map(([type, multiplier]) => {
          return [type, multiplier * type2Object[type]];
        });
      });
      
      setTypeStorage(newTypeStorage);
    } else {
      setTypeStorage([]);
    }

    console.log(typeStorage)
  }, [pokemonData]);

  return (
    <div>
      {pokemonData.map((poke) => (
        <div key={poke.id}>
          <img src={poke.sprites.front_default} alt={poke.name} />
          <p>{capitalizeFirstLetter(poke.name)}</p>
          <p>Type: {poke.types.map(typeInfo => capitalizeFirstLetter( typeInfo.type.name)).join(', ')}</p>

          {TypeEffectivnessCard(poke.types.map(typeInfo => typeInfo.type.name))}
        </div>
      ))}

      <div>
        {AllTypesCount(typeStorage)}
      </div>
    </div>
  );
}

export default PokeCards;