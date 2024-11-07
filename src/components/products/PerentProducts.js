import ProductBlock from "./PerentProductBlock";

const ParentProductBlock = ( props ) => {

	const { products } = props || {};

	return (
        <div className="products container mx-auto my-10 ">
					<h2 className="products-main-title main-title mb-5 text-3xl text-center uppercase"><span className="main-title-inner">Новинки</span></h2>
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
						
			{  products?.map( ( product, index ) => <ProductBlock key={ product?.id ?? index }  product={ product }/> )
			 }
</div>
		</div>
	)

};

export default ParentProductBlock;