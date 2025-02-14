import cv2
import numpy as np

def color_overlap(image_path, output_path, color=(255, 255, 255), alpha=0.31):
    # Read the image
    image = cv2.imread(image_path)
    
    # Create an overlay with the same size as the image and fill it with the specified color
    overlay = np.full(image.shape, color, dtype='uint8')
    
    # Blend the image and the overlay
    blended_image = cv2.addWeighted(image, 1 - alpha, overlay, alpha, 0)
    
    # Save the blended image
    cv2.imwrite(output_path, blended_image)

# Example usage
input_image_path = 'korea_univ.jpg'
output_image_path = 'korea_univ_overlap.jpg'
color_overlap(input_image_path, output_image_path)