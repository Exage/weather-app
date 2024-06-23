import { useEffect, useState } from 'react'

import './App.scss'

import { WeatherMain } from './components/WeatherMain'
import { Search } from './components/Search'
import { getWeather, getCityLocation, isEmpty } from './utils'
import { Favorites } from './components/Favorites'

const getDataFromLS = () => {
    return JSON.parse(localStorage.getItem('favoritesItems'))
}

function App() {

    const [favorites, setFavorites] = useState(getDataFromLS() || [])
    const [currentDataNumb, setCurrentDataNumb] = useState(JSON.parse(localStorage.getItem('currentItemNumb')) || 0)
    const [currentData, setCurrentData] = useState(getDataFromLS() && getDataFromLS().length > 0 ? getDataFromLS()[currentDataNumb] : {})
    const [activeItemId, setActiveItemId] = useState(null)
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

    useEffect(() => {
        localStorage.setItem('favoritesItems', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        if (favorites.some(obj => obj.id === currentData.id)) {
            const newData = favorites.map(item => item.id === currentData.id ? currentData : item)
            setFavorites(newData)
        }
        setActiveItemId(currentData.id)
    }, [currentData])

    return (
        <div className="App">

            <div 
                className="weatherapp__wrapper" 
                data-type={ isEmpty(currentData) ? '00d' : currentData.weather[0].icon }
            >
                <div className="container">

                    <Search 
                        getWeatherByLocation={getWeatherByLocation} 
                        getWeatherByCityName={getWeatherByCityName} 
                    />
                    <Favorites 
                        favorites={favorites}
                        setFavorites={setFavorites}

                        currentData={currentData}
                        setCurrentData={setCurrentData}
                        getWeatherByLocation={getWeatherByLocation}

                        activeItemId={activeItemId}
                    />
                    <WeatherMain 
                        loading={loading} 
                        weather={currentData}

                        favorites={favorites}
                        setFavorites={setFavorites} 
                    />
                
                </div>
            </div>

        </div>
    )
}

export default App
