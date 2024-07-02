import os
import requests
import pandas as pd

# Function to download images
def download_images_from_csv(csv_file_path):
    # Read the CSV file
    df = pd.read_csv(csv_file_path)

    # Create images directory if not exists
    if not os.path.exists('images'):
        os.makedirs('images')

    for index, row in df.iterrows():
        number = row['number']
        img_link = row['img link']
        alt_text = row['alt text'].replace('/', '-').replace('\\', '-')
        
        # Ensure alt_text is valid for a file name
        alt_text = ''.join([c if c.isalnum() else '_' for c in alt_text])

        # File name format: "number - alt text"
        img_filename = f"images/{number} - {alt_text}.jpg"

        # Download and save the image
        try:
            response = requests.get(img_link)
            response.raise_for_status()  # Raise an exception for HTTP errors
            with open(img_filename, 'wb') as file:
                file.write(response.content)
            print(f"Downloaded {img_filename}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to download {img_link}: {e}")

# Path to the CSV file
csv_file_path = 'items.csv'

# Call the function to download images
download_images_from_csv(csv_file_path)
