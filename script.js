document.getElementById('process-button').addEventListener('click', async () => {
    const imageInput = document.getElementById('image-input').files[0];
    if (!imageInput) {
        alert('Please select an image first.');
        return;
    }

    const imageUrl = URL.createObjectURL(imageInput);
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
        // Extract text using Tesseract.js
        const { data: { text } } = await Tesseract.recognize(img, 'eng');
        document.getElementById('extracted-text').innerText = text;

        // Draw the image on canvas
        const canvas = document.getElementById('visual-canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        // Example of manipulating the visual elements
        // Here we just apply a simple filter
        context.globalCompositeOperation = 'saturation';
        context.fillStyle = 'hsl(0, 0%, 50%)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
});
