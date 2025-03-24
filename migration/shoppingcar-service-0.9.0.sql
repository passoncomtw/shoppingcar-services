-- -------------------------------------------------------------
-- TablePlus 6.4.2(600)
--
-- https://tableplus.com/
--
-- Database: shoppingcar_services
-- Generation Time: 2025-03-24 11:25:04.1910
-- -------------------------------------------------------------




DROP TABLE IF EXISTS "public"."backend_users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."backend_users" (
    "id" int4 NOT NULL,
    "account" varchar(30) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."merchants";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."merchants" (
    "id" int4 NOT NULL,
    "name" varchar(30) NOT NULL,
    "password" varchar(255) NOT NULL,
    "phone" varchar(30) NOT NULL,
    "email" varchar(30) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."order_items";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."order_items" (
    "id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "merchant_id" int4 NOT NULL,
    "order_id" uuid NOT NULL,
    "amount" int4 NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" int4 NOT NULL,
    "product_count" numeric DEFAULT 0,
    "total_amount" numeric DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    "is_paid" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."products";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL,
    "name" varchar(30) NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "description" varchar(255) DEFAULT NULL::character varying,
    "subtitle" varchar(255) DEFAULT NULL::character varying,
    "stock_amount" numeric(11,0) DEFAULT 0,
    "merchant_id" int4 NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."SequelizeMeta";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."SequelizeMeta" (
    "name" varchar(255) NOT NULL,
    PRIMARY KEY ("name")
);

DROP TABLE IF EXISTS "public"."shoppingcar_items";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."shoppingcar_items" (
    "id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "merchant_id" int4 NOT NULL,
    "shoppingcar_id" int4 NOT NULL,
    "amount" numeric NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."shoppingcars";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."shoppingcars" (
    "id" int4 NOT NULL,
    "user_id" int4 NOT NULL,
    "product_count" int4 NOT NULL,
    "total_amount" numeric(10,2) DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL,
    "name" varchar(30) NOT NULL,
    "password" varchar(255) NOT NULL,
    "phone" varchar(30) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

;


-- Indices
CREATE UNIQUE INDEX merchants_phone_key ON public.merchants USING btree (phone);
CREATE UNIQUE INDEX merchants_email_key ON public.merchants USING btree (email);
ALTER TABLE "public"."order_items" ADD FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id");
ALTER TABLE "public"."order_items" ADD FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");
ALTER TABLE "public"."order_items" ADD FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."products" ADD FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id");
ALTER TABLE "public"."shoppingcar_items" ADD FOREIGN KEY ("shoppingcar_id") REFERENCES "public"."shoppingcars"("id");
ALTER TABLE "public"."shoppingcar_items" ADD FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");
ALTER TABLE "public"."shoppingcar_items" ADD FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id");
ALTER TABLE "public"."shoppingcars" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
