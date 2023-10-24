
import mysql.connector

database = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = 'egoeimai7',
    auth_plugin = 'mysql_native_password'
) 

cursor = database.cursor()

cursor.execute("CREATE DATABASE BookNow")

print("All done!")