import React, { useEffect, useState } from 'react';
import { normalizePayload, validatePayload } from '../utils/validation';
import { supabase } from '../utils/supabase';

interface WebhookResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

export default function WebhookHandler() {
  const [response, setResponse] = useState<WebhookResponse | null>(null);

  useEffect(() => {
    // This component handles webhook requests in a Vite environment
    // In a real deployment, you'd use a proper API endpoint
    const handleWebhook = async (payload: any) => {
      try {
        console.log('Webhook received at:', new Date().toISOString());
        console.log('Payload size:', JSON.stringify(payload).length, 'bytes');

        const normalized = normalizePayload(payload);
        const validation = validatePayload(normalized);

        if (!validation.valid) {
          console.error('Validation failed:', validation.errors);
          setResponse({
            success: false,
            message: `Validation failed: ${validation.errors?.join(', ')}`
          });
          return;
        }

        if (!supabase) {
          console.error('Supabase not configured');
          setResponse({
            success: false,
            message: 'Database not configured'
          });
          return;
        }

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
          setResponse({
            success: false,
            message: `Database error: ${dbError.message}`
          });
          return;
        }

        console.log('Daily content saved to database successfully');
        setResponse({
          success: true,
          message: 'Daily content saved to database successfully',
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        console.error('Webhook processing error:', error);
        setResponse({
          success: false,
          message: 'Internal server error'
        });
      }
    };

    // For demonstration purposes - in production, this would be a proper API endpoint
    const urlParams = new URLSearchParams(window.location.search);
    const testPayload = urlParams.get('test');
    if (testPayload) {
      try {
        const payload = JSON.parse(decodeURIComponent(testPayload));
        handleWebhook(payload);
      } catch (error) {
        setResponse({
          success: false,
          message: 'Invalid test payload'
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook Handler</h2>
        
        {response ? (
          <div className={`p-4 rounded-lg ${response.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">{response.success ? 'Success' : 'Error'}</p>
            <p className="text-sm mt-1">{response.message}</p>
            {response.timestamp && (
              <p className="text-xs mt-2">Timestamp: {response.timestamp}</p>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Webhook endpoint ready</p>
            <p className="text-sm mt-2">POST requests will be processed here</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}