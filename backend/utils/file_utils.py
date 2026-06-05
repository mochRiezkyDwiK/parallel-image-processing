import os
import uuid
from werkzeug.utils import secure_filename

def save_uploaded_file(image_file, upload_folder):
    filename = secure_filename(image_file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    file_path = os.path.join(upload_folder, unique_filename)
    image_file.save(file_path)
    return file_path


def generate_result_filename(prefix, original_filename):
    filename = secure_filename(original_filename)
    name, ext = os.path.splitext(filename)

    if ext == "":
        ext = ".jpg"

    return f"{prefix}_{uuid.uuid4()}_{name}{ext}"