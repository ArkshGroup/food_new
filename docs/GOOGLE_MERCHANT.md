# Listing products in Google Merchant Center

Your site exposes a **product feed** that Google Merchant Center can fetch on a schedule. Use it to list all your products (and keep them in sync) for free listings and Shopping.

## Feed URL

Use this URL in Merchant Center:

- **Production:** `https://www.arkshfood.com/api/feed/google-merchant`
- (Optional legacy URL: `https://www.arkshfood.com/api/get-product-file` — same data; the feed above uses your selling price and configurable base URL.)

The feed is **tab-separated (TSV)** and includes: id, title, description, link, image_link, additional_image_link, availability, price, condition, brand, google_product_category, product_type.

`google_product_category` uses **official numeric taxonomy IDs** from [Google’s product taxonomy](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt) so Merchant Center accepts them (outdated text paths cause “Invalid product category”).

## How to add products to Google Merchant

1. **Create a Merchant Center account**
   - Go to [Google Merchant Center](https://merchants.google.com/) and sign in with your business Google account.
   - Complete business and website verification if prompted.

2. **Add a product feed**
   - In Merchant Center: **Products** → **Feeds**.
   - Click **Add feed** (or **Create feed**).
   - Choose your country and language (e.g. Nepal / English).
   - Select **Scheduled fetch** (recommended) so Google pulls your feed from the URL automatically.
   - Enter the feed URL:  
     `https://www.arkshfood.com/api/feed/google-merchant`
   - Set a fetch schedule (e.g. daily).

3. **Submit**
   - Save the feed. Google will fetch the file, validate it, and start listing your products. Fix any errors Merchant Center reports (e.g. image or attribute issues).

4. **Optional: set base URL in env**
   - If you use a different production domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.arkshfood.com`) so product links in the feed use the correct domain.

## Notes

- Only **visible** products (`isVisible: true`) are included.
- **Price** in the feed is the selling price (special price if set, otherwise regular price).
- **Availability** is “in stock” or “out of stock” based on `stockQuantity`.
- For Shopping ads or paid programs, ensure you meet [Google’s Merchant Center policies](https://support.google.com/merchants/answer/6149970).
