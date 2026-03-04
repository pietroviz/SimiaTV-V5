#!/bin/bash
# ──────────────────────────────────────────────
# SiMia World — Local Test Server
#
# Run this script to serve the web app locally.
# Then open http://localhost:8080 in your browser.
#
# Handles gzipped Unity WebGL builds: when the browser
# requests e.g. "intro-show.data", the server transparently
# serves "intro-show.data.gz" with Content-Encoding: gzip.
#
# Usage:
#   ./start-server.sh
#   (or: bash start-server.sh)
# ──────────────────────────────────────────────

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║     SiMia World — Local Test Server       ║"
echo "╠═══════════════════════════════════════════╣"
echo "║  Open in your browser:                    ║"
echo "║  → http://localhost:$PORT                  ║"
echo "║                                           ║"
echo "║  Press Ctrl+C to stop the server          ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

cd "$DIR"

python3 -c "
import http.server
import os

MIME_MAP = {
    '.wasm': 'application/wasm',
    '.data': 'application/octet-stream',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.html': 'text/html',
}

class UnityWebGLHandler(http.server.SimpleHTTPRequestHandler):

    def translate_path(self, path):
        # Get the default file path
        fpath = super().translate_path(path)

        # If the exact file doesn't exist, check for a .gz version
        if not os.path.isfile(fpath) and os.path.isfile(fpath + '.gz'):
            fpath = fpath + '.gz'

        return fpath

    def end_headers(self):
        fpath = self.translate_path(self.path)

        if fpath.endswith('.gz'):
            self.send_header('Content-Encoding', 'gzip')

        # Cross-origin headers (needed for SharedArrayBuffer / threading)
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')

        super().end_headers()

    def guess_type(self, path):
        # For .gz files, determine MIME from the underlying extension
        if path.endswith('.gz'):
            path = path[:-3]  # strip .gz

        for ext, mime in MIME_MAP.items():
            if path.endswith(ext):
                return mime

        return super().guess_type(path)

print('Starting Unity WebGL server on port $PORT...')
print('Serving from: ' + os.getcwd())
http.server.HTTPServer(('', $PORT), UnityWebGLHandler).serve_forever()
"
