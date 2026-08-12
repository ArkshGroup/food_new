Creating Backup 

pg_dump "postgres://postgres:DdsOB41myjy05NwGbHx4Nuzbs7jamJuMSqP6BjR2pJVFNwobg31HV90OPyYXqS5a@209.50.229.110:5432/postgres" -F p -f backup.sql

⚙️ Explanation
pg_dump → PostgreSQL’s backup tool
The quoted URL → connection string (includes username, password, host, and database)
-F p → format = plain SQL (readable .sql file)
-f backup.sql → name of the output file
This will create a file named backup.sql in your current directory containing all your schema and data.


Import/Restoring Backup for a given db_url

psql "postgres://postgres:Pz0qbeoRMnCYnyrzXEMd08jB4MMDG8frlRiuTIJHYZPneNotFn3eEe4IuYm9acD8@209.50.229.110:5433/postgres" -f backup.sql

___________________________For Migration of image____________________________

UPDATE "ProductImage"
SET "imageUrl" =
  'https://minio-oks404ksgws8sc0wg8kcgok0.209.50.229.110.sslip.io/food/' ||
  regexp_replace("imageUrl", '.*products/', '')
WHERE "imageUrl" LIKE '%products/%'
  AND "imageUrl" NOT LIKE '%/food/%'
  AND "imageUrl" NOT LIKE '%minio-%';



/// changing the product special price 25% off

UPDATE "Product" SET "specialPrice" = ROUND("unitSellingPrice" * 0.75, 2);


// changing the product special price 10% off

UPDATE "Product" SET "specialPrice" = ROUND("unitSellingPrice" * 0.9, 2);


//change the stock qunatity

UPDATE "Product" SET "stockQuantity" = 500;


// for deleting table data from user , order , order item , cart , cartItem ,order shipping address

TRUNCATE TABLE
  "OrderItem",
  "OrderShippingDetails",
  "Order",
  "CartItem",
  "Cart",
  "User",
  "DiscountCode"
RESTART IDENTITY
CASCADE;


TRUNCATE TABLE
  "OrderItem",
  "OrderShippingDetails",
  "Order",
  "CartItem",
  "Cart",
CASCADE;