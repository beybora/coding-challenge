from flask import Blueprint, request, jsonify
import re

chunking = Blueprint("chunking", __name__)

@chunking.route("/chunk", methods=["POST"])
def handle_chunk_request():
    data = request.get_json()

    text = data.get("text", "")
    page_height = data.get("pageHeight", 600)

    # Layout assumptions 
    line_height = 22
    chars_per_line = 75
    padding_total = 160 

    # Estimate number of lines per page
    usable_height = max(page_height - padding_total, 100)
    lines_per_page = usable_height // line_height
    max_chars = lines_per_page * chars_per_line

    # Collapse whitespace and trim input
    cleaned = re.sub(r'\s+', ' ', text.strip())

    # Split by words, try to preserve boundaries
    words = cleaned.split()
    chunks = []
    current = ""

    for word in words:
        # add 1 for the space
        if len(current) + len(word) + 1 <= max_chars:
            current += (" " if current else "") + word
        else:
            chunks.append(current)
            current = word

    if current:
        chunks.append(current)

    return jsonify({ "chunks": chunks })
