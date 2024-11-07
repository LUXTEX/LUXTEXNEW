import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_CATEGORI_QUERY = gql`query {
	productCategoryArkanaHome: productCategory(id: "dGVybToyOTY2") {
    children(first: 27) {
      nodes {
        id
        name
        slug
          image {
              sourceUrl
            }
        children(first: 27) {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  productChantarelleHome:    productCategory(id: "dGVybTozMTUy") {
    children(first: 20)  {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
        children(first: 20) {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  productNorelHome:  productCategory(id: "dGVybTozMDQw") {
    children(first: 35)  {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
        children(first: 35) {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  productMCCM:  productCategory(id: "dGVybTozMjE4") {
    children(first: 20)  {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
        children(first: 20)  {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  productDermaoxy:  productCategory(id: "dGVybTozMjEy") {
    children(first: 20)  {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
        children(first: 20)  {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
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
}`;

export default GET_CATEGORI_QUERY;
