import Layout from "../src/components/Layout";
import ProductHome from "../src/components/ProductHomePage";
import client from '../src/components/ApolloClient';
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";

import Head from "next/head";
import Telegram from "../public/vb.png";

import Image from 'next/image';
import ParentCategoryBlock from "../src/components/category/category-block/ParentCategoryBlock";
import ParentTagBlock from "../src/components/category/category-block/ParentTagBlock";
import { useRef } from 'react';
export default function Home(props) {




	
    const imageUrl = Telegram;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'telegram.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const {
        images,
        products,
        heroCarousel,
        posts,
        productCategories,
        featuredproducts,
        productTags
    } = props || {};

    const containerRefCategories = useRef(null);
    const containerRefTags = useRef(null);

    const handleMouseDown = (e, ref) => {
        const container = ref.current;
        container.isDown = true;
        container.startX = e.pageX - container.offsetLeft;
        container.scrollLeftStart = container.scrollLeft;
    };

    const handleMouseLeave = (ref) => {
        const container = ref.current;
        container.isDown = false;
    };

    const handleMouseUp = (ref) => {
        const container = ref.current;
        container.isDown = false;
    };

    const handleMouseMove = (e, ref) => {
        const container = ref.current;
        if (!container.isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - container.startX) * 2;
        container.scrollLeft = container.scrollLeftStart - walk;
    };
 

    return (
        <>
            <Head>
                <title>Постільна білизна 100%-якість та гарантія LUXTEX </title>
                <meta name="description" content="Постільна білизна з гарантією якості від LUXTEX" />
                <meta name="google-site-verification" content="LA_Al_18WMz2mdVTjsYF-niapRhXBYZuK3_sNMSzLK0" />
            </Head>

            <Layout productTags={productTags} preloadImages={images}>
            
			{/*<HeroCarousel heroCarousel={heroCarousel} />*/}
                <div className="main container mx-auto">
                    {/* Hero Carousel */}
                   

                    {/* Description 
                    <div className="text-justify px-3 pt-20 pb-20 mt-20">
                        <h1 className="text-3xl  font-extrabold mb-10 leading-normal text-center uppercase">
                            Постільна білизна від виробника LUXTEX
                        </h1>
                        <p>
                            Якість сну напряму впливає на нашу якість життя, а <a href="/product-category/bedding-sets">постільна білизна</a> від LUXTEX допоможе покращити ваш сон. Ми є експертами в цій галузі понад 20 років і використовуємо лише власні тканини, тому відповідаємо за якість нашої продукції. Наші комплекти виготовлені з високоякісних матеріалів і з увагою до деталей. Перегляньте наші <a href="/collections">колекції постільної білизни</a>, щоб знайти комплект, який підходить саме вам.
                        </p>
                        <p>
                            Окрім естетичної складової, наша білизна має високі показники зносостійкості та зберігає форму після прання. Матеріали, які ми використовуємо, забезпечують комфортну температуру в ліжку протягом всієї ночі завдяки відповідній щільності тканини, що регулює теплообмін. Дізнайтеся більше про <a href="/about-us">нашу історію та стандарти якості</a>.
                        </p>
                    </div>

                    {/* Product Categories */}

					<div>
						<div> <h2 className="text-3xl  font-extrabold mb-10 leading-normal text-center uppercase">
                            Категорії постільної білизни
                        </h2>
					
                    
                    
                        <div ref={containerRefCategories}
                            className="overflow-x-auto overflow-y-hidden hide-scrollbar"
                            onMouseDown={(e) => handleMouseDown(e, containerRefCategories)}
                            onMouseLeave={() => handleMouseLeave(containerRefCategories)}
                            onMouseUp={() => handleMouseUp(containerRefCategories)}
                            onMouseMove={(e) => handleMouseMove(e, containerRefCategories)}
                            style={{ cursor: 'grab' }}>
                            <div className="flex">
                                {productCategories.length > 0 ? (
                                    productCategories
                                        .filter(category => ![
                                            "par-landing", "uncategorized", "vitamine-minerale", 
                                            "advertising-package", "offers", "biazi-pivtoraspalnyy", 
                                            "strayp-satyn-dvospalnyy", "biazi-dvospalnyy", "slide1"
                                        ].includes(category.slug))
                                        .map(category => <ParentCategoryBlock key={category.id || category.slug} category={category} />)
                                ) : (
                                    <p>No categories available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                  </div>
						<div>
                        {/* Sidebar and Products */}




					


                        <div className=" mx-auto my-20 flex flex-col lg:flex-row px-4">
                            
                            <div className="flex-grow">
                                <h2 className="products-main-title main-title mb-10 text-center text-3xl  font-extrabold uppercase">Популярні товари</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                                    {featuredproducts.length ? (
                                        featuredproducts.map(product => <ProductHome key={product.id} product={product} />)
                                    ) : ''}
                                </div>
                            </div>
                        </div>






						<div className="w-full    lg:mr-8 mb-20 mt-20">
                                <div className=" ">
                                    <h2 className="text-3xl  font-extrabold uppercase text-center mb-10">
                                        Розміри комплектів постільної білизни - підбір підковдри, наволочки та простирадла на резинці
                                    </h2>
                                    <div className="text-justify mb-10">
                                        <p>
                                            <strong>Постільна білизна</strong> від LUXTEX представлена в різних розмірах, що дає змогу підібрати оптимальний варіант для вашого ліжка: <strong>півтора, двоспальний, євро та сімейний</strong>. Ознайомтесь із таблицею розмірів нижче для зручності вибору відповідних розмірів підковдри, наволочки та простирадла. Детальні розміри доступні на сторінці кожного товару.
                                        </p>
                                    </div>
                                    <div ref={containerRefTags}
                            className="overflow-x-auto overflow-y-hidden hide-scrollbar"
                            onMouseDown={(e) => handleMouseDown(e, containerRefTags)}
                            onMouseLeave={() => handleMouseLeave(containerRefTags)}
                            onMouseUp={() => handleMouseUp(containerRefTags)}
                            onMouseMove={(e) => handleMouseMove(e, containerRefTags)}
                            style={{ cursor: 'grab' }}>
                            <div className="flex">
                                {productTags.length ? (
                                    productTags
                                        .filter(tag => !["navolochky-5070", "navolochky-7070"].includes(tag.slug))
                                        .map(category => <ParentTagBlock key={category.id || category.slug} category={category} />)
                                ) : ''}
                            </div>
                        </div>
                                    <h2 className="text-xl lg:text-2xl font-bold mb-10 mt-8">Таблиця розмірів</h2>
                                    <table className="size-full text-center border-1 border-gray-900" style={{ height: '171px', width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-400 text-pers">розмір</th>
                                                <th className="border border-gray-400 text-pers">підодіяльник</th>
                                                <th className="border border-gray-400 text-pers">простирадло</th>
                                                <th className="border border-gray-400 text-pers">наволочка</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-400 text-pers">полуторний</td>
                                                <td className="border border-gray-400 text-pers">150*210</td>
                                                <td className="border border-gray-400 text-pers">150*210</td>
                                                <td className="border border-gray-400 text-pers">70*70/50*70(1шт.)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-400 text-pers">двоспальний</td>
                                                <td className="border border-gray-400 text-pers">180*210</td>
                                                <td className="border border-gray-400 text-pers">200*220</td>
                                                <td className="border border-gray-400 text-pers">70*70/50*70(2шт.)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-400 text-pers">євростандарт</td>
                                                <td className="border border-gray-400 text-pers">200*220</td>
                                                <td className="border border-gray-400 text-pers">220*220</td>
                                                <td className="border border-gray-400 text-pers">70*70/50*70(2шт.)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-400 text-pers">сімейний</td>
                                                <td className="border border-gray-400 text-pers">150*210(2шт.)</td>
                                                <td className="border border-gray-400 text-pers">220*220</td>
                                                <td className="border border-gray-400 text-pers">70*70/50*70(2шт.)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>













                        <div className="products container mx-auto mt-20">
                            <h2 className="products-main-title main-title mb-5 text-3xl  text-center font-extrabold uppercase">
                                Приєднуйтеся до нашої Viber групи для ексклюзивних пропозицій та оновлень!
                            </h2>
                            <div className="flex justify-center items-center flex-col lg:flex-row">
                                <div className="w-full lg:w-6/12 m-3 relative">
                                    <p className="text-justify mb-3">
                                        <strong>Шановні любителі затишку та комфорту!</strong> Запрошуємо вас приєднатися до нашої Viber групи, де ви отримуватимете першими інформацію про нові колекції постільної білизни та текстилю, а також спеціальні акційні пропозиції!
                                        <br />
                                        Не пропустіть можливість бути в курсі всіх наших пропозицій та насолоджуватися комфортом разом з нами!
                                    </p>
                                    <div><strong>Приєднуйтеся за посиланням нижче:</strong></div>
                                    <a href="https://invite.viber.com/?g=Jzq36PUtHFBHc7yo6PwO9LwZE1xOid_3">
                                        <button className="button text-white px-5 py-5 mt-10 rounded-full w-full">
                                            Приєднатися <strong>Viber</strong>
                                        </button>
                                    </a>
                                </div>
                                <div onClick={handleDownload} className="w-full lg:w-6/12 m-3 relative">
                                    <Image alt="viber -luxtex" src={Telegram} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 mb-20">
                            <h2 className="text-3xl   font-extrabold uppercase text-center mb-10">
                                Тканини, які використовує виробник постільної білизни LUXTEX
                            </h2>
                            <div className="text-justify">
                                <p>
                                    Наша <a href="/product-category/bedding-sets">постільна білизна</a> виготовлена з різних тканин, таких як <a href="/product-category/postilna-bilyzna-ranfors">ранфорс</a>,
                                    <a href="/product-category/postilna-bilyzna-byazi">бязь</a> та
                                    <a href="/product-category/postilna-bilyzna-strayp-satyn">страйп сатин</a>.
                                    <br />
                                    <strong>Ранфорс</strong> – це гладка тканина з переплетенням тонкої нитки. Вона міцна, зносостійка та добре тримає колір після прання.
                                    <br />
                                    <strong>Бязь</strong> – це м'яка, гладка та приємна на дотик тканина, що добре пропускає повітря. Ідеальний вибір для людей з чутливою шкірою.
                                    <br />
                                    <strong>Страйп сатин</strong> – це тканина з глянцевим візерунком, який додає елегантності. Її щільне переплетення забезпечує високу міцність та зносостійкість.
                                </p>
                                <p>
                                    <br />
                                    <strong>Ми завжди на зв'язку з вами</strong> – наші оператори нададуть консультацію та допоможуть обрати потрібну білизну, а також нададуть додаткові фото та відео для вашої впевненості.
                                </p>
                                <p>
                                    Купуючи <a href="/product-category/ukrainian-textile">постільну білизну українського виробника</a> LUXTEX, ви можете бути впевнені у високій якості товару, що зробить ваш сон комфортним та здоровим.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export async function getStaticProps() {
    const { data } = await client.query({
        query: PRODUCTS_AND_CATEGORIES_QUERY,
    });

    // Соберите пути изображений
   

    return {
        props: {
            questionsAnswers: data?.category?.posts?.nodes || [],
            postsCategory: data?.category || [],
            news: data?.news?.posts?.nodes || [],
            productCategories: data?.productCategories?.nodes || [],
            productTags: data?.productTags?.nodes || [],
            products: data?.products?.nodes || [],
            featuredproducts: data?.featuredproducts?.nodes || [],
          
           
        },
        revalidate: 1,
    };
};





