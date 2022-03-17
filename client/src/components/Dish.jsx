import React from 'react';
import TOKEN from '../../../config.js';
import axios from 'axios';

class Dish extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a onClick={this.props.onClick}>{this.props.dish}</a>
    )
  }
}

export default Dish;