import React from 'react'
import styles from './Favorites.module.scss'

export const FavoritesPlaceholder = ({ height }) => {
    return (
        <div 
            className={styles.FavoritesPlaceholderContainer}
            style={{ height: `${height}rem` }}
        >
            <div
                className={`weatherapp__block ${styles.FavoritesPlaceholder}`} 
            >
                No favorites
            </div>
        </div>
    )
}
