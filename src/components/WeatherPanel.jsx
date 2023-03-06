import { useState, useEffect }from 'react'
import SearchBar from './SearchBar'
import Card from './Card'


export default function WeatherPanel() {
    
    let UrlWeather = 'https://api.openweathermap.org/data/2.5/weather?appid=1a1876aee56fd2c4c84b70cfa615a9c4&lang=es'

    let cityUrl = '&q=';

    let UrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?appid=1a1876aee56fd2c4c84b70cfa615a9c4&lang=es'


    const [weather, setWeather] = useState({})
    const [forecast, setForecast] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [location, setLocation] = useState('')
    


    const getLocation = async (loc) => {
        setIsLoading(true);
        setLocation(loc);

        //weather
        UrlWeather = UrlWeather + cityUrl + loc

        await fetch(UrlWeather).then(response => {
            if(!response.ok) throw { response }
            return response.json();
        }).then((weatherData) => {
            console.log(weatherData)
            setWeather(weatherData)
        }).catch((error) => {
            console.error(error)
            setIsLoading(false)
            setIsShow(false)
        })

        //forecast
        UrlForecast = UrlForecast + cityUrl + loc;

        await fetch(UrlForecast)
        .then(response => {
            if(!response.ok) throw { response }
                return response.json();
        }).then((forecastData) => {
            console.log(forecastData)
            setForecast(forecastData)

            setIsLoading(false)
            setIsShow(true)

        }).catch((error) => {
            console.error(error)
            setIsLoading(false)
            setIsShow(false)
        })
    }
    

  return (
    <>
    
    <SearchBar
        newLocation = { getLocation }
    />

    <Card 
        showData = { isShow }
        loadingData = { isLoading }
        weather = { weather }
        forecast = { forecast }
    />

    </>
  )
}
