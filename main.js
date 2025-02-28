var format = "png";
async function generateQRCode() {
  let inputText = document.getElementById("text").value;
  if (inputText === "") {
    // validasi jika input
    alert("Please masukan text yang ingin diubah menjadi QR code");
    return;
  }
  const response = await fetch(
    `https://quickchart.io/qr?text=${encodeURIComponent(
      inputText
    )}&size=200&format=${format}`
  ); // Fetch API
  if (response.ok) {
    // Generate QR code
    const qrCodeImage = document.getElementById("qrcode");

    qrCodeImage.src = URL.createObjectURL(await response.blob());
  } else {
    console.error("Gagal membuat kode QR");
  }

  autoClearText();
}

function autoClearText() {
  // Bersihkan teks setelah membuat kode QR
  document.getElementById("text").value = "";
}

function downloadQRCode() {
  /// Download QR code
  if (document.getElementById("qrcode").src === "") {
    alert("Silakan buat kode QR terlebih dahulu");
  } else {
    const qrCodeImage = document.getElementById("qrcode");
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qrcode.png";
    link.click();
  }
}
