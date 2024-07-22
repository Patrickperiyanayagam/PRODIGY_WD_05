import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import './App.css';
export default function App() {

  useEffect(()=>{
    console.log('Use Effect')
    fetchweatherforecast()
  },[])

  const weatherImages = {
    "Partly Cloudy " : require("./Assessts/icons/cloud.png"),
    "Moderate rain" : require("./Assessts/icons/rain.png"),
    "Patchy rain possible" : require("./Assessts/icons/rain.png"),
    "Patchy rain nearby" : require("./Assessts/icons/rain.png"),
    "Sunny" : require("./Assessts/icons/storm.png"),
    "Clear" : require("./Assessts/icons/storm.png"),
    "Overcast" : require("./Assessts/icons/cloud.png"),
    "Cloudy" : require("./Assessts/icons/cloud.png"),
    "Light rain" : require("./Assessts/icons/rain.png"),
    "Moderate rain at times" : require("./Assessts/icons/rain.png"),
    "Heavy rain":require("./Assessts/icons/snow.png"),
    "Heavy rain at times":require("./Assessts/icons/snow.png"),
    "Moderate or heavy freezing rain":require("./Assessts/icons/rain.png"),
    "Moderate or heavy rain with thunder":require("./Assessts/icons/snow.png"),
    "Mist":require("./Assessts/icons/sun.png"),
    "other":require("./Assessts/icons/storm.png")
}
  const weatherbgimage = {
    "Partly Cloudy" : require("./Assessts/images/Cloudy.jpg"),
    "Moderate rain" : require("./Assessts/images/Rainy.jpg"),
    "Patchy rain possible" : require("./Assessts/images/Rainy.jpg"),
    "Patchy rain nearby" : require("./Assessts/images/Rainy.jpg"),
    "Sunny" : require("./Assessts/images/Sunny.jpg"),
    "Clear" : require("./Assessts/images/Clear.jpg"),
    "Overcast" : require("./Assessts/images/fog.png"),
    "Cloudy" : require("./Assessts/images/Cloudy.jpg"),
    "Light rain" : require("./Assessts/images/Rainy.jpg"),
    "Moderate rain at times" : require("./Assessts/images/Rainy.jpg"),
    "Heavy rain":require("./Assessts/images/Stormy.jpg"),
    "Heavy rain at times":require("./Assessts/images/Stormy.jpg"),
    "Moderate or heavy freezing rain":require("./Assessts/images/Stormy.jpg"),
    "Moderate or heavy rain with thunder":require("./Assessts/images/Stormy.jpg"),
    "Mist":require("./Assessts/images/snow.jpg"),
    "other":require("./Assessts/images/Clear.jpg")
}

  const [city,setcity] = useState('coimbatore')
  const [content,setcontent] = useState({})
  const [loading,setloading] = useState(false)

  const fetchweatherforecast = ()=> {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=2ae7404a6dd04b94a36120340240605&q=${city}&days=6&aqi=no&alerts=no`)
    .then(data=>{
      setcontent(data.data)
      setloading(true)
    })
    .catch(err=>alert(err))
  }
  const {current,location,forecast} = content
  return (
    <>
    {
      loading ? (
        <div className='body' style={{backgroundImage:`url(${weatherbgimage[current.condition.text]})`}}>
      <div className='top'>
        <h1>Weather Application</h1>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
          <input placeholder='Search' value={city} onChange={(e)=>{setcity(e.target.value)}}></input>
          <button className='searchbtn' onClick={fetchweatherforecast}>Search</button>
        </div>
      </div>
      <div className='report'>
        <div className='current'> 
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}> 
            <img src={current.condition.icon} width={150} height={150} alt='currentweatherimage'/>
            <p style={{fontSize:'45px',fontWeight:'bolder',fontFamily:'serif'}}>{current.temp_c}°C</p>
          </div>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px',flexDirection:'column'}}>
          <h1>Location:</h1>
          <h2>{location.name}</h2>
          <h2>{location.region}</h2>
          <h2>{location.country}</h2> 
          </div>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px',paddingTop:'10px'}}>
            <h1>Date : {forecast.forecastday[0].date}</h1>
          </div>
          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',gap:'30px'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'170px',height:'80px',backgroundColor:'blue',color:'white',fontWeight:'bold',borderRadius:'20px',flexDirection:'column'}}>
              <h2>Wind Speed</h2>
              <h2>{current.wind_kph} km/h</h2>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'170px',height:'80px',backgroundColor:'green',color:'white',fontWeight:'bold',borderRadius:'20px',flexDirection:'column'}}>
              <h2>Humidity</h2>
              <h2>{current.humidity} gm/m³</h2>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',gap:'30px'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'170px',height:'80px',backgroundColor:'gray',color:'white',fontWeight:'bold',borderRadius:'20px',flexDirection:'column'}}>
              <h2>Heat Index : </h2>
              <h2>{current.heatindex_c} °C</h2>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'170px',height:'80px',backgroundColor:'orange',color:'white',fontWeight:'bold',borderRadius:'20px',flexDirection:'column'}}>
              <h2>Pressure</h2>
              <h2>{current.pressure_mb} mb</h2>
            </div>
          </div>
        </div>
        <div className='nexthead'>
          {/* <h1 style={{paddingTop:'50px',fontSize:'40px'}}>Next 3 days Weather Forecast :</h1> */}
          <div className='next'>

          {
            content?.forecast?.forecastday?.map((item,index)=>{
              let date = new Date(item.date);
              let options = {weekday:'long'};
              let dayName = date.toLocaleDateString('en-US',options);
              dayName = dayName.split(',')[0];
              return(
                <div className='nextbox' key={index}>
                  <h1>{dayName}</h1>
                  <img src={weatherImages[item?.day?.condition?.text]}  width={100} height={100} alt='weatherimg'></img>
                  <h2>{item?.day?.condition?.text}</h2>
                  <h1>{item?.day?.avgtemp_c}°C</h1>
                </div>
              )
            }
          )
        }
        </div>
          </div>
          </div>
          </div>
      ) : 
      (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'90vh'}}>
          <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
        </div>
      )
    }
      
        </>
        )
}