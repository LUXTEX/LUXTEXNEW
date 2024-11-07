import ProductCategoryBlock from "./ParentCategoryBlock";

const ParentCategoriesBlock = ( props ) => {

	const { productCategorArkanaHome, productCategorArkanaProf, productCategori,productChantarelleHome ,productChantarelleProf,productNorelHome,productNorelProf,productMccmHome, productMccmProf,productDermaoxyHome,productDermaoxyProf} = props || {};

	return (
		<div className="product-categories grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
			{ productCategorArkanaProf ? 
				productCategorArkanaProf?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> ) 
				: productCategorArkanaHome ? productCategorArkanaHome?.map( ( productCategory, index ) => <div>{ productCategory.children?.nodes.map((pr, index) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ pr }/>)}</div> ) 
				: productChantarelleHome ? productChantarelleHome?.map( ( productCategory, index ) => <div>{ productCategory.children?.nodes.map((pr, index) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ pr }/>)}</div> ) 
				: productChantarelleProf ? productChantarelleProf?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
				: productNorelHome ? productNorelHome?.map( ( productCategory, index ) =>  productCategory.children?.nodes.map((pr, index) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ pr }/>) ) 
				: productNorelProf ? productNorelProf?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
				
				:  productMccmProf ?  productMccmProf?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
				: productDermaoxyHome ? productDermaoxyHome?.map( ( productCategory, index ) => <div>{ productCategory.children?.nodes.map((pr, index) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ pr }/>)}</div> )
				: productDermaoxyProf ? productDermaoxyProf?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
				: productCategori?.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
			 }

		</div>
	)

};

export default ParentCategoriesBlock;
