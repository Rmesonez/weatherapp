import './SearchBar.css';
import { useState } from 'react'

export default function SearchBar({ newLocation }) {
  const [ city, setCity ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ city })
    if(city === '' || !city) return;
      newLocation(city)
  }

  return (
    <div className="Card">

        <h2>Weather Prediction</h2>

        <form className="search-box" onSubmit={ onSubmit }>
            <input 
            type="text" 
            className='input' 
            placeholder="Enter the City... " 
            onChange={(e) => setCity(e.target.value)}
            />
            <button type="reset"></button>
            <button type='submit' className='search'>Search</button>
        </form>
    </div>
  )
}

