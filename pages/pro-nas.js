import Layout from "../src/components/Layout";

import client from '../src/components/ApolloClient';

import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";


import Head from "next/head"

import Telegram from "../public/vb.png"




export default function Home (props) {
	
	
	const imageUrl = Telegram;

	const handleDownload = () => {
	  const link = document.createElement('a');
	  link.href = imageUrl;
	  link.download = 'telegram.png';
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	};
	
	
	const { products,  heroCarousel, posts,productCategories,featuredproducts,productTags} = props || {};

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items:4 },
	};

	
	const items = [
	
		
	];
	
	
	
	 

	return (
		<>
	<Head>
    <title>Постільна білизна від виробника LUXTEX</title>
	<meta name="description" content="Купуючи постільну білизну від виробника LUXTEX Ви отримаєтте гарантію якості!Відчуйте наші розкішні тканини!"/>
	<meta name="google-site-verification" content="LA_Al_18WMz2mdVTjsYF-niapRhXBYZuK3_sNMSzLK0" />
	</Head>

			<Layout productTags={productTags}>
	<div className="main ">
				{/*Hero Carousel*/}
				<HeroCarousel heroCarousel={heroCarousel}/>
				
				
			
				{/*<a href="myfile.pdf"  download>Download</a>*/}
			
			
				    
			
			
			
			<div className="products container mx-auto px-4 my-10  ">
			<div class="single-entry-summary">                              
                                                        
<p>Шановні відвідувачі, компанія LUXTEX рада вітати вас на нашому офіційному сайті. Наше підприємство вже понад 20 років існує на ринку текстилю. </p>



<p className="mt-3">Спочатку це була невелика торгова фірма, яка згодом змогла перетворитися на велике виробничо-комерційне підприємство. З власними торговими, виробничими та складськими підрозділами.</p>



<p className="mt-3">Наша компанія випускає величезний асортимент продукції, різноманітність якого здатна задовольнити навіть найвибагливішого клієнта. У зручному, систематизованому каталозі компанії ви знайдете якісну та недорогу постільну білизну, виготовлену з натуральної та екологічно безпечної тканини, матраци, ковдри, рушники, покривала, пледи, подушки, товари для дітей. </p>



<p className="mt-3">Крім цього, лінійка товару включає і текстиль для готелів. Незалежно від того, який вас цікавить товар, ми впевнені, що вам припаде до душі і якість виробів, їх вартість та їх вибір.</p>



<p>Наш інтернет магазин LUXTEX є одним із підрозділів компанії-виробника, тому у нас дуже вигідно робити покупки – відсутність націнок, посередників тощо.</p>



<h3 className="text-xl mt-6">Чому робити покупки варто саме у нас?</h3>



<ul>
<li> - Ми пропонуємо лише той товар, який випускаємо самі, тому що ми повністю впевнені у його якості.</li>



<li> - Асортимент нашого магазину дуже великий, тож вибрати потрібний виріб зможе кожен клієнт!</li>



<li> - Оскільки ми є виробниками, ціна товару мінімальна і доступна для багатьох клієнтів.</li>



<li> - Ми гарантуємо оперативну, своєчасну доставку товару за вказаною адресою.</li>
	
<li>  - У нас працюють досвідчені та кваліфіковані консультанти, здатні допомогти з вибором і відповісти на всі запитання клієнта.</li>



<li> - Першокласне обслуговування гарантоване кожному клієнту.</li>



<li> - Каталог постійно оновлюється, тому всі мають можливість вибрати продукцію на свій смак.</li>
</ul>



<p className="mt-6">Різноманітність творчих дизайнів, приголомшливі вироби відмінної якості, виготовлені з кращих матеріалів за сучасними технологіями, акуратне пошиття – все це вигідно відрізняє постільну білизну та інші товари магазину LUXTEX від інших магазинів.</p>
                                                    </div>
				</div>
				</div>
				
				
			</Layout>
			</>
	)
};

export async function getStaticProps () {

	const { data } = await client.query( {
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	} );

	return {
		props: {
		questionsAnswers:data?.category?.posts?.nodes ? data.category.posts.nodes : [],
			postsCategory: data?.category ? data.category : [],
			news: data?.news?.posts?.nodes ? data.news.posts.nodes : [],
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			productTags: data?.productTags?.nodes ? data.productTags.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			featuredproducts: data?.featuredproducts?.nodes ? data.featuredproducts.nodes : [],
			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : []
		},
		revalidate: 1
	}

};
