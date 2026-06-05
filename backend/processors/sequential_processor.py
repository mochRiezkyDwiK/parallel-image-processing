from PIL import Image, ImageFilter, ImageOps

def apply_effect(image, effect):
    if effect == "grayscale":
        return ImageOps.grayscale(image).convert("RGB")

    if effect == "blur":
        return image.filter(ImageFilter.GaussianBlur(radius=3))

    if effect == "edge":
        return image.convert("L").filter(ImageFilter.FIND_EDGES).convert("RGB")

    return image


def process_sequential(input_path, output_path, effect):
    image = Image.open(input_path).convert("RGB")
    result = apply_effect(image, effect)
    result.save(output_path)