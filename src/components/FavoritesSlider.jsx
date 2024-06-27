import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import { FavoritesSlide } from './FavoritesSlide'

import styles from './Favorites.module.scss'

import 'swiper/scss'
import 'swiper/scss/pagination'
import './SwiperPagintaion.scss'

export const FavoritesSlider = ({ activeItemId, favorites, setFavorites, getWeatherByLocation }) => {

    const [paginationDisplay, setPaginationDisplay] = useState('none')
    const [slidesPerView, setSlidesPerView] = useState(3)

    const updatePaginationDisplay = () => {
        if (window.innerWidth < 455) {
            setPaginationDisplay(favorites.length <= 1 ? 'none' : 'flex')
            setSlidesPerView(favorites.length <= 1 ? favorites.length : 1)
        } else if (window.innerWidth >= 455 && window.innerWidth < 650) {
            setPaginationDisplay(favorites.length <= 2 ? 'none' : 'flex')
            setSlidesPerView(favorites.length <= 2 ? favorites.length : 2)
        } else if (window.innerWidth >= 650) {
            setPaginationDisplay(favorites.length <= 3 ? 'none' : 'flex')
            setSlidesPerView(favorites.length <= 3 ? favorites.length : 3)
        }
    }

    useEffect(() => {
        updatePaginationDisplay()
        window.addEventListener('resize', updatePaginationDisplay)

        return () => {
            window.removeEventListener('resize', updatePaginationDisplay)
        }
    }, [favorites])

    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={slidesPerView}
            pagination={{
                clickable: true,
                el: `.swiper-pagination`
            }}
        >

            {favorites.map((item) =>
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

            <div className="swiper-pagination" style={{ 
                display: paginationDisplay
            }}></div>

        </Swiper>
    )
}