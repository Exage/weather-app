import React from 'react'
import styles from './Favorites.module.scss'
import { ReactSVG } from 'react-svg'

import closeIcon from '../assets/icons/xmark-solid.svg'

export const FavoritesSlide = ({ activeItemId, item, getWeatherByLocation, favorites, setFavorites }) => {


    const isActive = activeItemId === item.id

    const handleClick = () => {
        if (!isActive) {
            getWeatherByLocation(item.coord.lat, item.coord.lon)
        }
    }

    const handleDelete = (Event) => {
        Event.stopPropagation()
        const newArr = favorites.filter(obj => obj !== item)
        setFavorites(newArr)
    }
    
    return (
        <div 
            onClick={handleClick} 
            className={`weatherapp__block ${isActive ? styles.FavoritesBlock + ' ' + styles.FavoritesBlockActive : styles.FavoritesBlock }`}

            title={`${item.name}, ${item.sys.country}`}
        >
            <button className={styles.FavoritesBlockDelete} onClick={handleDelete}>
                <ReactSVG src={closeIcon} />
            </button>
            <div className={styles.FavoritesBlockTemp}>
                {item.main.temp}
                &nbsp;
                <span>
                    °
                </span>
            </div>
            <div className={styles.FavoritesBlockLocation}>
                <span className={styles.FavoritesBlockLocationCity}>{item.name}</span>
                &#44;&nbsp;
                <span className={styles.FavoritesBlockLocationCountry}>{item.sys.country}</span>
            </div>
        </div>
    )
}
