from database import get_connection
def register_user():
    print("\n--- User Registration ---")
    name = input("Enter name: ")
    email = input("Enter email: ")
    password = input("Enter password: ")
    connection = get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        """, (name, email, password))
        connection.commit()
        print("Registration successful!")
    except Exception:
        print("Email already exists.")
    connection.close()
def login_user():
    print("\n--- User Login ---")
    email = input("Enter email: ")
    password = input("Enter password: ")
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("""
        SELECT * FROM users
        WHERE email = ? AND password = ?
    """, (email, password))
    user = cursor.fetchone()
    connection.close()
    if user:
        print("Login successful!")
        print("Welcome,", user[1])
        return user
    print("Invalid email or password.")
    return None
def view_users():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT id, name, email FROM users")
    users = cursor.fetchall()
    connection.close()
    print("\n--- Registered Users ---")
    if not users:
        print("No users found.")
        return
    for user in users:
        print(
            "ID:", user[0],
            "| Name:", user[1],
            "| Email:", user[2]
        )
