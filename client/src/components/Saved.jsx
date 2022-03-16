import React from 'react';
import Recipe from './Recipe.jsx';


const Saved = function Saved({recipes}) {
  return (
    {recipes.map((recipe, key) => <Recipe recipe={recipe} key={key} />)}
  )
}

export default Saved;