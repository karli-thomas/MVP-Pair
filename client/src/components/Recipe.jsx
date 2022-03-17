import React from 'react';
import axios from 'axios';
import TOKEN from '../../../config.js';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSave() {
    this.setState({
      saved: !this.state.saved,
    })
  }

  handleClick(id) {
    axios.get(`/recipes/${id}/information`)
      .then((res) => {
        window.open(res.data.sourceUrl, '_blank');
      })
      .catch((err) => console.log(err));
  }


  render() {
    const recipe = this.props.recipe;
    return (
      <div>
        <div onClick={() => this.handleClick(recipe.id)} className='recipe'>
          <img src={recipe.image} alt="" />
          {recipe.title}
        </div>
        <input type='checkbox' />
      </div>
    )
  }
}

export default Recipe