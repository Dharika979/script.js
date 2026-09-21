# SUSTAINABLE PRODUCT MARKETPLACE
# SYSTEM ARCHITECTURE

                USER
                  |
                  v
          +---------------+
          |  Web Browser  |
          +-------+-------+
                  |
                  v
          +---------------+
          | Flask Server  |
          |    app.py     |
          +-------+-------+
                  |
                  v
          +---------------+
          | Python Logic  |
          +-------+-------+
                  |
        +---------+---------+
        |                   |
        v                   v
   +---------+         +---------+
   | Seller  |         |  Buyer  |
   +---------+         +---------+
        |                   |
        +---------+---------+
                  |
                  v
          +---------------+
          | SQLite        |
          | marketplace.db|
          +-------+-------+
                  |
       +----------+----------+
       |          |          |
       v          v          v
   Products     Orders    Reviews
       |
       v
   Wishlist
       |
       v
   Payment
       |
       v
   Shipping
