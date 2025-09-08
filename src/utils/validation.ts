import Ajv from 'ajv';
import type { DailyBrief } from '@/types';

const ajv = new Ajv({ coerceTypes: true, strict: false });

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    date: { type: 'string' },
    meta: {
      type: 'object',
      properties: {
        word_count: { type: ['number', 'string'] },
        reading_time: { type: 'string' },
        generated_at: { type: 'string' }
      }
    },
    impact_summary: {
      type: 'object',
      properties: {
        policy_developments: { type: ['number', 'string'] },
        international_updates: { type: ['number', 'string'] },
        economic_indicators: { type: ['number', 'string'] },
        scientific_advances: { type: ['number', 'string'] }
      }
    },
    primary_focus: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        category: { type: 'string' },
        summary: { type: 'string' },
        content: { type: 'string' },
        exam_relevance: { type: 'string' },
        multi_dimensional_impact: { type: 'string' },
        key_terms: { type: 'array', items: { type: 'string' } },
        historical_context: { type: 'string' },
        future_implications: { type: 'string' },
        citations: { type: 'array', items: { type: 'string' } }
      }
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          articles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                summary: { type: 'string' },
                key_terms: { type: 'array', items: { type: 'string' } },
                citations: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        }
      }
    },
    rapid_updates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          content: { type: 'string' },
          citations: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};

const validate = ajv.compile(schema);

export function normalizePayload(raw: any): DailyBrief {
  // Auto-cast string numbers to integers
  if (raw.meta?.word_count) {
    raw.meta.word_count = Number(raw.meta.word_count) || 0;
  }

  if (raw.impact_summary) {
    Object.keys(raw.impact_summary).forEach(key => {
      raw.impact_summary[key] = Number(raw.impact_summary[key]) || 0;
    });
  }

  // Ensure optional arrays exist
  raw.rapid_updates = raw.rapid_updates || [];
  raw.sections = raw.sections || [];

  // Sort sections by ID for consistent UI order
  raw.sections.sort((a: any, b: any) => a.id.localeCompare(b.id));

  // Ensure all articles have required arrays
  raw.sections.forEach((section: any) => {
    if (section.articles) {
      section.articles.forEach((article: any) => {
        article.key_terms = article.key_terms || [];
        article.citations = article.citations || [];
      });
    }
  });

  // Ensure primary focus has required arrays
  if (raw.primary_focus) {
    raw.primary_focus.key_terms = raw.primary_focus.key_terms || [];
    raw.primary_focus.citations = raw.primary_focus.citations || [];
  }

  return raw;
}

export function validatePayload(data: any): { valid: boolean; errors?: string[] } {
  const valid = validate(data);
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors?.map(err => `${err.instancePath} ${err.message}`) || ['Unknown validation error']
    };
  }

  return { valid: true };
}