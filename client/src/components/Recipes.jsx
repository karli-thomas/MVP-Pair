import React from 'react';
import { ImageList } from '@mui/material';

import Recipe from './Recipe.jsx';

const Recipes = function Recipes({recipes, saved, saveRecipe, deleteRecipe}) {
  return (
    <ImageList cols={3}>
      {recipes.map((recipe) =>
        <Recipe recipe={recipe} key={recipe.id} isSaved={saved.some(elem => elem.id === recipe.id)} saveRecipe={saveRecipe} deleteRecipe={deleteRecipe} />)}
    </ImageList>
  );
}

export default Recipes;