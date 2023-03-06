
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Geolocation() {

    let UrlWeather = 'https://api.openweathermap.org/data/2.5/weather?appid=1a1876aee56fd2c4c84b70cfa615a9c4&lang=es'

    let cityUrl = '&q=' ;

    let UrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?appid=1a1876aee56fd2c4c84b70cfa615a9c4&lang=es'

const [currentLocation, setCurrentLocation] = useState({})
const [loading, setLoading] = useState(true)
const [weather, setWeather] = useState({})
const [forecast, setForecast] = useState({})
const [changeUnit, setChangeUnit] = useState(true)
const [location, setLocation] = useState(false)



//current location
    useEffect(() => {
        setLoading(true)
        axios.get('https://ipapi.co/json/')
        .then(response => {
            console.log(response.data)
            setCurrentLocation(response.data)
            //currentlocation.city
        }).catch((error) => {
            console.error(error)
            setLoading(false)
        })        
    }, [])

    useEffect(() => {
        if(currentLocation.city) {
            setLoading(true)
            //weather
            UrlWeather = UrlWeather + cityUrl + currentLocation.city
            axios.get(UrlWeather)
            .then(response => {
                console.log(response.data)
                setWeather(response.data)
                setLocation(true)
            }).catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }
    }, [currentLocation])

    useEffect(() => {
        if(currentLocation.city) {
            setLoading(true)
            //forecast
            UrlForecast = UrlForecast + cityUrl + currentLocation.city
            axios.get(UrlForecast)
            .then(response => {
            console.log(response.data)
            setForecast(response.data)
            setLocation(true)

            }).catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }
    }, [currentLocation])



    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = day + '/' + month + '/' + year;


    let url = "";
    let iconUrl = "";

    let iconUrl3 = "";
    let iconUrl6 = "";
    let iconUrl9 = "";

    let forecastDate3 = "";
    let forecastDate6 = "";
    let forecastDate9 = "";


if (location) {


     url = "http://openweathermap.org/img/w/";
     iconUrl = url + weather.weather?.[0].icon + ".png";
    
     iconUrl3 = url + forecast.list?.[1].weather[0].icon + ".png";
     iconUrl6 = url + forecast.list?.[2].weather[0].icon + ".png";
     iconUrl9 = url + forecast.list?.[3].weather[0].icon + ".png";



     forecastDate3 = forecast.list?.[1].dt_txt.substring(8, 10) + '/' + forecast.list?.[1].dt_txt.substring(5, 7) + '/' + forecast.list?.[1].dt_txt.substring(0, 4) + ' ' +  forecast.list?.[1].dt_txt.substring(11, 13);

     forecastDate6 = forecast.list?.[2].dt_txt.substring(8, 10) + '/' + forecast.list?.[2].dt_txt.substring(5, 7) + '/' + forecast.list?.[2].dt_txt.substring(0, 4) + ' ' +  forecast.list?.[2].dt_txt.substring(11, 13);

     forecastDate9 = forecast.list?.[3].dt_txt.substring(8, 10) + '/' + forecast.list?.[3].dt_txt.substring(5, 7) + '/' + forecast.list?.[3].dt_txt.substring(0, 4) + ' ' +  forecast.list?.[3].dt_txt.substring(11, 13);

}

  return (
    //<h2>Nada</h2>
    <div className="mt-0">
    { 
    location === true ? (

                 <div className="Container">
                        <div className="card mb-3 mx-auto bg-dark text-light">
                            <div className="row g-0">
                                <div className="col-md-4 weather-img">
                                    <h3 className="card-title">{weather.name}</h3>
                                    <p className="card-date">{date}</p>
                                    <h1 className="card-temp">
                                        {
                                        changeUnit ? (weather.main?.temp - 273.15).toFixed(1) + ' ' + 'ºC' : (weather.main?.temp * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF' 
                                        }
                                    </h1>
                                    <p className="card-desc"><img src={iconUrl} alt="icon"/> {weather.weather?.[0].description}</p>
                                    <img src="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid rounded-start h-100" alt="..."/>
                                </div>
                                <div className="col-md-8 body">
                                    <div className="card-body text-start mt-2">
                                        <h5 className="card-text">Temperatura máxima: { 
                                            changeUnit ? (weather.main?.temp_max - 273.15).toFixed(1) + ' ' + 'ºC' : (weather.main?.temp_max * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF' 
                                            }
                                        </h5>
                                        <h5 className="card-text">Temperatura mínima: {
                                            changeUnit ? (weather.main?.temp_min - 273.15).toFixed(1) + ' ' + 'ºC' : (weather.main?.temp_min * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF' 
                                            }
                                        </h5>
                                        <h5 className="card-text">Sensación térmica: {
                                        changeUnit ? (weather.main?.feels_like - 273.15).toFixed(1) + ' ' + 'ºC' : (weather.main?.feels_like * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF' 
                                        }
                                        </h5>
                                        <h5 className="card-text">Humedad: {weather.main?.humidity}%</h5>
                                        <h5 className="card-text">Velocidad del viento: {
                                        changeUnit ? weather?.wind?.speed + ' ' + 'm/s' : (weather?.wind?.speed * 3.6).toFixed(1) + ' ' + 'k/h'
                                        }
                                        </h5>

                                        <button className='convert'
                                            onClick={ () => 
                                                setChangeUnit(!changeUnit)
                                            }
                                        >Unit Convertion</button>

                                    </div>
                                    <hr/>

                                    <div className="row mt-4">
                                        <div className="col text-center">
                                            <p>{forecastDate3} h</p>
                                            <p className="description"><img src={iconUrl3} alt="icon"/>{forecast.list?.[1].weather[0].description}</p>
                                            <p className="temp">{
                                                changeUnit ? (forecast.list?.[1].main.temp - 273.15).toFixed(1) + ' ' + 'ºC' : (forecast.list?.[1].main.temp * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF'
                                            }
                                            </p>
                                        </div>
                                        <div className="col text-center">
                                            <p>{forecastDate6} h</p>
                                            <p className="description"><img src={iconUrl6} alt="icon"/>{forecast.list?.[2].weather[0].description}</p>
                                            <p className="temp">{
                                            changeUnit ? (forecast.list?.[2].main.temp - 273.15).toFixed(1) + ' ' + 'ºC' : (forecast.list?.[2].main.temp * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF'
                                            }
                                            </p>
                                        </div>
                                        <div className="col text-center">
                                            <p>{forecastDate9} h</p>
                                            <p className="description"><img src={iconUrl9} alt="icon"/>{forecast.list?.[3].weather[0].description}</p>
                                            <p className="temp">{
                                            changeUnit ? (forecast.list?.[3].main.temp - 273.15).toFixed(1) + ' ' + 'ºC' : (forecast.list?.[3].main.temp * 9/5 - 459.67).toFixed(1) + ' ' + 'ºF'
                                            }
                                            </p>
                                        </div>


                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>
    ) : (
      
        <h2>nada</h2>
    )
}
    </div>
    );
}
