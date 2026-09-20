-- SQL Schema for Class 2A16 Cloudflare D1 Database (lop2a16-db)

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  birthday TEXT NOT NULL,
  avatar TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS daily_notice (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  highlight TEXT NOT NULL,
  body TEXT NOT NULL,
  reminder TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homework (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  task TEXT NOT NULL,
  order_num INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS star_awards (
  id TEXT PRIMARY KEY,
  student_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  stars INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_reviews (
  id TEXT PRIMARY KEY,
  student_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  next TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_skills (
  student_id INTEGER NOT NULL,
  area_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  PRIMARY KEY (student_id, area_name)
);
