import sqlite3

# Connect to SQLite database (creates file if it doesn't exist)
conn = sqlite3.connect('users.db')
c = conn.cursor()

# Create table
c.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
''')

# Insert a sample user (change username/password as needed)
try:
    c.execute("INSERT INTO users (username, password) VALUES (?, ?)", ('admin', 'password123'))
except sqlite3.IntegrityError:
    print("User already exists.")

conn.commit()

# Fetch and print all users BEFORE closing the connection
c.execute("SELECT id, username, password FROM users")
rows = c.fetchall()

for row in rows:
    print(row)

conn.close()

print("Database and user created successfully.")