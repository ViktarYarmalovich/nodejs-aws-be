CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	url_id text UNIQUE,
	title text NOT NULL,
	description text,
	weight integer,
	img text,
	creation_date date,
	price integer
);

CREATE TABLE stocks (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid,
	count integer,
	FOREIGN KEY ("product_id") REFERENCES "products" ("id") 
);
