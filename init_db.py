import sqlite3

with open(f"./databases/database.db", "w") as f:
    connection = sqlite3.connect(f"./databases/database.db")
    script = open("./databases/sql_script.sql", "r").read()
    connection.executescript(script)