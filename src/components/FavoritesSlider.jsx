import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import { FavoritesSlide } from './FavoritesSlide'

import styles from './Favorites.module.scss'

import 'swiper/scss'
import 'swiper/scss/pagination'
import './SwiperPagintaion.scss'

export const FavoritesSlider = ({ activeItemId, favorites, setFavorites, getWeatherByLocation }) => {

    if (favorites.length <= 3) {
        return (
            <div className={styles.FavoritesNoSlider}>
                {favorites.map((item, itemPos) => (
                    <FavoritesSlide 
                        getWeatherByLocation={getWeatherByLocation}
                        
                        key={item.id} 
                        item={item}

                        activeItemId={activeItemId}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                ))}
            </div>
        )
    }

    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{ clickable: true }}
        >

            {favorites.map((item, itemPos) =>
                <SwiperSlide key={item.id}>
                    <FavoritesSlide 
                        getWeatherByLocation={getWeatherByLocation}
                        item={item}
                        
                        activeItemId={activeItemId}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                </SwiperSlide>
            )}

        </Swiper>
    )
}
