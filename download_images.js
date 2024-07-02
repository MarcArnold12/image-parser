// This function will be used to download the data as a CSV file
function downloadCSV(csv, filename) {
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

// This function extracts the required data from the page and formats it as CSV
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
