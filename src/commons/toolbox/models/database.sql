CREATE TABLE my_user(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  created_by_user_id INTEGER,
  deleted_by_user_id INTEGER,
  updated_by_user_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT Now(),
  deleted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  role VARCHAR DEFAULT 'STUDENT',
  status BOOLEAN DEFAULT TRUE,
  token VARCHAR,
  meta json
);

CREATE TABLE author(
author_id SERIAL PRIMARY KEY,
author_name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
created_by_user_id INTEGER,
deleted_by_user_id INTEGER,
updated_by_user_id INTEGER,
created_at TIMESTAMPTZ DEFAULT Now(),
deleted_at TIMESTAMPTZ,
updated_at TIMESTAMPTZ,
status BOOLEAN DEFAULT TRUE,
meta json
);

CREATE TABLE publisher(
  publisher_id SERIAL PRIMARY KEY,
publisher_name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
created_by_user_id INTEGER,
deleted_by_user_id INTEGER,
updated_by_user_id INTEGER,
created_at TIMESTAMPTZ DEFAULT Now(),
deleted_at TIMESTAMPTZ,
updated_at TIMESTAMPTZ,
status BOOLEAN DEFAULT TRUE,
meta json
);

CREATE TABLE category(
  category_id SERIAL PRIMARY KEY,
category_name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
created_by_user_id INTEGER,
deleted_by_user_id INTEGER,
updated_by_user_id INTEGER,
created_at TIMESTAMPTZ DEFAULT Now(),
deleted_at TIMESTAMPTZ,
updated_at TIMESTAMPTZ,
status BOOLEAN DEFAULT TRUE,
meta json
);


CREATE TABLE book(
book_id SERIAL PRIMARY KEY,
book_name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
author_id INTEGER REFERENCES author (author_id),
category_id INTEGER REFERENCES category (category_id),
publisher_id INTEGER REFERENCES publisher (publisher_id),
created_by_user_id INTEGER,
deleted_by_user_id INTEGER,
updated_by_user_id INTEGER,
created_at TIMESTAMPTZ DEFAULT Now(),
deleted_at TIMESTAMPTZ,
updated_at TIMESTAMPTZ,
status BOOLEAN DEFAULT TRUE,
meta json
);

CREATE TABLE rentals(
book_id INTEGER REFERENCES book (book_id),
user_id INTEGER REFERENCES my_user (user_id),
rental_no SERIAL PRIMARY KEY,
rented_at TIMESTAMPTZ,
returned_at TIMESTAMPTZ,
requested_at TIMESTAMPTZ DEFAULT Now(),
cancelled_at TIMESTAMPTZ,
rejected_at TIMESTAMPTZ,
status BOOLEAN DEFAULT TRUE,
rental_status VARCHAR DEFAULT 'REQUESTED',
meta json
);