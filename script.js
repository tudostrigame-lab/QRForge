const input = document.getElementById("text");
const generateButton = document.getElementById("generateButton");
const downloadButton = document.getElementById("downloadButton");
const clearButton = document.getElementById("clearButton");
const qrContainer = document.getElementById("qr");

let qrCode = null;

function generateQR() {
    const text = input.value.trim();

    if (text === "") {
        alert("Введите текст или ссылку");
        input.focus();
        return;
    }

    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {
        text: text,
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadButton.hidden = false;
}

generateButton.addEventListener("click", generateQR);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateQR();
    }
});

clearButton.addEventListener("click", function () {
    input.value = "";
    qrContainer.innerHTML = "";
    downloadButton.hidden = true;
    input.focus();
});

downloadButton.addEventListener("click", function () {
    const canvas = qrContainer.querySelector("canvas");
    const image = qrContainer.querySelector("img");

    if (canvas) {
        const link = document.createElement("a");
        link.download = "qrforge-qr.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } else if (image) {
        const link = document.createElement("a");
        link.download = "qrforge-qr.png";
        link.href = image.src;
        link.click();
    }
});
