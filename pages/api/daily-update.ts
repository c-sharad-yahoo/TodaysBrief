import type { NextApiRequest, NextApiResponse } from 'next';
import { normalizePayload, validatePayload } from '@/utils/validation';

interface WebhookResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Log the incoming webhook
    console.log('Webhook received at:', new Date().toISOString());
    console.log('Payload size:', JSON.stringify(req.body).length, 'bytes');

    // Validate and normalize the payload
    const normalized = normalizePayload(req.body);
    const validation = validatePayload(normalized);

    if (!validation.valid) {
      console.error('Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${validation.errors?.join(', ')}`
      });
    }

    // In a real implementation, you would:
    // 1. Store in database
    // 2. Update cache
    // 3. Trigger real-time updates to connected clients
    // 4. Generate sitemap and RSS
    // 5. Send notifications

    // For now, we'll simulate success
    console.log('Daily content updated successfully');

    res.status(200).json({
      success: true,
      message: 'Daily content updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}