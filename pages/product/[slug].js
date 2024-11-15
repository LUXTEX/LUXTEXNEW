import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS } from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Image from 'next/image';
import Star from "../../public/star.png";
import Head from "next/head";

export default function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{product.seo.title}</title>
        <meta name="description" content={product.seo.metaDesc} />
        <meta name="robots" content="index,follow" />
      </Head>

      {product && (
        <div className="single-product container mx-auto my-32 xl:px-0">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Product Images */}
            <div className="product-images relative -z-10">
              {!isEmpty(product?.galleryImages?.nodes) ? (
                <GalleryCarousel gallery={product?.galleryImages?.nodes} />
              ) : !isEmpty(product.image) ? (
                <Image
                  priority
                  src={product.image.sourceUrl}
                  alt="Product Image"
                  layout="responsive"
                  width={500}
                  height={300}
                  srcSet={product.image.srcSet}
                />
              ) : null}
            </div>

            {/* Product Info */}
            <div className="product-info px-4 mt-10 lg:mt-0">
              <h4 className="products-main-title text-2xl uppercase">{product.name}</h4>

              {/* Price Display */}
              {product.salePrice ? (
                <div className="block mt-4">
                  <strike className="text-red-200 text-2xl">{product.regularPrice}</strike>
                  <span className="ml-3 text-2xl bg-white rounded-full px-6 py-1 text-gray-500">{product.price}</span>
                </div>
              ) : (
                <div className="text-2xl">{product.price}</div>
              )}

              {/* Add to Cart and Rating */}
              <div className="mt-3 mb-10">
                <AddToCartButton className="mt-3" product={product} />
                <div className="pt-4">
                  <Image src={Star} height={100} width={100} className="rounded-lg" alt="Star Rating" />
                </div>
              </div>

              {/* Product Description */}
              <div
                className="singl_product_description mb-5 mt-3"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />

              <div className="border border-gray-200"></div>

              {/* SKU */}
              <div className="mt-3">
                <span>SKU:</span>
                <span className="text-gray-400">{product.sku}</span>
              </div>

              {/* Product Attributes */}
              {product.attributes?.nodes?.length > 0 && (
                <table className="mt-2 w-full">
                  <tbody>
                    {product.attributes.nodes.map((attribute, index) => (
                      <tr key={attribute?.id || index}>
                        <td className="py-2 px-4 bg-gray-200">{attribute.name}</td>
                        <td className="py-2 px-4">{attribute.options[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
  };
}