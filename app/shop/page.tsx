import React from "react";
import ShopClient from "./shop-client";
import { getWooProducts } from "@/lib/woocommerce";

export default async function ShopPage() {
  const wpProducts = await getWooProducts();

  return <ShopClient wpProducts={wpProducts} />;
}
