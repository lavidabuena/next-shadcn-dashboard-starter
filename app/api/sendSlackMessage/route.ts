// app/api/sendSlackMessage/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { IncomingWebhook } from '@slack/webhook';

const webhookUrl = process.env.SLACK_WEBHOOK_URL!;
const webhook = new IncomingWebhook(webhookUrl);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    await webhook.send({ text: message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message to Slack' },
      { status: 500 }
    );
  }
}
