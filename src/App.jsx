import { useState, useEffect } from 'react'

import './App.scss'
import { WeatherMain } from './components/WeatherMain'
import { Search } from './components/Search'
import { getWeather, getCityLocation, isEmpty } from './utils'

function App() {

    const [currentData, setCurrentData] = useState({})
    const [loading, setLoading] = useState(false)

    const getWeatherByLocation = async (lat, lon) => {
        try {

            setLoading(true)
            const weatherData = await getWeather(lat, lon)

            setCurrentData(weatherData)

        } catch (error) {
            console.error('Error detected!', error)
        } finally {
            setLoading(false)
        }
    }

    const getWeatherByCityName = async (city) => {
        try {

            setLoading(true)

            const location = await getCityLocation(city)

            if (location) {
                
                const weatherData = await getWeather(location.lat, location.lon)
    
                setCurrentData(weatherData)

            } else {
                alert('Your city not found')
            }

        } catch (error) {
            console.error('Error detected!', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="App">

            <div className="weatherapp__wrapper" data-type={ isEmpty(currentData) ? '00d' : currentData.weather[0].icon }>
                <div className="container">

                    <Search getWeatherByLocation={getWeatherByLocation} getWeatherByCityName={getWeatherByCityName} />
                    <WeatherMain loading={loading} weather={currentData} />
                
                </div>
            </div>

        </div>
    )
}

export default App
