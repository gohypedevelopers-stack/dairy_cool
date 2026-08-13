import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    console.log(`[Newsletter Subscription] New Subscriber Registered: ${email}`);

    // Asynchronously send to backend without blocking response
    const wpEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://dairycoolfarm.com/graphql";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    fetch(wpEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation SubscribeNewsletter($email: String!) {
            subscribeNewsletter(input: { email: $email }) {
              status
            }
          }
        `,
        variables: { email },
      }),
      signal: controller.signal,
    }).catch(() => {
      // Ignore background timeout/error
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Welcome to the Dairy Cool family.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
