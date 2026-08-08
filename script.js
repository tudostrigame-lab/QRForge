const input = document.getElementById("text");

const generateButton = document.getElementById("generateButton");

const downloadButton = document.getElementById("downloadButton");

const svgButton = document.getElementById("svgButton");

const copyButton = document.getElementById("copyButton");

const clearButton = document.getElementById("clearButton");

const qrContainer = document.getElementById("qr");

const sizeSelect = document.getElementById("size");

const colorInput = document.getElementById("color");

const themeButton = document.getElementById("themeButton");


function generateQR() {

    const text = input.value.trim();

    if (text === "") {

        alert("Введите текст или ссылку");

        input.focus();

        return;
    }

    const size = Number(sizeSelect.value);

    const color = colorInput.value;

    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {

        text: text,

        width: size,

        height: size,

        colorDark: color,

        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H

    });

    downloadButton.hidden = false;

    svgButton.hidden = false;

    copyButton.hidden = false;
}


generateButton.addEventListener(
    "click",
    generateQR
);


input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            generateQR();

        }

    }
);


clearButton.addEventListener(
    "click",
    function () {

        input.value = "";

        qrContainer.innerHTML = "";

        downloadButton.hidden = true;

        svgButton.hidden = true;

        copyButton.hidden = true;

        input.focus();

    }
);


downloadButton.addEventListener(
    "click",
    function () {

        const canvas =
            qrContainer.querySelector("canvas");

        if (!canvas) return;

        const link =
            document.createElement("a");

        link.download =
            "qrforge-qr.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    }
);


svgButton.addEventListener(
    "click",
    function () {

        const canvas =
            qrContainer.querySelector("canvas");

        if (!canvas) return;

        const size =
            canvas.width;

        const image =
            canvas.toDataURL("image/png");

        const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
width="${size}"
height="${size}"
viewBox="0 0 ${size} ${size}">

<image
width="${size}"
height="${size}"
href="${image}"
/>

</svg>`;

        const blob =
            new Blob(
                [svg],
                { type: "image/svg+xml" }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.download =
            "qrforge-qr.svg";

        link.href = url;

        link.click();

        URL.revokeObjectURL(url);

    }
);


copyButton.addEventListener(
    "click",
    async function () {

        const text =
            input.value.trim();

        if (!text) return;

        try {

            await navigator.clipboard.writeText(text);

            alert("Ссылка скопирована!");

        } catch {

            alert("Не удалось скопировать.");

        }

    }
);


themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");

        if (
            document.body.classList.contains("dark")
        ) {

            themeButton.textContent = "☀️";

        } else {

            themeButton.textContent = "🌙";

        }

    }
);
