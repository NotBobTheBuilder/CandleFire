DROP TABLE IF EXISTS talks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS slots;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS talks_users;
DROP TABLE IF EXISTS slots_talks;

CREATE TABLE talks (
  id        INTEGER PRIMARY KEY,
  title,
  description,
  creator,
  speakers,
  room,
  slots
);

CREATE TABLE users (
  id        INTEGER PRIMARY KEY,
  name,
  talks
);

CREATE TABLE slots (
  id        INTEGER PRIMARY KEY,
  start,
  end
);

CREATE TABLE rooms (
  id        INTEGER PRIMARY KEY,
  name,
  facilities
);

CREATE TABLE talks_users (
  user_id,
  talk_id
);

CREATE TABLE slots_talks (
  slot_id,
  talk_id
);
