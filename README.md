<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>

<h1>GalleryInk Art Image Downloader</h1>

<p>This repository contains a Python script to download images from the GalleryInk art collection page and save them to a local directory. The images are saved with filenames based on their number and alt text.</p>

<h2>Requirements</h2>
<ul>
    <li>Python 3.x</li>
    <li>pip</li>
</ul>

<h3>Python Libraries</h3>
<p>Install the required libraries using pip:</p>
<pre><code>pip install requests pandas beautifulsoup4</code></pre>

<h2>Usage Instructions</h2>

<h3>1. Extract Data from Webpage</h3>
<p>First, you need to extract the data (image links and alt text) from the <a href="https://galleryink.art/collections/japanese">GalleryInk Japanese Collection</a> webpage and save it into a CSV file. You can use the following JavaScript script in the browser console to extract this data:</p>

<pre><code>function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // Create a CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });

    // Create a download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide the link
    downloadLink.style.display = 'none';

    // Add the link to the DOM
    document.body.appendChild(downloadLink);

    // Click the link
    downloadLink.click();
}

function extractDataToCSV() {
    const items = document.querySelectorAll('.bls__grid__item');
    let csv = 'Number,Img Link,Alt Text\n';

    items.forEach((item, index) => {
        const img = item.querySelector('img');
        const imgLink = img ? img.src : '';
        const altText = img ? img.alt : '';
        
        csv += `${index + 1},${imgLink},${altText}\n`;
    });

    // Download the CSV file
    downloadCSV(csv, 'items.csv');
}

// Call the function to extract data and download the CSV file
extractDataToCSV();
</code></pre>

<p>Paste the above script into the browser console on the <a href="https://galleryink.art/collections/japanese">GalleryInk Japanese Collection</a> webpage and run it. It will download a CSV file named <code>items.csv</code>.</p>

<h3>2. Download Images using Python Script</h3>
<p>Place the downloaded <code>items.csv</code> file in the same directory as the Python script. Then, run the following Python script to download the images:</p>

<pre><code>import os
import requests
import pandas as pd

def download_images_from_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)

    if not os.path.exists('images'):
        os.makedirs('images')

    for index, row in df.iterrows():
        number = row['Number']
        img_link = row['Img Link']
        alt_text = row['Alt Text'].replace('/', '-').replace('\\', '-')
        
        alt_text = ''.join([c if c.isalnum() else '_' for c in alt_text])

        img_filename = f"images/{number} - {alt_text}.jpg"

        try:
            response = requests.get(img_link)
            response.raise_for_status()
            with open(img_filename, 'wb') as file:
                file.write(response.content)
            print(f"Downloaded {img_filename}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to download {img_link}: {e}")

csv_file_path = 'items.csv'
download_images_from_csv(csv_file_path)
</code></pre>

<p>This script will read the image links and alt texts from <code>items.csv</code>, download the images, and save them in the <code>images</code> folder, naming each file with its number and alt text.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
