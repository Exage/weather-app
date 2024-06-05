import { useState } from 'react'

import './App.scss'
import { WeatherMain } from './components/WeatherMain'

const apiKey = '8dea2ffdec495e945e209a98d744ab5b'

function App() {
    
    const [currentCity, setCurrentCity] = useState('brest,by')
    const [weatherType, setWeatherType] = useState('')

    return (
        <div className="App">

            <div className="weatherapp__wrapper" data-type={weatherType ? weatherType : '00d'}>
                <div className="container">

                    <WeatherMain api={apiKey} currentCity={currentCity} setWeatherType={setWeatherType} />
                
                </div>
            </div>

        </div>
    )
}

export default App
