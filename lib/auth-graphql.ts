/**
 * WPGraphQL Authentication & Customer Queries / Mutations
 */

import { fetchWooGraphQL } from "./woocommerce";

export const LOGIN_MUTATION = `
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        databaseId
        email
        firstName
        lastName
        username
      }
    }
  }
`;

export const REGISTER_CUSTOMER_MUTATION = `
  mutation RegisterCustomer(
    $email: String!
    $username: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    registerCustomer(
      input: {
        email: $email
        username: $username
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      customer {
        id
        databaseId
        email
        firstName
        lastName
        username
      }
    }
  }
`;

export const GET_CUSTOMER_ORDERS_QUERY = `
  query GetCustomerOrders($customerId: Int!) {
    orders(where: { customerId: $customerId }) {
      nodes {
        id
        databaseId
        orderNumber
        date
        status
        total
        shippingTotal
        discountTotal
        paymentMethodTitle
        shipping {
          firstName
          lastName
          address1
          city
          state
          postcode
          phone
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
  }
`;

export async function loginWooUser(username: string, password: string) {
  try {
    const data = await fetchWooGraphQL(LOGIN_MUTATION, { username, password });
    if (data?.login) {
      return { success: true, data: data.login };
    }
    return { success: false, fallback: true, error: "WP Auth plugin not installed" };
  } catch (error: any) {
    return { success: false, fallback: true, error: error.message || "Failed to authenticate" };
  }
}

export async function registerWooCustomer({
  email,
  username,
  password,
  firstName,
  lastName,
}: {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    const data = await fetchWooGraphQL(REGISTER_CUSTOMER_MUTATION, {
      email,
      username,
      password,
      firstName,
      lastName,
    });
    if (data?.registerCustomer?.customer) {
      return { success: true, customer: data.registerCustomer.customer };
    }
    return { success: false, fallback: true, error: "WP Customer Registration plugin not active" };
  } catch (error: any) {
    return { success: false, fallback: true, error: error.message || "Registration failed" };
  }
}
