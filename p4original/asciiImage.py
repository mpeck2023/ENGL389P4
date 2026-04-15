import sys
from PIL import Image, ImageEnhance
image_name = "istockphoto-104241161-612x612.jpg"
size = 150

with Image.open(image_name) as image:
    image = image.convert("L")
    ImageEnhance.Contrast(image).enhance(1.5)
    factor = -(min(image.height,image.width) // -size)
    image = image.reduce((3,5))
    image = image.reduce(factor)
    image_px = image.get_flattened_data()


#@@BBRR**##$$PPXX00wwooIIccvv::++!!~~""..,,  " .-:=+##","$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"\^`'. "
dark_to_bright = "  .:--+#@@"
bright_to_dark = dark_to_bright[::-1]
lines = [[bright_to_dark[int(image.getpixel((i,j)) / max(image_px) * (len(dark_to_bright) - 1))] for i in range(image.width)] for j in range(image.height)]
lines = ["".join(line) for line in lines]
image.save("output.png")
print(lines)

with open("ascii.txt", "w") as ascii:
    ascii.write(str(lines)+"\n")
    lines = [line + "\n" for line in lines]
    ascii.writelines(lines)
sys.exit(0)
