/**
 * Shared Order Store for Real-Time Tracking & Admin Order Management
 */
import { fetchWpOrderById } from "./woocommerce";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export type OrderStatus =
  | "Order Placed"
  | "Packed & Churned"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface StoredOrder {
  id: string; // e.g. "DC-M4JMF7"
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  pincode: string;
  state: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  step: number; // 1: Placed, 2: Packed, 3: Out for Delivery, 4: Delivered
  carrier: string;
  awbNumber: string;
  date: string;
  expectedDate: string;
  locationNote: string;
  timestamp: string;
}

const LOCAL_STORAGE_ORDERS_KEY = "dairy_cool_master_orders";

// Master order store starts empty for real customer orders
const SEED_ORDERS: StoredOrder[] = [];

export function getAllOrders(): StoredOrder[] {
  if (typeof window === "undefined") return SEED_ORDERS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load orders from storage:", err);
    return SEED_ORDERS;
  }
}

export function getOrderByIdSync(queryId: string): StoredOrder | null {
  if (!queryId) return null;
  const cleanQuery = queryId.trim().toUpperCase();
  const all = getAllOrders();

  const found = all.find(
    (o) =>
      o.id.toUpperCase() === cleanQuery ||
      o.orderNumber.toUpperCase() === cleanQuery ||
      o.customerPhone.includes(cleanQuery)
  );

  return found || null;
}

export async function getOrderByIdAsync(queryId: string): Promise<StoredOrder | null> {
  const local = getOrderByIdSync(queryId);
  if (local) return local;

  // Try fetching from WooCommerce WP Backend if ID contains numbers
  const numericMatch = queryId.replace(/[^0-9]/g, "");
  if (numericMatch) {
    try {
      const wpOrder = await fetchWpOrderById(numericMatch);
      if (wpOrder) {
        const mappedStatus = mapWpStatusToStoreStatus(wpOrder.status);
        const mapped: StoredOrder = {
          id: `DC-${wpOrder.databaseId || numericMatch}`,
          orderNumber: `DC-${wpOrder.databaseId || numericMatch}`,
          customerName: `${wpOrder.billing?.firstName || "Customer"} ${wpOrder.billing?.lastName || ""}`.trim(),
          customerPhone: wpOrder.billing?.phone || "N/A",
          customerEmail: wpOrder.billing?.email || "N/A",
          shippingAddress: wpOrder.shipping?.address1 || wpOrder.billing?.address1 || "Address provided at delivery",
          city: wpOrder.shipping?.city || wpOrder.billing?.city || "India",
          pincode: wpOrder.shipping?.postcode || wpOrder.billing?.postcode || "",
          state: wpOrder.shipping?.state || wpOrder.billing?.state || "",
          items: (wpOrder.lineItems?.nodes || []).map((li: any, idx: number) => ({
            id: String(idx),
            name: li.product?.node?.name || "Pure Bilona Ghee",
            quantity: li.quantity || 1,
            price: parseFloat(li.total) || 749,
            image: li.product?.node?.image?.sourceUrl || "/images/buffalo_ghee_single.png",
          })),
          totalAmount: parseFloat(wpOrder.total) || 749,
          paymentMethod: wpOrder.paymentMethodTitle || "Online Payment",
          status: mappedStatus.status,
          step: mappedStatus.step,
          carrier: "Express BlueDart",
          awbNumber: `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`,
          date: wpOrder.date ? new Date(wpOrder.date).toLocaleDateString("en-IN") : "Recent",
          expectedDate: "2-4 Business Days",
          locationNote: `Order status from WooCommerce: ${wpOrder.status || "Processing"}`,
          timestamp: wpOrder.date || new Date().toISOString(),
        };

        return mapped;
      }
    } catch {
      // Quiet fallback
    }
  }

  return null;
}

export function saveNewOrder(orderData: Omit<StoredOrder, "step" | "carrier" | "awbNumber" | "expectedDate" | "locationNote" | "timestamp">): StoredOrder {
  const all = getAllOrders();
  
  const stepMap: Record<OrderStatus, number> = {
    "Order Placed": 1,
    "Packed & Churned": 2,
    "Out for Delivery": 3,
    "Delivered": 4,
    "Cancelled": 0,
  };

  const newOrder: StoredOrder = {
    ...orderData,
    step: stepMap[orderData.status] || 1,
    carrier: "Express BlueDart",
    awbNumber: `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`,
    expectedDate: "Within 2-4 business days",
    locationNote: "Order confirmed & queued for churning",
    timestamp: new Date().toISOString(),
  };

  const updated = [newOrder, ...all];
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("dairycool_orders_updated"));
  }
  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  locationNote?: string
): StoredOrder | null {
  const all = getAllOrders();
  const index = all.findIndex(
    (o) => o.id.toUpperCase() === orderId.trim().toUpperCase()
  );

  if (index === -1) return null;

  const stepMap: Record<OrderStatus, number> = {
    "Order Placed": 1,
    "Packed & Churned": 2,
    "Out for Delivery": 3,
    "Delivered": 4,
    "Cancelled": 0,
  };

  const updatedOrder: StoredOrder = {
    ...all[index],
    status: newStatus,
    step: stepMap[newStatus],
    locationNote: locationNote || getDefaultLocationNote(newStatus),
  };

  all[index] = updatedOrder;

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("dairycool_orders_updated"));
  }

  return updatedOrder;
}

function getDefaultLocationNote(status: OrderStatus): string {
  switch (status) {
    case "Order Placed":
      return "Order confirmed by Dairy Cool Farm";
    case "Packed & Churned":
      return "Hand-churned and packed in transit-safe glass jar";
    case "Out for Delivery":
      return "Out for delivery with local courier agent";
    case "Delivered":
      return "Delivered successfully to customer address";
    case "Cancelled":
      return "Order cancelled";
    default:
      return "Status updated";
  }
}

function mapWpStatusToStoreStatus(wpStatus: string): { status: OrderStatus; step: number } {
  const lower = (wpStatus || "").toLowerCase();
  if (lower.includes("completed") || lower.includes("delivered")) {
    return { status: "Delivered", step: 4 };
  }
  if (lower.includes("shipping") || lower.includes("dispatched") || lower.includes("transit")) {
    return { status: "Out for Delivery", step: 3 };
  }
  if (lower.includes("processing") || lower.includes("packed")) {
    return { status: "Packed & Churned", step: 2 };
  }
  if (lower.includes("cancelled") || lower.includes("failed")) {
    return { status: "Cancelled", step: 0 };
  }
  return { status: "Order Placed", step: 1 };
}
