import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
    console.error("Error reading server orders:", err);
    return [];
  }
}

function writeServerOrders(orders: any[]) {
  ensureOrdersFile();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing server orders:", err);
    return false;
  }
}

export async function GET() {
  const orders = readServerOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.id) {
      return NextResponse.json({ success: false, error: "Invalid order data" }, { status: 400 });
    }

    const currentOrders = readServerOrders();

    // Check if order already exists by ID
    const existingIndex = currentOrders.findIndex((o: any) => o.id.toUpperCase() === body.id.toUpperCase());

    if (existingIndex > -1) {
      currentOrders[existingIndex] = { ...currentOrders[existingIndex], ...body };
    } else {
      currentOrders.unshift(body);
    }

    writeServerOrders(currentOrders);

    return NextResponse.json({ success: true, message: "Order saved permanently to server database!", order: body });
  } catch (err: any) {
    console.error("Failed to save order to server:", err);
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

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

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

    return NextResponse.json({ success: true, message: `Status updated to ${newStatus}`, order: currentOrders[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
