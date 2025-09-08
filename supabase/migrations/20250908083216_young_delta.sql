/*
  # Create daily_briefs table

  1. New Tables
    - `daily_briefs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `date` (date, unique)
      - `meta` (jsonb) - Contains word_count, reading_time, generated_at
      - `impact_summary` (jsonb) - Contains policy_developments, international_updates, etc.
      - `primary_focus` (jsonb) - Main article with category, content, exam_relevance, etc.
      - `sections` (jsonb) - Array of sections with articles
      - `rapid_updates` (jsonb) - Array of rapid updates
      - `exam_intelligence` (jsonb) - Exam-focused insights
      - `knowledge_synthesis` (jsonb) - Cross-subject connections and analysis
      - `weekly_analysis` (jsonb, optional) - Weekly trends and analysis
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `daily_briefs` table
    - Add policy for public read access (anon users can read all briefs)
    - Add policy for service role to insert/update briefs (for webhook)

  3. Indexes
    - Index on date for efficient date-based queries
    - Index on created_at for chronological ordering
</sql>

CREATE TABLE IF NOT EXISTS daily_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date UNIQUE NOT NULL,
  meta jsonb NOT NULL DEFAULT '{}',
  impact_summary jsonb NOT NULL DEFAULT '{}',
  primary_focus jsonb NOT NULL DEFAULT '{}',
  sections jsonb NOT NULL DEFAULT '[]',
  rapid_updates jsonb NOT NULL DEFAULT '[]',
  exam_intelligence jsonb NOT NULL DEFAULT '{}',
  knowledge_synthesis jsonb NOT NULL DEFAULT '{}',
  weekly_analysis jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_daily_briefs_date ON daily_briefs(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_briefs_created_at ON daily_briefs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE daily_briefs ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can read briefs)
CREATE POLICY "Public read access for daily briefs"
  ON daily_briefs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy for service role to insert/update briefs (for webhook)
CREATE POLICY "Service role can insert and update briefs"
  ON daily_briefs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_daily_briefs_updated_at
  BEFORE UPDATE ON daily_briefs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();