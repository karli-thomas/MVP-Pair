import React from 'react';
import Recipe from './Recipe.jsx';

const Recipes = function Recipes({recipes}) {
  return recipes.map(
    (recipe, key) => <Recipe recipe={recipe} key={key} />
  );
}

export default Recipes;