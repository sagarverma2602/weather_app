import {  useState } from 'react'
import Wapi from "../api.config"
import './App.css'
import search from './assets/icon/search.png'
function App() {
  const [city,setCity]=useState('Search')
  const [temp,setTemp]=useState('0°c')
  const [humidity,setHumidty]=useState('0%')
  const [wind,setWind]=useState('0 km/h')
  const [searchCity,setSearchCity]=useState('')
  const clickHandle=async ()=>{
    if (searchCity===''){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${Wapi}&units=metric`
    const res= await fetch(url)
    const data=await res.json()
    if (data.cod==404){
      alert("city not found")
      return 0

    }
    else{
      setCity(searchCity.toUpperCase())
      setTemp(Math.floor(data.main.temp)+"°c")
      setHumidty(data.main.humidity+'%')
      setWind(data.wind.speed+"km/h")
    }
  }

  return (
    <>
      <div className="container ">
        <div className='top-bar'>
        <input type='search' placeholder='Search' className='p-2 border ' value={searchCity} onChange={(e)=>{
          setSearchCity(e.target.value)
        }}
        onKeyUpCapture={event => {
          if (event.key === 'Enter') {
            clickHandle()
          }
        }}></input>

        <div className='search-icon' onClick={()=>clickHandle(searchCity)}>
          <img src={search} width={25} height={25} className='m-2'></img>
        </div>
        </div>
        <div className="weather-img">
        </div>
        <div className="weather-temp">{temp}</div>
        <div className="weather-location">{city}</div>
        <div className="data-container">
          <div className="element">
            <div className="data">
              <div className="humidity-percentage">{humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <div className="data">
              <div className="wind-speed">{wind}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
