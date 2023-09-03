document.addEventListener("DOMContentLoaded", () => {
    const qrForm = document.getElementById("qr-form");
    const qrImage = document.getElementById("qr-image");
    const downloadLink = document.getElementById("download-link");
    console.log("Script is running"); 
    qrForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const urlInput = document.getElementById("url-input");
        const url = urlInput.value;

        try {
            const response = await fetch(`/generate-qr?url=${encodeURIComponent(url)}`);
            if (response.ok) {
                const qrCodeImageUrl = await response.text();
                qrImage.src = qrCodeImageUrl;
                downloadLink.href = qrCodeImageUrl;
                downloadLink.style.display = "block";
            } else {
                console.error("Failed to generate QR Code");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
