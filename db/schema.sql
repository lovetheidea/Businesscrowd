-- BusinessCrowd D1 database schema
-- Run: wrangler d1 execute businesscrowd-db --remote --file=db/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id                INTEGER  PRIMARY KEY AUTOINCREMENT,
  email             TEXT     UNIQUE NOT NULL,
  name              TEXT     NOT NULL,
  password_hash     TEXT     NOT NULL,
  business_name     TEXT,
  business_category TEXT,
  plan              TEXT     NOT NULL DEFAULT 'free',
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS slots (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slot_day    TEXT     NOT NULL,  -- e.g. 'Monday'
  slot_time   TEXT     NOT NULL,  -- e.g. '10am'
  slot_type   TEXT     NOT NULL DEFAULT 'standard',  -- 'standard' or 'bc_hour'
  week_start  DATE     NOT NULL,  -- ISO date of Monday that week
  booked_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email    ON users(email);
CREATE INDEX IF NOT EXISTS idx_slots_user_id  ON slots(user_id);
CREATE INDEX IF NOT EXISTS idx_slots_week     ON slots(week_start);
