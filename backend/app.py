from flask import Flask
from flask_cors import CORS
from controllers.image_controller import image_bp
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app.config["UPLOAD_FOLDER"] = os.path.join(BASE_DIR, "uploads")
app.config["RESULT_FOLDER"] = os.path.join(BASE_DIR, "results")

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs(app.config["RESULT_FOLDER"], exist_ok=True)

app.register_blueprint(image_bp, url_prefix="/api/images")

@app.route("/")
def home():
    return {
        "message": "Backend Parallel Image Processing Running"
    }

if __name__ == "__main__":
    app.run(debug=True, port=5000)