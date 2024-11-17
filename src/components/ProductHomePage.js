import Link from 'next/link';
import AddToCartButton from '../components/cart/AddToCartButton';
import Image from 'next/image';
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../constants/urls";
import { useState, useEffect } from 'react';

const Product = (props) => {
    const { product } = props;
    const texts = ['Супер ціна', 'black friday !', '-10%'];
    const [currentIndex, setCurrentIndex] = useState(0);
 

    useEffect(() => {
        if (texts.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [texts.length]);

  

    return (
        product && product.__typename !== 'GroupProduct' ? (
            <div className="product mb-5 relative bg-white rounded-sm overflow-hidden"> {/* Добавили overflow-hidden */}
              

                <Link href={`/product/${product?.slug}`}>
                    <div className="relative overflow-hidden group"> {/* Добавили overflow-hidden и group */}
                        <Image
                            className="object-cover bg-gray-100 lg:h-72 lg:w-72 h-52 w-52 transition-transform duration-300 ease-in-out transform group-hover:scale-110" // Добавили эффект увеличения
                            width={400} // Уменьшено для миниатюры
                            height={400}
                            quality={40} // Снижено качество для ускоренной загрузки
                            loading='lazy'
                            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                            src={product?.image?.sourceUrl ?? DEFAULT_PRODUCT_HOME_IMG_URL}
                            alt={product.name}
                        
                            placeholder="blur"
                            blurDataURL="/path/to/placeholder.jpg" // Используйте путь к размытой версии
                        />
                    </div>
                </Link>

                <div className="font-normal text-black text-lg">
                    {product.name.length > 38 ? `${product.name.slice(0, 38)}...` : product.name}
                </div>

                <div className="product-info flex justify-between mt-3">
                    {product?.salePrice ? (
                        <div className="mt-3 flex flex-col">
                            <strike className="text-red-200 text-xl">{product?.regularPrice}</strike>
                            <span className="text-2xl font-extrabold text-text_title">{product?.price}</span>
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-text_title">{product?.price}</div>
                    )}
                    <AddToCartButton product={product} />
                </div>

                <div className="ticker-container font-normal">
                    {texts.map((text, index) => {
                        let transformValue = 'translateY(0)';

                        if (index < currentIndex) {
                            transformValue = 'translateY(-36px)';
                        } else if (index > currentIndex) {
                            transformValue = 'translateY(18px)';
                        }

                        return (
                            <div
                                key={index}
                                className={`text-red-500 ticker-item ${index === currentIndex ? 'active' : ''}`}
                                style={{
                                    transform: transformValue,
                                    opacity: index === currentIndex ? 1 : 0,
                                    transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                                }}
                            >
                                {text}
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : (
            ''
        )
    );
};

export default Product;
