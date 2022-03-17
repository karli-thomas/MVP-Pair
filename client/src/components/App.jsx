import React from 'react';
import Dishes from './Dishes.jsx';
import Recipes from './Recipes.jsx';
import Saved from './Saved.jsx';
import '../styles.css';
import wines from '../wines.json';
import axios from 'axios';
import { AppBar, Autocomplete, Box, Button, ThemeProvider, TextField, Toolbar, Typography, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    this.fetchSaved = this.fetchSaved.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    window.onpopstate = event => this.setState(event.state);
  }

  handleChange(event, value, reason, details) {
    if (reason === "selectOption") {

      history.pushState({view: "dishes", wine: value.id}, null, "#dishes");
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
    history.pushState({view: "recipes"}, null, "#recipes");
    axios.get(`/recipes/complexSearch?titleMatch=${ingredient}`)
      .then((res) => {
        this.setState({
          view: 'recipes',
          recipes: res.data.results,
        });
      });
  }

  fetchSaved() {
    return axios.get("/saved")
      .then(res => this.setState({
        saved: res.data,
      }))
      .catch(err => console.log(err));
  }

  showSaved() {
    history.pushState({view: "saved"}, null, "#saved");
    this.fetchSaved();
    this.setState({
      view: 'saved',
    });
  }

  saveRecipe(recipe) {
    return axios.post("/saved", {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
    })
      .then(this.fetchSaved)
      .catch(console.log);
  }

  deleteRecipe(recipe) {
    return axios.delete(`/saved/${recipe.id}`)
      .then(this.fetchSaved)
      .catch(console.log);
  }

  render () {
    return (
      <div className='app'>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" component="div">
                PAIR
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Autocomplete
                // color='inherit'
                disablePortal
                id="combo-box-demo"
                options={wines}
                sx={{ minWidth: 300, flexGrow: 1, padding: "14px" }}
                renderInput={(params) => <TextField {...params} label="Select a Wine" />}
                onChange={this.handleChange}
              />
              <Box sx={{ flexGrow: 1 }} />
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
          { this.state.view === "recipes" &&
              <Recipes recipes={this.state.recipes} saved={this.state.saved} saveRecipe={this.saveRecipe} deleteRecipe={this.deleteRecipe} />
          }
          { this.state.view === "saved" &&
              <Recipes recipes={this.state.saved} saved={this.state.saved} saveRecipe={this.saveRecipe} deleteRecipe={this.deleteRecipe} />
          }
        </ThemeProvider>
      </div>
    )
  }
}

export default App;