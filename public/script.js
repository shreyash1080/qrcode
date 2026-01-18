document.addEventListener("DOMContentLoaded", () => {
    const qrForm = document.getElementById("qr-form");
    const qrImage = document.getElementById("qr-image");
    const downloadLink = document.getElementById("download-link");
    const resultSection = document.getElementById("result-section");
    const submitBtn = document.getElementById("submit-btn");
    const themeBtn = document.getElementById("theme-toggle");
    const htmlEl = document.documentElement;

    // --- 1. Theme Toggle Logic ---
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- 2. QR Code Generation ---
    qrForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const urlInput = document.getElementById("url-input");
        const url = urlInput.value.trim();

        if (!url) return;

        // Button Loading State
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">PROCESSING...</span>';

        // Generate QR
        QRCode.toDataURL(url, { 
            width: 400, 
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff"
            }
        }, (err, dataUrl) => {
            if (err) {
                console.error(err);
                alert("Error generating code.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }

            // Fake delay for "Cyber" effect
            setTimeout(() => {
                qrImage.src = dataUrl;
                downloadLink.href = dataUrl;
                
                resultSection.style.display = "block";
                
                // Reset animation to play it again
                resultSection.style.animation = 'none';
                resultSection.offsetHeight; /* trigger reflow */
                resultSection.style.animation = "slideUp 0.6s ease-out";

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 500);
        });
    });
});