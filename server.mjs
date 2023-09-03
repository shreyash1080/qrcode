import express from "express";
import qrcode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});*/

// Serve the main HTML page at both root and "/public/index.html"
app.get(["/", "/public/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/generate-qr", async (req, res) => {
    const url = req.query.url;
    try {
        const qrCodeImageUrl = await qrcode.toDataURL(url);
        res.send(qrCodeImageUrl);
    } catch (error) {
        console.error("QR Code generation error:", error);
        res.status(500).send("QR Code generation failed");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
