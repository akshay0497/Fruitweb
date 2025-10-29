/*
  # Fruit Industry Service Management System - Complete Schema

  ## Overview
  This migration creates a comprehensive database schema for a fruit industry service
  management system, including master data, inventory, payments, orders, and reporting.

  ## 1. Master Tables
  
  ### baskets
  - `id` (uuid, primary key)
  - `basket_name` (text, required, unique)
  - `quantity` (integer, required, positive only)
  - `weight` (decimal, required, positive, supports lbs/kg)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### fruits
  - `id` (uuid, primary key)
  - `fruit_name` (text, required)
  - `image_url` (text, nullable)
  - `price` (decimal, required, USD with 2 decimals)
  - `description` (text, max 300 chars)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### decorations
  - `id` (uuid, primary key)
  - `decoration_name` (text, required)
  - `decoration_type` (text, required - Ribbon, Paper Wrap, Floral, Custom)
  - `price` (decimal, required, USD with 2 decimals)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 2. Inventory Management Tables

  ### purchase_orders
  - `id` (uuid, primary key)
  - `po_number` (text, unique, required)
  - `po_date` (date, required)
  - `fruit_id` (uuid, foreign key to fruits)
  - `price` (decimal, required, positive)
  - `gst_percent` (decimal, 0-100 range)
  - `supplier_info` (text, optional)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### sales_invoices
  - `id` (uuid, primary key)
  - `si_number` (text, unique, required, auto-generated)
  - `si_date` (date, required)
  - `fruit_id` (uuid, foreign key to fruits)
  - `price` (decimal, required, positive)
  - `gst_percent` (decimal, 0-100 range)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 3. Payment Management Tables

  ### payments
  - `id` (uuid, primary key)
  - `customer_name` (text, required)
  - `status` (text, required - Success, Failure, Declined)
  - `remark` (text, optional)
  - `amount` (decimal, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### refunds
  - `id` (uuid, primary key)
  - `payment_id` (uuid, foreign key to payments, optional)
  - `customer_name` (text, required)
  - `refund_status` (text, required - Initiated, Completed, Failed)
  - `remark` (text, optional)
  - `amount` (decimal, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 4. Order Management Tables

  ### deliveries
  - `id` (uuid, primary key)
  - `delivery_name` (text, required)
  - `status` (text, required - Pending, Dispatched, Delivered, Cancelled)
  - `remark` (text, optional)
  - `delivery_address` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 5. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to perform CRUD operations
  - Public read access where appropriate for active items

  ## 6. Important Notes
  - All monetary values stored in USD with 2 decimal precision
  - GST/Sales Tax stored as percentage (0-100)
  - Active flags control visibility in operations
  - Timestamps for audit trails
  - Unique constraints on business-critical identifiers
*/

-- Create baskets table
CREATE TABLE IF NOT EXISTS baskets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  basket_name text NOT NULL UNIQUE,
  quantity integer NOT NULL CHECK (quantity > 0),
  weight numeric(10, 2) NOT NULL CHECK (weight > 0),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fruits table
CREATE TABLE IF NOT EXISTS fruits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fruit_name text NOT NULL,
  image_url text,
  price numeric(10, 2) NOT NULL CHECK (price > 0),
  description text CHECK (char_length(description) <= 300),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create decorations table
CREATE TABLE IF NOT EXISTS decorations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decoration_name text NOT NULL,
  decoration_type text NOT NULL CHECK (decoration_type IN ('Ribbon', 'Paper Wrap', 'Floral', 'Custom')),
  price numeric(10, 2) NOT NULL CHECK (price > 0),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchase_orders table
CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number text NOT NULL UNIQUE,
  po_date date NOT NULL,
  fruit_id uuid REFERENCES fruits(id) ON DELETE SET NULL,
  price numeric(10, 2) NOT NULL CHECK (price > 0),
  gst_percent numeric(5, 2) CHECK (gst_percent >= 0 AND gst_percent <= 100),
  supplier_info text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sales_invoices table
CREATE TABLE IF NOT EXISTS sales_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  si_number text NOT NULL UNIQUE,
  si_date date NOT NULL,
  fruit_id uuid REFERENCES fruits(id) ON DELETE SET NULL,
  price numeric(10, 2) NOT NULL CHECK (price > 0),
  gst_percent numeric(5, 2) CHECK (gst_percent >= 0 AND gst_percent <= 100),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('Success', 'Failure', 'Declined')),
  remark text,
  amount numeric(10, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create refunds table
CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid REFERENCES payments(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  refund_status text NOT NULL CHECK (refund_status IN ('Initiated', 'Completed', 'Failed')),
  remark text,
  amount numeric(10, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('Pending', 'Dispatched', 'Delivered', 'Cancelled')),
  remark text,
  delivery_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE baskets ENABLE ROW LEVEL SECURITY;
ALTER TABLE fruits ENABLE ROW LEVEL SECURITY;
ALTER TABLE decorations ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for baskets
CREATE POLICY "Public can view active baskets"
  ON baskets FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage baskets"
  ON baskets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for fruits
CREATE POLICY "Public can view active fruits"
  ON fruits FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage fruits"
  ON fruits FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for decorations
CREATE POLICY "Public can view active decorations"
  ON decorations FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage decorations"
  ON decorations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for purchase_orders
CREATE POLICY "Authenticated users can view purchase orders"
  ON purchase_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage purchase orders"
  ON purchase_orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for sales_invoices
CREATE POLICY "Authenticated users can view sales invoices"
  ON sales_invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage sales invoices"
  ON sales_invoices FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for payments
CREATE POLICY "Authenticated users can view payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage payments"
  ON payments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for refunds
CREATE POLICY "Authenticated users can view refunds"
  ON refunds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage refunds"
  ON refunds FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for deliveries
CREATE POLICY "Authenticated users can view deliveries"
  ON deliveries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage deliveries"
  ON deliveries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_baskets_active ON baskets(active);
CREATE INDEX IF NOT EXISTS idx_fruits_active ON fruits(active);
CREATE INDEX IF NOT EXISTS idx_decorations_active ON decorations(active);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_po_number ON purchase_orders(po_number);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_fruit_id ON purchase_orders(fruit_id);
CREATE INDEX IF NOT EXISTS idx_sales_invoices_si_number ON sales_invoices(si_number);
CREATE INDEX IF NOT EXISTS idx_sales_invoices_fruit_id ON sales_invoices(fruit_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON refunds(refund_status);
CREATE INDEX IF NOT EXISTS idx_deliveries_status ON deliveries(status);
