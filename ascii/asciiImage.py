import sys
import os
from PIL import Image, ImageEnhance, ImageOps

if len(sys.argv) < 2:
    print("Usage 1: python3 asciiImage.py <image-directory> <image-file>")
    print("Usage 2: python3 asciiImage.py <image-directory>")
    sys.exit(1)

def to_ascii(file, size = 150, directory = ""):
    with Image.open(directory + file) as image:
        image = ImageOps.exif_transpose(image)
        image = image.convert("L")
        image = image.point(lambda i: i/2 if(i > 85 and i < 170) else i)

        ImageEnhance.Sharpness(image).enhance(4)
        image = ImageOps.fit(image, (size,size), centering=(0.5,0.0))
        image = image.reduce((1,2))
        image_px = image.get_flattened_data()


    #@@BBRR**##$$PPXX00wwooIIccvv::++!!~~""..,,  " .-:=+##","$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"\^`'. "
    # dark_to_bright = "  .:--++****"
    dark_to_bright = "  .:--++#@@"
    bright_to_dark = dark_to_bright[::-1]
    lines = [[dark_to_bright[int(image.getpixel((i,j)) / max(image_px) * (len(dark_to_bright) - 1))] for i in range(image.width)] for j in range(image.height)]
    lines = ["".join(line) for line in lines]
    image.save("output_images/formatted_" + file)

    file_name = file.split('.', 1)[0]
    with open("output_text/ascii" + file_name + ".txt", "w") as ascii:
        # ascii.write(str(lines)+"\n")
        lines = [line + "\n" for line in lines]
        ascii.writelines(lines)
        ascii.write("\n")

directory = sys.argv[1]
if len(sys.argv) == 3:
    filename = sys.argv[2]
    to_ascii(file = filename, directory = directory)
else:
    for entry in os.listdir(directory):
        to_ascii(file = entry, directory = directory)



sys.exit(0)

