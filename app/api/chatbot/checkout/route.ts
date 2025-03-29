// app/api/chatbot/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    console.log('Received order:', order); // Server-side log
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const price = order.isFree ? 0 : Number(order.price) * 100;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: { name: order.eventTitle },
          },
          quantity: 1,
        },
      ],
      metadata: { eventId: String(order.eventId), buyerId: String(order.buyerId) },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to initiate checkout' }, { status: 500 });
  }
}