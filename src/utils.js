const api = '8dea2ffdec495e945e209a98d744ab5b'

export const getCityLocation = async (city) => {
    try {
        const currentLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`

        const fetchData = await fetch(currentLocation)
        const data = await fetchData.json()

        if (data.length > 0) {
            const lat = data[0]['lat']
            const lon = data[0]['lon']

            return { lat, lon }
        }

        return null

    } catch (error) {
        console.error('Error detected!\n', error)
    }
}

export const getWeather = async (lat, lon) => {
    try {
        const currentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`

        const fetchData = await fetch(currentLocation)
        const data = await fetchData.json()

        return data

    } catch (error) {
        console.error('Error detected!\n', error)
    }
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 ? true : false
}