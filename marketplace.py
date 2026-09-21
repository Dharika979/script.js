import sqlite3
conn = sqlite3.connect("marketplace.db")
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    FullName TEXT,
    Email TEXT UNIQUE,
    Password TEXT,
    Phone TEXT,
    Address TEXT,
    Role TEXT,
    JoinDate TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS sellers (
    SellerID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    StoreName TEXT,
    Description TEXT,
    Phone TEXT,
    Address TEXT,
    VerificationStatus TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS categories (
    CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName TEXT,
    Description TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    SellerID INTEGER,
    CategoryID INTEGER,
    ProductName TEXT,
    Description TEXT,
    Price REAL,
    StockQuantity INTEGER,
    ImageURL TEXT,
    IsSustainable TEXT,
    DateAdded TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    OrderDate TEXT,
    TotalAmount REAL,
    Status TEXT,
    PaymentStatus TEXT,
    ShippingAddress TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS order_items (
    OrderItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    Price REAL,
    Subtotal REAL
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS payments (
    PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER,
    PaymentDate TEXT,
    Amount REAL,
    PaymentMethod TEXT,
    PaymentStatus TEXT,
    TransactionID TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS shippings (
    ShippingID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER,
    ShippingDate TEXT,
    DeliveryDate TEXT,
    CourierName TEXT,
    TrackingNumber TEXT,
    ShippingStatus TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS reviews (
    ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    ProductID INTEGER,
    Rating INTEGER,
    Comment TEXT,
    ReviewDate TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS wishlist (
    WishlistID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    ProductID INTEGER,
    DateAdded TEXT
)
""")
conn.commit()
conn.close()

print("marketplace.db created successfully!")
