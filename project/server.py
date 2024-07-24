import http.server
import socketserver
import os
import signal
import sys
import time
import requests
import base64

IMAGE_URL = "https://picsum.photos/1200"
CACHE_DIR = "/tmp/image_cache"
CACHE_FILE = os.path.join(CACHE_DIR, "hourly_image.jpg")
CACHE_DURATION = 3600  # 60 minutes
INDEX_FILE = "index.html"

class HttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.serve_index()
        else:
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def serve_index(self):
        self.fetch_image_if_needed()
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        with open(INDEX_FILE, 'r') as f:
            index_html = f.read()
        index_html = index_html.replace("{{ image_data }}", self.get_image_base64())
        self.wfile.write(index_html.encode('utf-8'))

    def fetch_image_if_needed(self):
        if not os.path.exists(CACHE_DIR):
            os.makedirs(CACHE_DIR)
        if not os.path.exists(CACHE_FILE) or self.is_cache_expired():
            response = requests.get(IMAGE_URL)
            with open(CACHE_FILE, 'wb') as f:
                f.write(response.content)
            os.utime(CACHE_FILE, None)  # Update the modification time

    def is_cache_expired(self):
        return time.time() - os.path.getmtime(CACHE_FILE) > CACHE_DURATION

    def get_image_base64(self):
        with open(CACHE_FILE, 'rb') as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

handler_object = HttpRequestHandler

def signal_handler(sig, frame):
    print('Shutting down server...')
    httpd.shutdown()
    sys.exit(0)

# Set up signal handler to handle termination gracefully
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

if __name__ == "__main__":
    PORT = int(os.getenv('PORT', 8080))
    httpd = socketserver.TCPServer(("", PORT), handler_object)
    print(f'Server started on port {PORT}')
    httpd.serve_forever()
