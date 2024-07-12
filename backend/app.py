from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

NASA_API_KEY = os.getenv('NASA_API_KEY')  # Get NASA API key from environment variable

@app.route('/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')  # Optional date parameter
    params = {'api_key': NASA_API_KEY}
    if date:
        params['date'] = date

    response = requests.get('https://api.nasa.gov/planetary/apod', params=params)
    data = response.json()

    return jsonify(data)

@app.route('/view', methods=['GET'])
def search_images():
    query = request.args.get('q', default='', type=str)
    params = {
        'q': query,
        'media_type': 'image',
        'page': 1,
        'page_size': 6
    }
    response = requests.get(f'https://images-api.nasa.gov/search', params=params)
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
