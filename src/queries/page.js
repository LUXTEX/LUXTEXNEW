import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PAGE_QUERY = gql`query {
  heroCarousel: productCategories(where: {slug: "offers"}) {
    nodes {
      id
      children {
        nodes {
          id
          name
          slug
          databaseId
          description
          image {
            id
            sourceUrl
            srcSet
          }
        }
      }
    }
  }
 chantarelle : page(id: "cG9zdDoxMTIxNw==") {
    id
    slug
    title
    content
  }
  arkana : page(id: "cG9zdDoxMTIxOQ==") {
    id
    slug
    title
    content
  }

  norel : page(id: "cG9zdDoxMTIyMQ==") {
    id
    slug
    title
    content
  }

  contacts : page(id: "cG9zdDoxMTcxMg==") {
    id
    slug
    title
    content
  }

  mccm:page(id: "cG9zdDoxMTIyMw==") {
    id
    slug
    title
    content
  }
  dermaoxy:page(id: "cG9zdDoxMTIyNQ==") {
    id
    slug
    title
    content
  }



}
`;

export default PAGE_QUERY;