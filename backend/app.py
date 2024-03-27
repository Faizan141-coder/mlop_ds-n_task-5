from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection URI
MONGO_URI = 'mongodb+srv://faizan:faizan@cluster0.d6vao9v.mongodb.net/users'

# Function to connect to MongoDB
def get_db_connection():
    client = MongoClient(MONGO_URI)
    return client.users

@app.route('/api/save-data', methods=['POST', 'OPTIONS'])  # Add OPTIONS method
def save_data():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'Preflight request received'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        # Connect to MongoDB
        db = get_db_connection()

        # Get data from request
        data = request.json
        name = data.get('name')
        email = data.get('email')

        # Check if name and email are provided
        if name and email:
            # Insert data into 'users' collection
            db.users.insert_one({'name': name, 'email': email})
            return jsonify({'message': 'Data saved successfully'}), 200
        else:
            return jsonify({'error': 'Invalid data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
