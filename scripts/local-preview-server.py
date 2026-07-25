#!/usr/bin/env python3
"""L0 static preview with canonical no-trailing-slash route mapping."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
ROUTES = {
    "/": "index.html",
    "/solutions": "solutions/index.html",
    "/industries/manufacturing": "industries/manufacturing/index.html",
    "/industries/trade": "industries/trade/index.html",
    "/industries/ecommerce": "industries/ecommerce/index.html",
    "/industries/professional-services": "industries/professional-services/index.html",
    "/industries/sales": "industries/sales/index.html",
    "/industries/education": "industries/education/index.html",
    "/industries/healthcare": "industries/healthcare/index.html",
    "/industries/construction": "industries/construction/index.html",
    "/industries/local-services": "industries/local-services/index.html",
    "/industries/more": "industries/more/index.html",
}

class PreviewHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        route = urlparse(path).path
        return str(ROOT / ROUTES.get(route, route.lstrip("/")))

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 4184), PreviewHandler).serve_forever()
