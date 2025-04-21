document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input-field");

  inputs.forEach((input) => {
    const defaultValue = input.value;

    input.addEventListener("focus", () => {
      if (input.value === defaultValue) {
        input.value = "";
      }
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.value = defaultValue;
      }
    });
  });

  document.getElementById("helpForm").addEventListener("reset", () => {
    setTimeout(() => {
      inputs.forEach((input) => {
        input.value = input.defaultValue;
      });
    }, 0);
  });

  // Get DOM elements
  const fileInput = document.getElementById("fileInput");
  const fileUploadBtn = document.getElementById("fileUploadBtn");
  const cameraBtn = document.getElementById("cameraBtn");
  const cameraModal = document.getElementById("cameraModal");
  const closeModal = document.querySelector(".close");
  const cameraView = document.getElementById("cameraView");
  const captureBtn = document.getElementById("captureBtn");
  const previewContainer = document.getElementById("previewContainer");
  const imagePreview = document.getElementById("imagePreview");
  const removeImageBtn = document.getElementById("removeImageBtn");
  const cameraImage = document.getElementById("cameraImage");
  const helpForm = document.getElementById("helpForm");

  let stream = null;

  // File upload button click handler
  fileUploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // File input change handler
  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewContainer.style.display = "block";
        cameraImage.value = ""; // Clear camera image if exists
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Camera button click handler
  cameraBtn.addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraView.srcObject = stream;
      cameraModal.style.display = "block";
    } catch (err) {
      alert(
        "Unable to access camera. Please make sure you have granted camera permissions."
      );
      console.error("Camera access error:", err);
    }
  });

  // Close modal handler
  closeModal.addEventListener("click", () => {
    cameraModal.style.display = "none";
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  });

  // Capture photo handler
  captureBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    canvas.getContext("2d").drawImage(cameraView, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    imagePreview.src = imageData;
    cameraImage.value = imageData;
    previewContainer.style.display = "block";

    // Close modal and stop camera
    cameraModal.style.display = "none";
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  });

  // Remove image handler
  removeImageBtn.addEventListener("click", () => {
    imagePreview.src = "";
    previewContainer.style.display = "none";
    fileInput.value = "";
    cameraImage.value = "";
  });

  // Form submit handler
  helpForm.addEventListener("submit", (e) => {
    // If no image is selected, remove the image fields from the form
    if (!imagePreview.src) {
      fileInput.remove();
      cameraImage.remove();
    }
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cameraModal) {
      cameraModal.style.display = "none";
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    }
  });
});
