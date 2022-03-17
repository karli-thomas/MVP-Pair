import React from 'react';
import axios from 'axios';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import TOKEN from '../../../config.js';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSave(event) {
    event.stopPropagation();
    event.preventDefault();
    const { isSaved, recipe, saveRecipe, deleteRecipe } = this.props;
    if (isSaved) {
      deleteRecipe(recipe);
    } else {
      saveRecipe(recipe);
    }
  }

  handleClick(id) {
    axios.get(`/recipes/${id}/information`)
      .then((res) => {
        window.open(res.data.sourceUrl, '_blank');
      })
      .catch((err) => console.log(err));
  }



  render() {
    const { isSaved, recipe, saveRecipe } = this.props;
    const saveButtton = (
      <IconButton
        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
        aria-label={`${isSaved ? 'save' : 'delete'} this recipe`}
        onClick={this.handleSave} >
          { isSaved ? <DeleteIcon /> : <SaveIcon /> }
      </IconButton>
    );
    return (
      <ImageListItem onClick={() => this.handleClick(recipe.id)}>
        <img src={recipe.image} alt="" />
        <ImageListItemBar
          title={recipe.title}
          actionIcon={saveButtton}></ImageListItemBar>
      </ImageListItem>
    )
  }
}

export default Recipe