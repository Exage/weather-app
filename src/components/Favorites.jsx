import React from 'react'
import { FavoritesPlaceholder } from './FavoritesPlaceholder'
import { FavoritesSlider } from './FavoritesSlider'
import { FavoritesSlide } from './FavoritesSlide'

import styles from './Favorites.module.scss'

export const Favorites = ({ activeItemId, favorites, setFavorites, currentData, setCurrentData, getWeatherByLocation }) => {

    const favoritesHeight = 12

    if (favorites.length === 0) {
        return <FavoritesPlaceholder height={favoritesHeight} />
    }

    return (
        <div
            className={styles.FavoritesContainer}
            style={{ height: `${favoritesHeight}rem` }}
        >
            <div className={styles.Favorites}>
                <FavoritesSlider 
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                    
                    favorites={favorites}
                    setFavorites={setFavorites}

                    getWeatherByLocation={getWeatherByLocation} 

                    activeItemId={activeItemId}
                />
            </div>
        </div>
    )
}
