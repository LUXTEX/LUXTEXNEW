import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql` query Product($slug: ID!) {
	product(id: $slug, idType: SLUG) {
	  id
	  productId: databaseId
	  averageRating
	  slug
	  description
	  shortDescription
	  sku
	  attributes(first: 10) {
		nodes {
		  name
		  options
		}
	  }
	  seo {
		title
		metaDesc
	  }
	  galleryImages {
          nodes {
            id
            title
            altText
            mediaItemUrl
          }
      }
	  image {
		id
		uri
		title
		srcSet
		sourceUrl
	  }
	  name
	  ... on SimpleProduct {
		price
		id
		regularPrice
		salePrice
		featured 
	  }
	  ... on VariableProduct {
		price
		id
		regularPrice
		salePrice
		featured 
	  }
	  ... on ExternalProduct {
		price
		id
		regularPrice
		salePrice
		externalUrl
		featured 
	  }
	  ... on GroupProduct {
		products {
		  nodes {
			... on SimpleProduct {
			  id
			  price
			  regularPrice
			  salePrice
			  featured 
			}
		  }
		}
		id
	  }
	}
  }
`;

export const PRODUCT_SLUGS = gql` query Products {
  products(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;
export const POST_BY_SLUG_QUERY = gql` query Post($slug: ID!) {
	post(id: $slug) {
        id
        title
        slug 
		content
		featuredImage {
			node {
			  sourceUrl
			}
		  }
  }
  
}
`;

export const POSTS_SLUGS = gql` query Posts {
	posts {
		nodes {
		  id
		  slug
		  
		}
	  }
}
`;  