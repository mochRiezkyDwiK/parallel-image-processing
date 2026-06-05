import time
import os
from utils.file_utils import save_uploaded_file, generate_result_filename
from processors.sequential_processor import process_sequential
from processors.parallel_processor import process_parallel

def process_image_service(image_file, effect, workers, upload_folder, result_folder):
    input_path = save_uploaded_file(image_file, upload_folder)

    sequential_filename = generate_result_filename("sequential", image_file.filename)
    parallel_filename = generate_result_filename("parallel", image_file.filename)

    sequential_output = os.path.join(result_folder, sequential_filename)
    parallel_output = os.path.join(result_folder, parallel_filename)

    start_seq = time.perf_counter()
    process_sequential(input_path, sequential_output, effect)
    sequential_time = time.perf_counter() - start_seq

    start_par = time.perf_counter()
    process_parallel(input_path, parallel_output, effect, workers)
    parallel_time = time.perf_counter() - start_par

    speedup = sequential_time / parallel_time if parallel_time > 0 else 0

    return {
        "message": "Image processed successfully",
        "effect": effect,
        "workers": workers,
        "sequential_time": round(sequential_time, 4),
        "parallel_time": round(parallel_time, 4),
        "speedup": round(speedup, 2),
        "sequential_image": f"http://127.0.0.1:5000/api/images/results/{sequential_filename}",
        "parallel_image": f"http://127.0.0.1:5000/api/images/results/{parallel_filename}"
    }