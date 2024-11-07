import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { isEmpty, isArray, throttle } from 'lodash';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = throttle(() => {
            setIsMobile(window.innerWidth <= 768);
        }, 200);

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const GalleryCarousel = ({ gallery }) => {
    if (isEmpty(gallery) || !isArray(gallery)) {
        return null;
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = useIsMobile();

    // Предварительная загрузка изображений
    useEffect(() => {
        gallery.forEach((item) => {
            const img = new window.Image(); // Используем window.Image
            img.src = item.mediaItemUrl; // Загружаем изображение
        });
    }, [gallery]);

    const handleNextImage = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    }, [gallery.length]);

    const handlePreviousImage = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
    }, [gallery.length]);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const handleTouchStart = (e) => {
        e.target.dataset.touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchStartX = parseFloat(e.target.dataset.touchStartX);
        const touchEndX = e.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 50) {
            handleNextImage();
        } else if (touchEndX - touchStartX > 50) {
            handlePreviousImage();
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {!isMobile && (
                <div className="thumbnails flex flex-col overflow-y-auto h-[100px] pr-2">
                    {gallery.map((item, index) => (
                        <div
                            key={item.id}
                            className={`thumbnail mb-2 cursor-pointer border-2 ${
                                activeIndex === index ? 'border-blue-500' : 'hover:border-black'
                            }`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <Image
                                src={item.mediaItemUrl}
                                alt={item.altText || item.title}
                                width={80}
                                height={80}
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={item.blurDataURL || gallery[activeIndex].mediaItemUrl}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div
                className={`main-image ml-0 md:ml-4 relative w-full h-96 lg:h-600 ${isMobile ? 'overflow-hidden' : ''}`}
                onTouchStart={isMobile ? handleTouchStart : null}
                onTouchEnd={isMobile ? handleTouchEnd : null}
            >
                {isMobile ? (
                    <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {gallery.map((item, index) => (
                            <div key={item.id} className="w-full h-96 lg:h-600 flex-shrink-0 relative">
                                <Image
                                    src={item.mediaItemUrl}
                                    alt={item.altText || item.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    loading={index === activeIndex ? 'eager' : 'lazy'}
                                    placeholder="blur"
                                    blurDataURL={item.blurDataURL || gallery[activeIndex].mediaItemUrl}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Image
                        src={gallery[activeIndex].mediaItemUrl}
                        alt="Main gallery image"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        placeholder="blur"
                        blurDataURL={gallery[activeIndex].blurDataURL || gallery[activeIndex].mediaItemUrl}
                    />
                )}

                {isMobile && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                        {activeIndex + 1}/{gallery.length}
                    </div>
                )}

                {!isMobile && (
                    <>
                        <button
                            onClick={handlePreviousImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2"
                        >
                            ◀
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2"
                        >
                            ▶
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default GalleryCarousel;






{/*import { useState, useEffect } from 'react';
import Image from 'next/image';
import { isEmpty, isArray } from 'lodash';

// Helper function to detect mobile view
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const GalleryCarousel = ({ gallery }) => {
    if (isEmpty(gallery) || !isArray(gallery)) {
        return null;
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Initial loading state
    const isMobile = useIsMobile();

    const handleNextImage = () => {
        setIsLoading(true); // Show loader when switching images
        setActiveIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    };

    const handlePreviousImage = () => {
        setIsLoading(true); // Show loader when switching images
        setActiveIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
    };

    // Swipe event handlers for mobile
    const handleTouchStart = (e) => {
        e.target.dataset.touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchStartX = parseFloat(e.target.dataset.touchStartX);
        const touchEndX = e.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 50) {
            // Swiped left
            handleNextImage();
        } else if (touchEndX - touchStartX > 50) {
            // Swiped right
            handlePreviousImage();
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {!isMobile && (
                <div className="thumbnails flex flex-col overflow-y-auto h-[100px] pr-2">
                    {gallery.map((item, index) => (
                        <div
                            key={item.id}
                            className={`thumbnail mb-2 cursor-pointer border-2 ${
                                activeIndex === index ? 'border-blue-500' : 'hover:border-black'
                            }`}
                            onMouseEnter={() => {
                                setIsLoading(true);
                                setActiveIndex(index);
                            }}
                        >
                            <Image
                                src={item.mediaItemUrl}
                                alt={item.altText || item.title}
                                width={80}
                                height={80}
                                objectFit="cover"
                                loading="lazy"
                                quality={10}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div
                className={`main-image ml-0 md:ml-4 relative w-full h-96 ${isMobile ? 'overflow-hidden' : ''}`}
                onTouchStart={isMobile ? handleTouchStart : null}
                onTouchEnd={isMobile ? handleTouchEnd : null}
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                        <img
                            src="https://aimg.kwcdn.com/upload_aimg/pic/2d341ad7-de86-44b8-bf6f-7b01af40f7c9.gif?imageView2/2/w/40/q/60"
                            alt="Loading..."
                            width={40}
                            height={40}
                        />
                    </div>
                )}

                <Image
                    src={gallery[activeIndex].mediaItemUrl}
                    alt="Main gallery image"
                    layout="fill"
                    objectFit="cover"
                    quality={10}
                    priority // Main image loads with priority
                    onLoadingComplete={() => setIsLoading(false)} // Hide loader when image is loaded
                />

        
                {isMobile && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                        {activeIndex + 1}/{gallery.length}
                    </div>
                )}

             
                {!isMobile && (
                    <>
                        <button
                            onClick={handlePreviousImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2"
                        >
                            ◀
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2"
                        >
                            ▶
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default GalleryCarousel;
 */}