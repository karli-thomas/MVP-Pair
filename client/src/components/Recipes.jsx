import React from 'react';
import Recipe from './Recipe.jsx';

const Recipes = function Recipes({recipes}) {
  return (
    <div className="recipes">
      {recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
    </div>
  );
}

export default Recipes;