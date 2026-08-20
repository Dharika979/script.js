products = [
    {
        "id": 1,
        "name": "Bamboo Toothbrush",
        "price": 120,
        "category": "Personal Care",
        "description": "Eco-friendly bamboo toothbrush"
    },
    {
        "id": 2,
        "name": "Cloth Shopping Bag",
        "price": 100,
        "category": "Reusable",
        "description": "Reusable cotton shopping bag"
    },
    {
        "id": 3,
        "name": "Steel Water Bottle",
        "price": 350,
        "category": "Kitchen",
        "description": "Reusable stainless steel bottle"
    },
    {
        "id": 4,
        "name": "Bamboo Cup",
        "price": 150,
        "category": "Kitchen",
        "description": "Reusable bamboo cup"
    }
]
def display_products():
    print("\n--- Sustainable Products ---")
    for product in products:
        print("ID:", product["id"])
        print("Name:", product["name"])
        print("Price: Rs.", product["price"])
        print("Category:", product["category"])
        print("Description:", product["description"])
        print("--------------------------")
def search_product(name):
    found = False
    for product in products:
        if name.lower() in product["name"].lower():
            print(product)
            found = True
    if not found:
        print("Product not found.")
