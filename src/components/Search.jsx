import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { ReactSVG } from 'react-svg'
import searchIcon from '../assets/icons/magnify-icon.svg'

import styles from './Search.module.scss'

export const Search = ({ getWeatherByLocation, getWeatherByCityName }) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [focus, setFocus] = useState(false)

    const debouncedSearch = useRef(
        _.debounce(async (query) => {
            if (query.trim() !== '') {
                try {
                    const url = 'https://test-weather-ifxtbtdvj-exages-projects.vercel.app'
                    const result = await axios.get(`${url}/getCity?city=${query.replace(/\s/g, '').toLocaleLowerCase()}`)
                    setResults(result.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                setResults([])
            }
        }, 500)
    ).current

    useEffect(() => {
        debouncedSearch(search.replace(/\s/g, ''))
    }, [search])

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }

    const closeSearch = () => {
        setSearch('')
        setFocus(false)
        setResults([])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getWeatherByCityName(search.replace(/\s/g, '').toLocaleLowerCase())
        
        closeSearch()
    }

    const handleClick = async (index) => {
        const location = results[index].coord
        getWeatherByLocation(location.lat, location.lon)
        
        closeSearch()
    }

    const handleOverlayClick = () => {
        closeSearch()
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.search}>
                <div 
                    className={
                        `${styles.searchWrapper}${search.length > 0 ? ' ' + styles.searchWrapperOpen : ''}${focus ? ' ' + styles.searchWrapperFocus : ''}`
                    }
                >
                    <form onSubmit={handleSubmit}
                        className={styles.searchForm}
                    >
                        <ReactSVG src={searchIcon} className={`${styles.searchFormIcon}${focus ? ' ' + styles.searchFormIconFocus : ''}`} />
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}

                            onFocus={handleFocus}
                            onBlur={handleBlur}

                            placeholder='search city'

                            className={`weatherapp__block ${styles.searchFormInput}`}
                        />
                    </form>
                    <div 
                        className={styles.searchResults}
                        style={{
                            height: search.length > 0 ? `${results.length * 3.5}rem` : '0px',
                        }}
                    >
                        {results.map((item, key) => (
                            <button 
                                className={styles.searchResultsItem}
                                onClick={() => handleClick(key)}
                                key={key}
                            >
                                {item.name}, {item.country}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div
                onClick={handleOverlayClick} 
                className={`${styles.searchOverlay}${search.length > 0 ? ' ' + styles.searchOverlayFocus : ''}`}
            ></div>
        </div>
    )
}
