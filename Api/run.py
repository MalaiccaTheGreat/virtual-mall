from waitress import serve
from app import app  # Import your Flask app

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000, threads=4, expose_tracebacks=True)