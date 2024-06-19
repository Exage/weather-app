import React, { useState } from 'react'
import cityData from '../utils/city.list.json'

export const Search = ({ setCurrentCity }) => {

    const [inputText, setInputText] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = (Event) => {
        const searchWord = Event.target.value
        setInputText(searchWord)

        // const newFilter = cityData.filter(value => {
        //     return value.name.includes(searchWord)
        // }) 

        // setFilteredData(newFilter)
    }

    const submitSearch = (Event) => {
        Event.preventDefault()

        setInputText('')
        setCurrentCity(inputText)
    }

    return (
        <div style={{
            position: 'relative'
        }}>

            <form onSubmit={submitSearch}>
                <input 
                    type="text" 
                    
                    value={inputText} 
                    onChange={handleFilter}

                    style={{
                        width: '100%'
                    }}  
                />
            </form>
            {filteredData.length != 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    padding: '1rem',
                    width: '100%',
                    backgroundColor: '#fff',
                    zIndex: 100000
                }}>

                    {filteredData.map((item, key) => {
                        return (
                            <div key={key}>
                                {item}
                            </div>
                        )
                    })}

                </div>
            )}

        </div>
    )
}
