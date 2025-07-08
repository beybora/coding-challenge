from flask import Flask
from flask_cors import CORS
from app.routes.chunking import chunking

def create_app():
    app = Flask(__name__)
    
    # initialize cors
    CORS(app)

    #register routes and blueprints
    app.register_blueprint(chunking, url_prefix="/api")
    
    return app
