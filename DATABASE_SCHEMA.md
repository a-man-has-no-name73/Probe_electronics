# Database Schema Updates

## Migration Scripts

### Step 1: Remove district and postal_code columns

```sql
ALTER TABLE orders
DROP COLUMN IF EXISTS district,
DROP COLUMN IF EXISTS postal_code;
```

### Step 2: Add payment_type and quantity columns

```sql
-- Add payment_type column (COD, bKash, or Nagad)
ALTER TABLE orders
ADD COLUMN payment_type TEXT CHECK (payment_type IN ('cod', 'bkash', 'nagad'));

-- Add quantity column with default value 1
ALTER TABLE orders
ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;
```

## Complete Updated Schema

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT,
  phone_number TEXT NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('cod', 'bkash', 'nagad')),
  transaction_number TEXT,
  transaction_phone_number TEXT,
  address TEXT,
  institution TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Field Descriptions:

- `payment_type`: 'cod', 'bkash', or 'nagad'
- `quantity`: Number of kits ordered (minimum 1)
- `transaction_number`: Transaction ID for digital payments, 'COD' for cash on delivery
- `transaction_phone_number`: Phone used for payment (null for COD)
- **REMOVED**: `district`, `postal_code`, `payment_method`
