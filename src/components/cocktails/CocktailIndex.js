import React from 'react'
import axios from 'axios'

import CocktailCard from './CocktailCard'

class CocktailIndex extends React.Component {
  state = {
    cocktails: [],
    showCocktails: [],
    spirits: [
      'Vodka',
      'Gin',
      'Whisky',
      'Rum',
      'Tequila',
      'Kahlua',
      'Bourbon',
      'Coffee Liqueur'
    ],
    chosenSpirit: ''
  }

  // async componentDidMount () {
  //   try {
  //     const res = await axios.get(
  //       'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  //     )
  //     this.setState({
  //       cocktails: res.data.drinks,
  //       showCocktails: res.data.drinks
  //     })
  //     console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //     this.props.history.push('/error')
  //   }
  // }

  displayCocktails = async () => {
    try {
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.chosenSpirit}`
      )
      this.setState({ showCocktails: res.data.drinks })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    e.preventDefault()
    const alcoholSelected = e.target.value
    const filterCocktails = this.state.cocktails.filter(
      cocktail =>
        cocktail.strAlcoholic === alcoholSelected || alcoholSelected === 'All'
    )
    this.setState({ showCocktails: filterCocktails })
  }

  handleInput = e => {
    const chosenSpirit = e.target.value
    this.setState({ chosenSpirit })
  }

  render () {
    if (!this.state.showCocktails) return null
    console.log(
      'console logging chosen spirit from render',
      this.state.chosenSpirit
    )
    return (
      <div className='index-wrapper'>
        <div className='title-wrapper'>
          <h1 className='main-title'>THE COCKTAIL CLUB</h1>
        </div>

        <div className='form-wrapper'>
          <form className='alcoholic-form'>
            <select
              onChange={this.handleChange}
              name='cocktails'
              id='cocktails'
              defaultValue={'DEFAULT'}
            >
              <option value='DEFAULT' disabled>ALCOHOL/NON-ALCOHOL</option>
              <option value='All'>All</option>
              <option value='Alcoholic'>Alcoholic</option>
              <option value='Optional alcohol'>Optional Alcohol</option>
              <option value='Non alcoholic'>Non-Alcoholic</option>
            </select>
            {/* <input type="text" name='cocktail-search' id="cocktail-search" placeholder="Search cocktails..." value="" /> */}
          </form>

          <form className='spirit-form'>
            <select
              onChange={this.handleInput}
              name='spirits'
              id='spirits'
              defaultValue={'DEFAULT'}
            >
              <option value='DEFAULT' disabled>
                SELECT SPIRIT
              </option>
              {this.state.spirits.map(spirit => (
                <option key={spirit} value={spirit}>
                  {spirit}
                </option>
              ))}
            </select>
          </form>

          <button className='button is-white is-medium is-rounded' id='search-button' onClick={this.displayCocktails}>
            FIND COCKTAIL!
          </button>
        </div>

        <section className='section'>
          <div className='container'>
            <div className='columns is-mobile is-multiline'>
              {this.state.showCocktails.map(cocktail => (
                <CocktailCard key={cocktail.idDrink} {...cocktail} />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default CocktailIndex
