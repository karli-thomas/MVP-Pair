import React from 'react';
import TOKEN from '../../../config.js';
import axios from 'axios';

class Dish extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(event) {
  //   axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${event.target.value}&apiKey=${TOKEN.TOKEN}`)
  // }

  render() {
    return (
      <a onClick={this.props.onClick}>{this.props.dish}</a>
    )
  }
}

export default Dish;