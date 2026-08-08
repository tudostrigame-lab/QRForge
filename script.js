const input = document.getElementById("text");
const button = document.getElementById("generateButton");
const qrContainer = document.getElementById("qr");

button.addEventListener("click", function () {
    const text = input.value.trim();

    if (text === "") {
        alert("Введите текст или ссылку");
        return;
    }

    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: text,
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.H
    });
});
