CREATE TABLE IF NOT EXISTS page_views (
  page_key TEXT PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('about', 'spss', 'post')),
  initial_count INTEGER NOT NULL CHECK (initial_count >= 0),
  view_count BIGINT NOT NULL CHECK (view_count >= initial_count),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS page_views_updated_at_idx
  ON page_views (updated_at DESC);
