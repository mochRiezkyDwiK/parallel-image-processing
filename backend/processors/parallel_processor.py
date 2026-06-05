from PIL import Image, ImageFilter, ImageOps
from concurrent.futures import ProcessPoolExecutor
import math

def apply_effect_to_chunk(chunk_data):
    chunk, effect = chunk_data

    if effect == "grayscale":
        return ImageOps.grayscale(chunk).convert("RGB")

    if effect == "blur":
        return chunk.filter(ImageFilter.GaussianBlur(radius=3))

    if effect == "edge":
        return chunk.convert("L").filter(ImageFilter.FIND_EDGES).convert("RGB")

    return chunk


def split_image(image, workers):
    width, height = image.size
    chunk_height = math.ceil(height / workers)
    chunks = []

    for i in range(workers):
        top = i * chunk_height
        bottom = min((i + 1) * chunk_height, height)

        if top < height:
            chunk = image.crop((0, top, width, bottom))
            chunks.append(chunk)

    return chunks


def merge_chunks(chunks, width, height):
    result = Image.new("RGB", (width, height))
    y_offset = 0

    for chunk in chunks:
        result.paste(chunk, (0, y_offset))
        y_offset += chunk.size[1]

    return result


def process_parallel(input_path, output_path, effect, workers=4):
    image = Image.open(input_path).convert("RGB")
    width, height = image.size

    chunks = split_image(image, workers)
    tasks = [(chunk, effect) for chunk in chunks]

    with ProcessPoolExecutor(max_workers=workers) as executor:
        processed_chunks = list(executor.map(apply_effect_to_chunk, tasks))

    result = merge_chunks(processed_chunks, width, height)
    result.save(output_path)