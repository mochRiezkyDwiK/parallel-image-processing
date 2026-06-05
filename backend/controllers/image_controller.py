from flask import Blueprint, request, jsonify, current_app, send_from_directory
from services.image_service import process_image_service
import os

image_bp = Blueprint("image_bp", __name__)

@image_bp.route("/process", methods=["POST"])
def process_image():
    try:
        if "image" not in request.files:
            return jsonify({"error": "File gambar tidak ditemukan"}), 400

        image_file = request.files["image"]
        effect = request.form.get("effect", "grayscale")
        workers = int(request.form.get("workers", 4))

        result = process_image_service(
            image_file=image_file,
            effect=effect,
            workers=workers,
            upload_folder=current_app.config["UPLOAD_FOLDER"],
            result_folder=current_app.config["RESULT_FOLDER"]
        )

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@image_bp.route("/results/<filename>", methods=["GET"])
def get_result_image(filename):
    return send_from_directory(current_app.config["RESULT_FOLDER"], filename)