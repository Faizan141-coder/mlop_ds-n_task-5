# backend/app.py

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://database:27017/mydatabase'  # Docker Compose service name
mongo = PyMongo(app)

@app.route('/api/save-data', methods=['POST'])
def save_data():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    if name and email:
        mongo.db.users.insert_one({'name': name, 'email': email})
        return jsonify({'message': 'Data saved successfully'}), 200
    else:
        return jsonify({'error': 'Invalid data'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
