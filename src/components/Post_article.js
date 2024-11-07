import Link from 'next/link';
import AddToCartButton from '../components/cart/AddToCartButton';
import Price from "./single-product/price";
import Image from "../image";
import {DEFAULT_PRODUCT_HOME_IMG_URL} from "../constants/urls";

const Post = ( props ) => {
	const { post,index } = props;

	return (
		

        index % 2 == 0   ? 
        <div className="flex flex-col lg:flex-row mx-3 md:mx-10 lg:mx-20 lg:flex    my-20">
                    	
        <div className="lg:w-2/4 mt-6 lg:mt-0 lg:order-first ">		
            <h4 className="products-main-title text-2xl lg:text-4xl lg:w-11/12 uppercase">{ post?.title }</h4>
            <p className="lg:w-4/5  mt-3 lg:text-lg text-gray-500 ">
               <div  dangerouslySetInnerHTML={ {
                           __html: post.excerpt
               } }></div>
            </p>
        </div>
        <div className="lg:w-2/4 order-first ">
        <Link href={ `/post/${ post?.id }`}  className="h-full">
        <img
        className="object-cover w-full"
        src={post?.featuredImage?.node.sourceUrl }
        />
        </Link>
        </div>
    </div> 
    
    
    :   
    
    
    
    <div className="flex flex-col lg:flex-row mx-3 md:mx-10 lg:mx-20 lg:flex    my-20">
                    	
    <div className="lg:w-2/4 mt-6 lg:mt-0 lg:order-last lg:ml-6">		
        <h4 className="products-main-title text-2xl lg:text-4xl lg:w-11/12 uppercase">{ post?.title }</h4>
        <p className="lg:w-4/5  mt-3 lg:text-lg text-gray-500 ">
           <div  dangerouslySetInnerHTML={ {
                       __html: post.excerpt
           } }></div>
        </p>
    </div>
    <div className="lg:w-2/4 order-first ">
    <Link href={ `/post/${ post?.id }`}  className="h-full">
        <img
        className="object-cover w-full"
        src={post?.featuredImage?.node.sourceUrl }
        />
        </Link>
    </div>
</div> 
				 
		
			);
		};
		
{/*		<div classNameName="product mb-5 text-center">


	<Link href={ `/post/${ post?.id }`} >
		<a>
			<Image
				classNameName="object-cover bg-gray-100"
				width="500"
				height="500"
				loading="lazy"
				sourceUrl={post?.featuredImage?.node.sourceUrl }
			/>
		</a>
	</Link>
	<div classNameName="product-info">
		<h3 classNameName="product-title mt-3 font-medium text-gray-800">
		{ post.title ? post.title : '' }
		</h3>
	<span classNameName="overflow" dangerouslySetInnerHTML={ {
									__html: post.excerpt,
								} }></span>
</div>
</div>*/}

export default Post;