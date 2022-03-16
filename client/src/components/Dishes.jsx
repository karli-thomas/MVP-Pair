import React from 'react';
import Dish from './Dish.jsx';

const Dishes = function Dishes({dishes, showRecipes}) {
  return dishes.map(
    (dish, key) => <Dish dish={dish} key={key} onClick={() => showRecipes(dish)} />
  );
}

export default Dishes;