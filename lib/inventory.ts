/**
 * Central Inventory & Stock Control Service
 */

export interface ProductStockInfo {
  stock: number;
  isOutOfStock: boolean;
  statusLabel: "In Stock" | "Low Stock" | "Out of Stock";
}

export function getSavedStockOverrides(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("dairy_cool_inventory_overrides");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getProductStockInfo(productId: string, defaultStock = 15): ProductStockInfo {
  const overrides = getSavedStockOverrides();
  const cleanId = (productId || "").trim();

  let currentStock = defaultStock;

  // Check if explicit override exists in localStorage
  if (typeof overrides[cleanId] === "number") {
    currentStock = overrides[cleanId];
  } else {
    // Also check alternate product ID variations (e.g. ghee_500ml vs bilona_ghee)
    for (const key of Object.keys(overrides)) {
      if (key.includes(cleanId) || cleanId.includes(key)) {
        currentStock = overrides[key];
        break;
      }
    }
  }

  const isOutOfStock = currentStock <= 0;
  const statusLabel = isOutOfStock
    ? "Out of Stock"
    : currentStock <= 5
    ? "Low Stock"
    : "In Stock";

  return {
    stock: currentStock,
    isOutOfStock,
    statusLabel,
  };
}
