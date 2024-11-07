import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import { POST_BY_SLUG_QUERY, POSTS_SLUGS } from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function Post(props) {
    const { post } = props;
    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row mx-3 md:mx-10 lg:mx-20 my-20">
                <div className="lg:w-2/4 order-first">
                    {post?.featuredImage?.node?.sourceUrl && (
                        <Image
                            className="object-cover w-full"
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title || 'Post Image'}
                            layout="responsive"
                            width={700}
                            height={400}
                        />
                    )}
                </div>
                <div className="lg:w-2/4 mt-6 lg:mt-0 lg:order-first">
                    <h4 className="products-main-title text-2xl lg:text-4xl lg:w-11/12 uppercase">{post?.title}</h4>
                    <div className="lg:w-4/5 mt-3 lg:text-lg text-gray-500">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}
                        ></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const { params: { slug } } = context;

    try {
        const { data } = await client.query({
            query: POST_BY_SLUG_QUERY,
            variables: { slug },
        });

        if (!data?.post) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                post: data.post,
            },
            revalidate: 1,
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    try {
        const { data } = await client.query({
            query: POSTS_SLUGS,
        });

        const pathsData = [];

        data?.posts?.nodes &&
            data.posts.nodes.forEach((post) => {
                if (!isEmpty(post?.slug)) {
                    pathsData.push({ params: { slug: post.slug } });
                }
            });

        return {
            paths: pathsData,
            fallback: true,
        };
    } catch (error) {
        console.error('Error generating paths:', error);
        return {
            paths: [],
            fallback: true,
        };
    }
}
