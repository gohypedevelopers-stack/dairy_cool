import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fetchWooRestOrders, createWooRestOrder } from "@/lib/woocommerce";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "server-orders.json");

function ensureOrdersFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function readServerOrders() {
  ensureOrdersFile();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local server orders:", err);
    return [];
  }
}

function writeServerOrders(orders: any[]) {
  ensureOrdersFile();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing local server orders:", err);
    return false;
  }
}

function mapWpStatus(st: string): { status: string; step: number } {
  const lower = (st || "").toLowerCase();
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

export async function GET() {
  const localOrders = readServerOrders();

  try {
    const wcRawOrders = await fetchWooRestOrders();
    if (Array.isArray(wcRawOrders) && wcRawOrders.length > 0) {
      const mappedWcOrders = wcRawOrders.map((o: any) => {
        const stInfo = mapWpStatus(o.status);
        const orderIdStr = `DC-${o.number || o.id}`;

        return {
          id: orderIdStr,
          orderNumber: orderIdStr,
          customerName: `${o.billing?.first_name || "Customer"} ${o.billing?.last_name || ""}`.trim(),
          customerPhone: o.billing?.phone || "N/A",
          customerEmail: o.billing?.email || "N/A",
          shippingAddress: o.shipping?.address_1 || o.billing?.address_1 || "Delivery address provided",
          city: o.shipping?.city || o.billing?.city || "India",
          pincode: o.shipping?.postcode || o.billing?.postcode || "",
          state: o.shipping?.state || o.billing?.state || "",
          items: (o.line_items || []).map((li: any, idx: number) => ({
            id: String(li.id || idx),
            name: li.name || "Pure Bilona Ghee",
            quantity: li.quantity || 1,
            price: parseFloat(li.total) || 749,
            image: li.image?.src || "/images/buffalo_ghee_single.png",
          })),
          totalAmount: parseFloat(o.total) || 749,
          paymentMethod: o.payment_method_title || o.payment_method || "Online Payment",
          status: stInfo.status,
          step: stInfo.step,
          carrier: "Express BlueDart",
          awbNumber: `AWB-${o.id}`,
          date: o.date_created ? new Date(o.date_created).toLocaleDateString("en-IN") : "Recent",
          expectedDate: "2-4 Business Days",
          locationNote: `WooCommerce Database status: ${o.status}`,
          timestamp: o.date_created || new Date().toISOString(),
        };
      });

      // Combine WooCommerce database orders with local checkout orders
      const map = new Map<string, any>();
      mappedWcOrders.forEach((o: any) => map.set(o.id.toUpperCase(), o));
      localOrders.forEach((o: any) => {
        if (!map.has(o.id.toUpperCase())) {
          map.set(o.id.toUpperCase(), o);
        }
      });

      const combined = Array.from(map.values());
      return NextResponse.json({ success: true, orders: combined });
    }
  } catch (err) {
    console.error("Failed to fetch WooCommerce orders:", err);
  }

  return NextResponse.json({ success: true, orders: localOrders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.id) {
      return NextResponse.json({ success: false, error: "Invalid order data" }, { status: 400 });
    }

    // 1. Write to local server database file
    const currentOrders = readServerOrders();
    const existingIndex = currentOrders.findIndex((o: any) => o.id.toUpperCase() === body.id.toUpperCase());

    if (existingIndex > -1) {
      currentOrders[existingIndex] = { ...currentOrders[existingIndex], ...body };
    } else {
      currentOrders.unshift(body);
    }
    writeServerOrders(currentOrders);

    // 2. Post directly to WooCommerce REST API to create genuine order in WordPress database
    try {
      const names = (body.customerName || "Customer").split(" ");
      const firstName = names[0] || "Customer";
      const lastName = names.slice(1).join(" ") || "";

      const wooPayload = {
        payment_method: body.paymentMethod?.toLowerCase().includes("cod") ? "cod" : "razorpay",
        payment_method_title: body.paymentMethod || "Online Payment",
        set_paid: !body.paymentMethod?.toLowerCase().includes("cod"),
        billing: {
          first_name: firstName,
          last_name: lastName,
          email: body.customerEmail || "customer@dairycoolfarm.com",
          phone: body.customerPhone || "9876543210",
          address_1: body.shippingAddress || "Main Street",
          city: body.city || "Noida",
          state: body.state || "UP",
          postcode: body.pincode || "201301",
          country: "IN",
        },
        shipping: {
          first_name: firstName,
          last_name: lastName,
          address_1: body.shippingAddress || "Main Street",
          city: body.city || "Noida",
          state: body.state || "UP",
          postcode: body.pincode || "201301",
          country: "IN",
        },
        line_items: (body.items || []).map((item: any) => ({
          product_id: 411, // Standard Bilona Ghee product ID
          quantity: item.quantity || 1,
        })),
      };

      const wooCreated = await createWooRestOrder(wooPayload);
      console.log("Successfully created order in WordPress database:", wooCreated?.id);
    } catch (wpErr) {
      console.error("WP Order Creation Error:", wpErr);
    }

    return NextResponse.json({ success: true, message: "Order saved to WooCommerce & server database!", order: body });
  } catch (err: any) {
    console.error("Failed to save order:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, newStatus, locationNote } = await req.json();
    if (!orderId || !newStatus) {
      return NextResponse.json({ success: false, error: "Order ID and newStatus required" }, { status: 400 });
    }

    const currentOrders = readServerOrders();
    const index = currentOrders.findIndex((o: any) => o.id.toUpperCase() === orderId.toUpperCase());

    if (index > -1) {
      const stepMap: Record<string, number> = {
        "Order Placed": 1,
        "Packed & Churned": 2,
        "Out for Delivery": 3,
        "Delivered": 4,
        "Cancelled": 0,
      };

      currentOrders[index].status = newStatus;
      currentOrders[index].step = stepMap[newStatus] || currentOrders[index].step || 1;
      if (locationNote) {
        currentOrders[index].locationNote = locationNote;
      }
      writeServerOrders(currentOrders);
    }

    return NextResponse.json({ success: true, message: `Status updated to ${newStatus}` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
