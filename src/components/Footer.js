import {Facebook, Instagram, Twitter, Youtube} from "./icons";

const Footer = () => (
	<div className="footer bg-blue p-6 text-white">
		<div className="container mx-auto">
			<div className="md:grid  md:grid-cols-6 gap-4 font-thin">
				<div className="col-start-1 col-end-4 ">
					<h3 className="mt-5 text-xl text-white font-bold">Наш текстиль</h3>
					<div className=" flex mt-5 ">
						<div className="flex-1  " >
					     <p className="mb-3"><a href={`/category/${'postilna-bilyzna-z-byazi'}`}>З бязі</a></p>
					     <p className="mb-3"><a href={`/category/${'postilna-bilyzna-ranfors'}`}>З ранфорсу</a></p>
					     <p className="mb-3"><a href={`/category/${'postilna-bilyzna-strayp-satyn'}`}>З сатину</a></p>
						 </div>
						 <div className="flex-1 ">
					     <p className="mb-3"><a href={`/category/${'dytyacha-postilna-bilyzna'}`}>Дитячі</a></p>
					     <p className="mb-3"><a href={`/category/${'kovdry-ta-podushky'}`}>Текстиль </a></p>
					     
						 </div>
					</div>
			    </div>
				<div className="col-start-4 col-end-6 ">
					<h3 className="mt-5 text-xl text-white font-bold ">Контакти</h3>
					<div className="mt-5  ">
						<p>Mенеджер: +38 (066) 422 77 56 </p>
						<p>Mенеджер  +38 (050) 541 42 21 </p>
						<p>Магазин працює по всій територій України </p>
						<p>lluxtex@gmail.com</p>
					</div>
				</div>
				<div className="col-start-6 col-end-6">
				     <h3 className="mt-5 text-xl text-white font-bold">Ми в соц.мережах</h3>
				     <ul className="social-links flex  mt-5 ">
				        <li><a href="https://www.facebook.com/people/LUXTEX/100072393695293/?paipv=0&eav=AfaTbrMHcx2gMTM9umvKdlHb04uEA9ltzzh3m0uy6gY7Tf9B85eCjyJYzqTMIzXCabY&_rdr" className="" target="_blank"><Facebook/></a></li>
				        
				    
				        <li className="ml-2"><a href="https://www.instagram.com/luxtex_postil/" className="fa fa-instagram" target="_blank"><Instagram/></a></li>
			        </ul>
			   </div>
			</div>
			<div className="text-center pt-6">© Всі права захищені / розроблено PixelCraft Media Solutions</div>
		</div>
	</div>
);

export default Footer;
