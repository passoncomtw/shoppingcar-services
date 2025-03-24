-- -------------------------------------------------------------
-- 購物車應用資料庫升級 V0.9.0 至 V0.9.1
-- -------------------------------------------------------------

-- ===== 1. 用戶模組擴展 =====

-- 擴展現有 users 表
ALTER TABLE "public"."users"
    ADD COLUMN IF NOT EXISTS "email" varchar(100),
    ADD COLUMN IF NOT EXISTS "level" varchar(20) DEFAULT '一般會員',
    ADD COLUMN IF NOT EXISTS "status" varchar(20) DEFAULT '啟用中';

-- 創建用戶詳情表
CREATE TABLE IF NOT EXISTS "public"."user_details" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int4 NOT NULL REFERENCES "public"."users"("id"),
    "gender" varchar(10),
    "birth_date" date,
    "address" varchar(255),
    "last_login" timestamp,
    "avatar" varchar(255),
    "remark" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- ===== 2. 商家模組擴展 =====

-- 擴展現有 merchants 表
ALTER TABLE "public"."merchants"
    ADD COLUMN IF NOT EXISTS "category" varchar(50),
    ADD COLUMN IF NOT EXISTS "status" varchar(20) DEFAULT '啟用中';

-- 創建商家詳情表
CREATE TABLE IF NOT EXISTS "public"."merchant_details" (
    "id" SERIAL PRIMARY KEY,
    "merchant_id" int4 NOT NULL REFERENCES "public"."merchants"("id"),
    "address" varchar(255),
    "hours" varchar(100),
    "description" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建商家聯絡人表
CREATE TABLE IF NOT EXISTS "public"."merchant_contacts" (
    "id" SERIAL PRIMARY KEY,
    "merchant_id" int4 NOT NULL REFERENCES "public"."merchants"("id"),
    "contact_name" varchar(30),
    "contact_phone" varchar(30),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建商家支付表
CREATE TABLE IF NOT EXISTS "public"."merchant_payments" (
    "id" SERIAL PRIMARY KEY,
    "merchant_id" int4 NOT NULL REFERENCES "public"."merchants"("id"),
    "bank_name" varchar(50),
    "bank_branch" varchar(50),
    "bank_account" varchar(50),
    "account_name" varchar(50),
    "payment_methods" varchar(255),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建商家媒體表
CREATE TABLE IF NOT EXISTS "public"."merchant_media" (
    "id" SERIAL PRIMARY KEY,
    "merchant_id" int4 NOT NULL REFERENCES "public"."merchants"("id"),
    "logo" varchar(255),
    "banner" varchar(255),
    "facebook" varchar(255),
    "instagram" varchar(255),
    "website" varchar(255),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- ===== 3. 產品模組擴展 =====

-- 擴展現有 products 表
ALTER TABLE "public"."products"
    ADD COLUMN IF NOT EXISTS "sku" varchar(50),
    ADD COLUMN IF NOT EXISTS "sale_price" numeric(10,2),
    ADD COLUMN IF NOT EXISTS "status" varchar(20) DEFAULT '上架中';

-- 產品庫存欄位重命名 (避免破壞現有系統功能)
ALTER TABLE "public"."products"
    RENAME COLUMN "stock_amount" TO "stock";

-- 創建產品詳情表
CREATE TABLE IF NOT EXISTS "public"."product_details" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int4 NOT NULL REFERENCES "public"."products"("id"),
    "category" varchar(50),
    "brand" varchar(50),
    "specs" varchar(255),
    "tags" varchar(255),
    "cost" numeric(10,2),
    "stock_alert" int4 DEFAULT 10,
    "track_inventory" boolean DEFAULT TRUE,
    "short_description" varchar(255),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建產品SEO表
CREATE TABLE IF NOT EXISTS "public"."product_seo" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int4 NOT NULL REFERENCES "public"."products"("id"),
    "meta_title" varchar(255),
    "meta_description" varchar(255),
    "url_slug" varchar(255),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建產品圖片表
CREATE TABLE IF NOT EXISTS "public"."product_images" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int4 NOT NULL REFERENCES "public"."products"("id"),
    "main_image" varchar(255),
    "images" varchar(1000),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- ===== 4. 訂單模組擴展 =====

-- 擴展現有 orders 表
ALTER TABLE "public"."orders"
    ADD COLUMN IF NOT EXISTS "status" varchar(20) DEFAULT '待付款',
    ADD COLUMN IF NOT EXISTS "payment_status" varchar(20);

-- 重命名欄位
ALTER TABLE "public"."orders"
    RENAME COLUMN "is_paid" TO "payment_completed";

-- 創建訂單詳情表
CREATE TABLE IF NOT EXISTS "public"."order_details" (
    "id" SERIAL PRIMARY KEY,
    "order_id" uuid NOT NULL REFERENCES "public"."orders"("id"),
    "payment_method" varchar(50),
    "transaction_id" varchar(100),
    "payment_time" timestamp,
    "customer_note" text,
    "internal_note" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建訂單配送表
CREATE TABLE IF NOT EXISTS "public"."order_shipping" (
    "id" SERIAL PRIMARY KEY,
    "order_id" uuid NOT NULL REFERENCES "public"."orders"("id"),
    "shipping_name" varchar(30),
    "shipping_phone" varchar(30),
    "shipping_address" varchar(255),
    "shipping_method" varchar(50),
    "tracking_number" varchar(50),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 擴展order_items表
ALTER TABLE "public"."order_items"
    ADD COLUMN IF NOT EXISTS "price" numeric(10,2),
    ADD COLUMN IF NOT EXISTS "total" numeric(10,2);

-- 重命名order_items表中的數量欄位
ALTER TABLE "public"."order_items"
    RENAME COLUMN "amount" TO "quantity";

-- ===== 5. 購物車模組擴展 =====

-- 重命名shoppingcar_items表中的數量欄位
ALTER TABLE "public"."shoppingcar_items"
    RENAME COLUMN "amount" TO "quantity";

-- ===== 6. 統計模組創建 =====

-- 創建儀表板統計表
CREATE TABLE IF NOT EXISTS "public"."dashboard_stats" (
    "id" SERIAL PRIMARY KEY,
    "date" date NOT NULL,
    "orders_count" int4 DEFAULT 0,
    "revenue" numeric(10,2) DEFAULT 0,
    "new_users" int4 DEFAULT 0,
    "products_sold" int4 DEFAULT 0,
    "previous_day_orders" int4 DEFAULT 0,
    "previous_day_revenue" numeric(10,2) DEFAULT 0,
    "previous_day_new_users" int4 DEFAULT 0,
    "previous_day_products_sold" int4 DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建銷售趨勢表
CREATE TABLE IF NOT EXISTS "public"."sales_trends" (
    "id" SERIAL PRIMARY KEY,
    "date" date NOT NULL,
    "revenue" numeric(10,2) DEFAULT 0,
    "orders_count" int4 DEFAULT 0,
    "products_sold" int4 DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- 創建產品熱門度表
CREATE TABLE IF NOT EXISTS "public"."product_popularity" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int4 NOT NULL REFERENCES "public"."products"("id"),
    "merchant_id" int4 NOT NULL REFERENCES "public"."merchants"("id"),
    "sales_count" int4 DEFAULT 0,
    "revenue" numeric(10,2) DEFAULT 0,
    "period_start" date,
    "period_end" date,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp
);

-- ===== 7. 資料初始化 =====

-- 為現有用戶創建用戶詳情記錄
INSERT INTO "public"."user_details" ("user_id", "created_at")
SELECT "id", CURRENT_TIMESTAMP FROM "public"."users"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."user_details" WHERE "user_details"."user_id" = "users"."id"
);

-- 為現有商家創建商家詳情記錄
INSERT INTO "public"."merchant_details" ("merchant_id", "created_at")
SELECT "id", CURRENT_TIMESTAMP FROM "public"."merchants"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."merchant_details" WHERE "merchant_details"."merchant_id" = "merchants"."id"
);

-- 為現有產品創建產品詳情記錄
INSERT INTO "public"."product_details" ("product_id", "short_description", "created_at")
SELECT "id", "subtitle", CURRENT_TIMESTAMP FROM "public"."products"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."product_details" WHERE "product_details"."product_id" = "products"."id"
);

-- 為現有產品創建產品圖片記錄
INSERT INTO "public"."product_images" ("product_id", "created_at")
SELECT "id", CURRENT_TIMESTAMP FROM "public"."products"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."product_images" WHERE "product_images"."product_id" = "products"."id"
);

-- 為現有訂單創建訂單詳情記錄
INSERT INTO "public"."order_details" ("order_id", "created_at")
SELECT "id", CURRENT_TIMESTAMP FROM "public"."orders"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."order_details" WHERE "order_details"."order_id" = "orders"."id"
);

-- 為現有訂單創建訂單配送記錄
INSERT INTO "public"."order_shipping" ("order_id", "created_at")
SELECT "id", CURRENT_TIMESTAMP FROM "public"."orders"
WHERE NOT EXISTS (
    SELECT 1 FROM "public"."order_shipping" WHERE "order_shipping"."order_id" = "orders"."id"
);

-- 初始化統計數據
INSERT INTO "public"."dashboard_stats" ("date", "created_at")
VALUES (CURRENT_DATE, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- ===== 8. 建立索引 =====
CREATE INDEX IF NOT EXISTS idx_users_email ON "public"."users" ("email");
CREATE INDEX IF NOT EXISTS idx_users_level ON "public"."users" ("level");
CREATE INDEX IF NOT EXISTS idx_users_status ON "public"."users" ("status");

CREATE INDEX IF NOT EXISTS idx_merchants_category ON "public"."merchants" ("category");
CREATE INDEX IF NOT EXISTS idx_merchants_status ON "public"."merchants" ("status");

CREATE INDEX IF NOT EXISTS idx_products_merchant_id ON "public"."products" ("merchant_id");
CREATE INDEX IF NOT EXISTS idx_products_status ON "public"."products" ("status");
CREATE INDEX IF NOT EXISTS idx_products_sku ON "public"."products" ("sku");

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON "public"."orders" ("user_id");
CREATE INDEX IF NOT EXISTS idx_orders_status ON "public"."orders" ("status");
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON "public"."orders" ("created_at");

-- ===== 9. 後台管理員表擴展 =====
ALTER TABLE "public"."backend_users"
    ADD COLUMN IF NOT EXISTS "name" varchar(30),
    ADD COLUMN IF NOT EXISTS "email" varchar(100),
    ADD COLUMN IF NOT EXISTS "role" varchar(20) DEFAULT 'admin',
    ADD COLUMN IF NOT EXISTS "status" varchar(20) DEFAULT '啟用中';
    