import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    }
  }

  onSave() {
    this.setState({
      saved: !this.state.saved,
    })
  }


  render() {
    const recipe = this.props.recipe;
    return (
      <div className='recipe'>
        {recipe.title}
        <img src={recipe.image} alt="" />
      </div>
    )
  }
}

export default Recipe