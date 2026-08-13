/**
 * Headless WooCommerce / WPGraphQL Client for Next.js
 */

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://dairycoolfarm.com/graphql";

export async function fetchWooGraphQL(
  query: string,
  variables: Record<string, any> = {},
  sessionToken?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (sessionToken) {
    headers["woocommerce-session"] = `Session ${sessionToken}`;
  }

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
    });

    const json = await res.json();

    if (json.errors && process.env.NODE_ENV === "development") {
      // Quietly log only non-schema errors
      const isSchemaError = json.errors.some((e: any) => e.message?.includes("Cannot query field"));
      if (!isSchemaError) {
        console.warn("WooGraphQL Info:", json.errors);
      }
    }

    return json.data;
  } catch (error) {
    console.error("Failed to fetch from WooCommerce GraphQL:", error);
    return null;
  }
}

// GraphQL Queries for Products & Categories

export const GET_PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 20) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
          variations {
            nodes {
              id
              databaseId
              name
              price
              regularPrice
              stockStatus
            }
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT_QUERY = `
  query GetSingleProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
        variations {
          nodes {
            id
            databaseId
            name
            price
            regularPrice
            stockStatus
          }
        }
      }
    }
  }
`;

export const GET_POSTS_QUERY = `
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

// Helper functions for easy consumption in Server / Client components

export async function getWooProducts() {
  const data = await fetchWooGraphQL(GET_PRODUCTS_QUERY);
  return data?.products?.nodes || [];
}

export async function getSingleProduct(slug: string) {
  const data = await fetchWooGraphQL(GET_SINGLE_PRODUCT_QUERY, { id: slug });
  return data?.product || null;
}

export async function getWPPosts() {
  const data = await fetchWooGraphQL(GET_POSTS_QUERY);
  return data?.posts?.nodes || [];
}
