/**
 * Headless WooCommerce / WPGraphQL Client for Next.js
 */

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://dairycoolfarm.com/graphql";

export const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
export const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
export const WC_REST_ENDPOINT = "https://dairycoolfarm.com/wp-json/wc/v3";

function getWcAuthHeader() {
  const token = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");
  return `Basic ${token}`;
}

export async function fetchWooRestOrders(email?: string) {
  try {
    const url = email 
      ? `${WC_REST_ENDPOINT}/orders?search=${encodeURIComponent(email)}&per_page=50`
      : `${WC_REST_ENDPOINT}/orders?per_page=50`;
      
    const res = await fetch(url, {
      headers: {
        Authorization: getWcAuthHeader(),
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch Woo REST orders:", err);
    return [];
  }
}

export async function createWooRestOrder(orderPayload: any) {
  try {
    const res = await fetch(`${WC_REST_ENDPOINT}/orders`, {
      method: "POST",
      headers: {
        Authorization: getWcAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to create Woo REST order:", err);
    return null;
  }
}

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
      next: { revalidate: 30 },
    });

    const json = await res.json();

    if (json.errors && process.env.NODE_ENV === "development") {
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
          stockQuantity
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
          stockQuantity
          variations {
            nodes {
              id
              databaseId
              name
              price
              regularPrice
              stockStatus
              stockQuantity
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

export const GET_ORDER_BY_ID_QUERY = `
  query GetOrderById($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      orderNumber
      status
      date
      total
      paymentMethodTitle
      billing {
        firstName
        lastName
        email
        phone
        address1
        city
        state
        postcode
      }
      shipping {
        firstName
        lastName
        address1
        city
        state
        postcode
      }
      lineItems {
        nodes {
          product {
            node {
              name
              image {
                sourceUrl
              }
            }
          }
          quantity
          total
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

export const GET_ALL_ORDERS_QUERY = `
  query GetAllWooOrders {
    orders(first: 50) {
      nodes {
        id
        databaseId
        orderNumber
        date
        status
        total
        paymentMethodTitle
        billing {
          firstName
          lastName
          email
          phone
          address1
          city
          state
          postcode
        }
        shipping {
          firstName
          lastName
          address1
          city
          state
          postcode
        }
        lineItems {
          nodes {
            product {
              node {
                id
                name
                image {
                  sourceUrl
                }
              }
            }
            quantity
            total
          }
        }
      }
    }
  }
`;

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

export async function fetchWpOrderById(numericId: string) {
  if (!numericId) return null;
  const cleanId = numericId.replace(/[^0-9]/g, "");
  if (!cleanId) return null;

  try {
    const data = await fetchWooGraphQL(GET_ORDER_BY_ID_QUERY, { id: cleanId });
    return data?.order || null;
  } catch (err) {
    console.error("WP Order fetch error:", err);
    return null;
  }
}

export async function fetchAllWpOrders() {
  try {
    const data = await fetchWooGraphQL(GET_ALL_ORDERS_QUERY);
    return data?.orders?.nodes || [];
  } catch (err) {
    console.error("Failed to fetch all WP orders:", err);
    return [];
  }
}
