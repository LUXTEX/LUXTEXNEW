import { isEmpty, isArray } from 'lodash';
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const HeroCarousel = ({ heroCarousel }) => {
    if (isEmpty(heroCarousel) || !isArray(heroCarousel)) {
        return null;
    }

    const autoPlay = true;
    const slideDuration = 2; // in seconds
    const activeIndexRef = useRef(0);
    const slideRef = useRef(0);
    const [slide, setSlide] = useState(0);
    const [restartSlide, setRestartSlide] = useState(0);

    const nextSlide = () => {
        if (heroCarousel.length === 1) {
            return null;
        }

        activeIndexRef.current = (activeIndexRef.current + 1) % heroCarousel.length;
        setSlide(activeIndexRef.current);
    };

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(nextSlide, slideDuration * 2000);
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className="banner banner_home_page relative m-auto slidervh slider-color">
            <div className="marquee font-playfair font-bold">
                <span>{heroCarousel[activeIndexRef.current]?.name}</span>
            </div>
            {heroCarousel.map((item, index) => {
                const isActive = activeIndexRef.current === index || heroCarousel.length === 1;
                const opacityClass = isActive ? 'opacity-100 transition duration-500 ease-in-out' : 'opacity-0 transition duration-500 ease-in-out';

                return (
                    <div
                        key={item?.id || index}
                        className={`${opacityClass} solid_corection banner-img-container absolute top-0 left-0 bottom-0 w-full slidervh overflow-hidden`}
                    >
                        <Image
                            className="h-full w-full object-cover"
                            alt={item?.name || 'Carousel image'}
                            src={item?.image?.sourceUrl}
                            srcSet={item?.image?.srcSet}
                            width={1000}
                            height={500}
                            priority={index === 0} // Приоритетная загрузка первого изображения
                            loading="eager" // Мгновенная загрузка активного изображе
                        />
                    </div>
                );
            })}

            <div className="banner-content pb-20 px-2 w-full absolute z-10 bottom-0 text-center">
                <h2 className="banner-content__title text-4xl md:text-6xl text-white font-playfair font-bold mb-3 p-6 rounded-lg">
                    {heroCarousel[activeIndexRef.current]?.name}
                </h2>
                <p className="banner-content__description text-2xl md:text-5xl text-white bg-yellov inline-block">
                    {heroCarousel[activeIndexRef.current]?.description}
                </p>
                <Link href={`/tag/${heroCarousel[activeIndexRef.current]?.slug}/`}>
                    <div className="banner-content__link block">
                        <button className="button-slider inset-shadow mt-6 py-4 px-20 lg:px-20 lg:py-5 rounded-lg uppercase">
                            В КАТАЛОГ
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HeroCarousel;
