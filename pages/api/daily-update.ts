import type { NextApiRequest, NextApiResponse } from 'next';
import { normalizePayload, validatePayload } from '@/utils/validation';
import { supabase, handleSupabaseError } from '@/utils/supabase';

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

    // Save to Supabase database
    const { error: dbError } = await supabase
      .from('daily_briefs')
      .upsert({
        title: normalized.title,
        date: normalized.date,
        meta: normalized.meta,
        impact_summary: normalized.impact_summary,
        primary_focus: normalized.primary_focus,
        sections: normalized.sections,
        rapid_updates: normalized.rapid_updates,
        exam_intelligence: normalized.exam_intelligence,
        knowledge_synthesis: normalized.knowledge_synthesis,
        weekly_analysis: normalized.weekly_analysis
      }, {
        onConflict: 'date'
      });

    if (dbError) {
      console.error('Database save error:', dbError);
      return res.status(500).json({
        success: false,
        message: `Database error: ${dbError.message}`
      });
    }

    console.log('Daily content saved to database successfully');

    res.status(200).json({
      success: true,
      message: 'Daily content saved to database successfully',
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