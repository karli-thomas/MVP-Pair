import React from 'react';
import Dishes from './Dishes.jsx';
import Recipes from './Recipes.jsx';
import Saved from './Saved.jsx';
import '../styles.css';
import wines from '../wines.json';
import axios from 'axios';
import { AppBar, Autocomplete, Button, TextField, Toolbar, Typography } from '@mui/material';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wine: '',
      dishes: [],
      pairingNote: '',
      view: 'search',
      saved: [],
      recipes: []
    }

    this.showDishes = this.showDishes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showRecipes = this.showRecipes.bind(this);
    this.showSaved = this.showSaved.bind(this);
  }

  handleChange(event, value, reason, details) {
    if (reason === "selectOption") {

      this.setState({
        wine: value.id,
        view: 'dishes',
      });
      this.showDishes(value.id);
    }

  }

  showDishes(wine) {
    axios.get(`/food/wine/dishes?wine=${wine}`)
      .then((res) => {
        if (res.data.status === 'failure') {
          this.setState({
            dishes: [],
            pairingNote: 'No pairing found for this wine',
          })
        } else {
          this.setState({
            dishes: res.data.pairings,
            pairingNote: res.data.text,
          })
        }
      })
      .catch((err) => console.log(err));
  }

  showRecipes(ingredient) {
    axios.get(`/recipes/complexSearch?titleMatch=${ingredient}`)
      .then((res) => {
        this.setState({
          view: 'recipes',
          recipes: res.data.results,
        });
      });
  }

  showSaved() {
    this.setState({
      view: 'saved',
    });
  }

  render () {
    return (
      <div className='app'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              PAIR
            </Typography>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={wines}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select a Wine" />}
                onChange={this.handleChange}
              />
            <Button color="inherit" onClick={this.showSaved}>Saved Recipes</Button>
          </Toolbar>
        </AppBar>

        { this.state.view === "dishes" && <div>
          {this.state.pairingNote &&
            <div> {this.state.pairingNote} </div>
          }
          <Dishes dishes={this.state.dishes} showRecipes={this.showRecipes}/>
          </div>
        }
        { this.state.view === "recipes" && <div>
            <Recipes recipes={this.state.recipes} />
          </div>
        }
        { this.state.view === "saved" && <div>
          <Saved saved={this.state.saved} />
          </div>
        }
      </div>
    )
  }
}

export default App;