import http.server
import socketserver
import os
import signal
import sys
import threading

handler_object = http.server.SimpleHTTPRequestHandler 

def signal_handler(sig, frame):
    print('Shutting down server...')
    threading.Thread(target=httpd.shutdown).start()
    sys.exit(0)

# Set up signal handler to handle termination gracefully
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

if __name__ == "__main__":
    PORT = int(os.getenv('PORT', 8080))
    httpd = socketserver.ThreadingTCPServer(("", PORT), handler_object)
    print(f'Server started on port {PORT}')
    httpd.serve_forever()
