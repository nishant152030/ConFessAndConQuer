from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bhavdeep:syntax@cluster0.d7y0em3.mongodb.net/?retryWrites=true&w=majority"
# print('1212')
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
print('1212')
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)