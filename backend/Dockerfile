# Use the official Python image as a base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Flask app code to the container
COPY . /app

# Install dependencies
RUN pip install Flask pymongo flask_cors

# Expose the Flask port
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "app.py"]