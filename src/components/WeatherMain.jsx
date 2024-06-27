import React from 'react'
import { isEmpty } from '../utils'

import classes from './WeatherMain.module.scss'
import { ReactSVG } from 'react-svg'

import windIcon from '../assets/icons/wind.svg'
import cloudsIcon from '../assets/icons/clouds.svg'

import sunrise from '../assets/icons/sunrise.svg'
import sunset from '../assets/icons/sunset.svg'
import sun from '../assets/icons/sun.svg'
import moon from '../assets/icons/moon.svg'
import pin from '../assets/icons/pin.svg'


export const WeatherMain = ({ loading, weather, favorites, setFavorites }) => {
    
    const isFavorite = favorites.some(obj => obj.id === weather.id)
    
    const showText = (text, placeholder = '--') => loading ? placeholder : text

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

    const handlePinBtn = () => {
        if (favorites.some(obj => obj.id === weather.id)) {
            clearFavorites()
        } else {
            setFavorites([...favorites, weather])
        }
    }

    const clearFavorites = () => {
        const newFavorites = favorites.filter(item => weather.id !== item.id)
        setFavorites(newFavorites)
    }

    if (isEmpty(weather)) {
        return <h1 style={{ textAlign: 'center', marginTop: '5rem' }}>Placeholder</h1>
    }

    return (
        <div className={`${classes.weatherMain}`}>

            <div className={`weatherapp__block ${classes.headingBlock}`}>

                <div 
                    className={`${classes.headingBlockPin}${isFavorite ? ' ' + classes.headingBlockPinActive : ''}`} 
                    onClick={handlePinBtn}
                >
                    <button disabled={loading} className={classes.headingBlockPinIcon}>
                        <ReactSVG src={pin} />
                    </button>
                </div>

                <div className={`weatherapp__headingblock--icon`}></div>

                <div className={`weatherapp__block--regular ${classes.headingBlockSup}`}>
                    {showText(weather.weather[0].description)}
                </div>
                <h1 className={`weatherapp__block--title ${classes.headingBlockTitle}`}>
                    {showText(weather.name)}, {showText(weather.sys.country)}
                </h1>

                <div className={classes.headingBlockTempHL}>
                    <div className='weatherapp__block--title sm'>
                        <span className='yellow'>
                            L.
                            &nbsp;
                        </span>

                        {showText(weather.main.temp_min)}

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

                        {showText(weather.main.temp_max)}

                        <span className='yellow'>
                            &nbsp;
                            °
                        </span>
                    </div>
                </div>

                <div className={`weatherapp__block ${classes.headingBlockTemp}`}>
                    <div className={`weatherapp__block--title ${classes.headingBlockTempTitle}`}>
                        {showText(weather.main.temp)}
                    </div>
                </div>

            </div>

            <div className="weatherapp__block--row">
                <div className={`weatherapp__block ${classes.regBlock}`}>

                    <div className={classes.regBlockIcon}>

                        <ReactSVG src={windIcon} style={{
                            transform: `rotate(${showText(weather.wind.deg, 0)}deg)`
                        }} className='weatherapp__icon' />

                    </div>

                    <div>
                        <span className='weatherapp__block--title'>
                            {showText((weather.wind.speed * 3.6).toFixed(1))}
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
                            {showText(weather.clouds.all)}
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
                        {showText(convertTime(weather.sys.sunrise))}
                    </h1>
                </div>

                <div className={classes.sunBlockProgress}>
                    <div
                        className={`pbar ${classes.progressBar} ${classes.progressBarLeft}`}
                        style={{
                            width: `calc(${showText(calcSunPos(weather.sys.sunrise, weather.sys.sunset), 50)}% - 1.4rem)`
                        }}
                    ></div>

                    <div className={classes.progressBarMidWrapper} style={{
                        left: `${showText(calcSunPos(weather.sys.sunrise, weather.sys.sunset), 50)}%`
                    }}>
                        <div className={classes.progressBarMid}>
                            <div className={classes.progressBarMidTitle}>
                                {showText(convertTime(weather.dt), '--:--')}
                            </div>
                            <div className={classes.progressBarMidIcon}>
                                <ReactSVG src={sun} className='weatherapp__icon' />
                            </div>
                        </div>
                    </div>

                    <div className={`pbar ${classes.progressBar} ${classes.progressBarRight}`}
                        style={{
                            width: `calc(${showText((100 - calcSunPos(weather.sys.sunrise, weather.sys.sunset)), 50)}% - 1.4rem)`
                        }}
                    ></div>
                </div>

                <div className={classes.sunBlockFinish}>
                    <div className={classes.sunBlockFinishIcon}>
                        <ReactSVG src={sunset} className='weatherapp__icon' />
                    </div>
                    <h1 className={`weatherapp__block--title sm ${classes.sunBlockIconTitle}`}>
                        {showText(convertTime(weather.sys.sunset))}
                    </h1>
                </div>


            </div>

        </div>
    )
}
