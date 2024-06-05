import React, { useState, useEffect } from 'react'

import classes from './WeatherMain.module.scss'
import { ReactSVG } from 'react-svg'

import windIcon from '../assets/icons/wind.svg'
import cloudsIcon from '../assets/icons/clouds.svg'

import sunrise from '../assets/icons/sunrise.svg'
import sunset from '../assets/icons/sunset.svg'
import sun from '../assets/icons/sun.svg'

import moon from '../assets/icons/moon.svg'

const sunrisetest = 1717466906
const sunsettest = 1717526225

export const WeatherMain = ({ api, currentCity, setWeatherType }) => {
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getCurrentLocation = async (city) => {
        try {
            const currentLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`
    
            const fetchData = await fetch(currentLocation)
            const data = await fetchData.json()
    
            const lat = data[0]['lat']
            const lon = data[0]['lon']
    
            return { lat, lon }
    
        } catch (error) {
            console.error('ПИЗДЕЦ!!!!!!!!\n', error)
            setError(error)
        }
    }
    
    const getWeather = async (lat, lon) => {
        try {
            const currentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`
    
            const fetchData = await fetch(currentLocation) 
            const data = await fetchData.json()
    
            return data
    
        } catch (error) {
            console.error('ПИЗДЕЦ!!!!!!!!\n', error)
            setError(error)
        }
    }

    const getData = async () => {
        try {

            setLoading(true)

            const location = await getCurrentLocation(currentCity)
            const weatherData = await getWeather(location.lat, location.lon)
    
            setWeather(weatherData)
            setWeatherType(weatherData.weather[0].icon)

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const convertTime = (unix_timestamp) => {

        const date = new Date(unix_timestamp * 1000)

        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

        const formattedTime = `${hours}:${minutes}` 

        return formattedTime
    }

    const calcSunPos = (start, end) => {
        const now = weather.dt;
        
        if (now < start || now > end) {
            // Ночь
            return now < start ? 50 : 100;
        }

        const a = end - start;
        const b = a - (end - now);
        const result = ((100 * b) / a);

        return result;
    }

    const setCurrentIcon = () => {
        const isDaytime = weather.dt >= weather.sys.sunrise && weather.dt <= weather.sys.sunset
        return isDaytime
    }

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    // if (!loading) {
    //     weather.sys.sunrise = 123
    //     weather.sys.sunset = 123
    // }

    return (
        <div 
            className={`${classes.weatherMain}`}

            style={{
                paddingTop: '10rem'
            }}
        >
    
            <div className={`weatherapp__block ${classes.headingBlock}`}>

                <div className={`weatherapp__headingblock--icon`}></div>

                <div className={`weatherapp__block--regular ${classes.headingBlockSup}`}>
                    {loading ? '--' : weather.weather[0].description}
                </div>
                <h1 className={`weatherapp__block--title ${classes.headingBlockTitle}`}>
                    {loading ? '--' : weather.name}, {loading ? '--' : weather.sys.country}
                </h1>

                <div className={classes.headingBlockTempHL}>
                    <div className='weatherapp__block--title sm'>
                        <span className='yellow'>
                            L.
                            &nbsp;
                        </span>

                        {loading ? '--' : weather.main.temp_min}

                        <span className='yellow'>
                            &nbsp;
                            °
                        </span>
                    </div>
                    <div className='weatherapp__block--title sm'>
                        <span className='yellow'>
                            H. 
                            &nbsp;
                        </span>

                        {loading ? '--' : weather.main.temp_max}

                        <span className='yellow'>
                            &nbsp;
                            °
                        </span>
                    </div>
                </div>

                <div className={`weatherapp__block ${classes.headingBlockTemp}`}>
                    <div className={`weatherapp__block--title ${classes.headingBlockTempTitle}`}>
                        {loading ? '--' : weather.main.temp}
                    </div>
                </div>

            </div>

            <div className="weatherapp__block--row">
                <div className={`weatherapp__block ${classes.regBlock}`}>
                    
                    <div className={classes.regBlockIcon}>
                        {/* <img src={windIcon} style={{
                            transform: `rotate(${loading ? 0 : weather.wind.deg}deg)`
                        }} /> */}

                        <ReactSVG src={windIcon} style={{
                            transform: `rotate(${loading ? 0 : weather.wind.deg}deg)`
                        }} className='weatherapp__icon' />

                    </div>

                    <div>
                        <span className='weatherapp__block--title'>
                            {loading ? '--' : (weather.wind.speed * 3.6).toFixed(1)} 
                        </span>
                        &nbsp;
                        <span className='weatherapp__block--regular'> 
                            KPH
                        </span>
                        
                    </div>

                </div>
                <div className={`weatherapp__block ${classes.regBlock}`}>
                    
                    <div className={classes.regBlockIcon}>
                        <ReactSVG src={cloudsIcon} className='weatherapp__icon' />
                    </div>

                    <div>
                        <span className='weatherapp__block--title'>
                            {loading ? '--' : weather.clouds.all} 
                        </span>
                        &nbsp;
                        <span className='weatherapp__block--regular'> 
                            %
                        </span>
                        
                    </div>

                </div>
            </div>

            <div className={`weatherapp__block ${classes.sunBlock}`}>
                    
                
                <div className={classes.sunBlockStart}>
                    <div className={classes.sunBlockStartIcon}>
                        <ReactSVG src={sunrise} className='weatherapp__icon' />
                    </div>
                    <h1 className={`weatherapp__block--title sm ${classes.sunBlockIconTitle}`}>
                        {loading ? '--' : convertTime(weather.sys.sunrise)}
                    </h1>
                </div>

                <div className={classes.sunBlockProgress}>
                    <div 
                        className={`pbar ${classes.progressBar} ${classes.progressBarLeft}`}
                        style={{
                            width: `calc(${loading ? 50 : calcSunPos(weather.sys.sunrise, weather.sys.sunset)}% - 1.4rem)`
                        }}
                    ></div>

                    <div className={classes.progressBarMidWrapper} style={{
                        left: `${loading ? 50 : calcSunPos(weather.sys.sunrise, weather.sys.sunset)}%`
                    }}>
                        <div className={classes.progressBarMid}>
                            <div className={classes.progressBarMidTitle}>
                                {loading ? '--' : convertTime(weather.dt)}
                            </div>
                            <div className={classes.progressBarMidIcon}>
                                {(
                                    setCurrentIcon 
                                    ? <ReactSVG src={moon} className='weatherapp__icon' />  
                                    : <ReactSVG src={sun} className='weatherapp__icon' />  
                                )}
                            </div>
                        </div>  
                    </div>

                    <div className={`pbar ${classes.progressBar} ${classes.progressBarRight}`}
                        style={{
                            width: `calc(${loading ? 50 : 100 - calcSunPos(weather.sys.sunrise, weather.sys.sunset)}% - 1.4rem)`
                        }}
                    ></div>
                </div>

                <div className={classes.sunBlockFinish}>
                    <div className={classes.sunBlockFinishIcon}>
                        <ReactSVG src={sunset} className='weatherapp__icon' />
                    </div>
                    <h1 className={`weatherapp__block--title sm ${classes.sunBlockIconTitle}`}>
                        {loading ? '--' : convertTime(weather.sys.sunset)}
                    </h1>
                </div>
                

            </div>
        
        </div>
    )
}
