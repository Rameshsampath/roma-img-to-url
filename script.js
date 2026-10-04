```javascript
/*
=========================================================
xRom4ㅤャ IMG TO URL
IMAGE UPLOAD SCRIPT
=========================================================
*/


// =======================================================
// SETTINGS
// =======================================================

// HARD LIMIT = 200 MB

const MAX_FILE_SIZE =
  200 * 1024 * 1024;


// Free image upload API

const UPLOAD_API =
  "https://catbox.moe/user/api.php";


// =======================================================
// ELEMENTS
// =======================================================

const fileInput =
  document.getElementById("fileInput");

const dropArea =
  document.getElementById("dropArea");

const progressContainer =
  document.getElementById("progressContainer");

const progressBar =
  document.getElementById("progressBar");

const progressPercent =
  document.getElementById("progressPercent");

const fileName =
  document.getElementById("fileName");

const status =
  document.getElementById("status");

const result =
  document.getElementById("result");

const preview =
  document.getElementById("preview");

const imageUrl =
  document.getElementById("imageUrl");

const copyButton =
  document.getElementById("copyButton");

const openButton =
  document.getElementById("openButton");

const anotherButton =
  document.getElementById("anotherButton");


// =======================================================
// CLICK UPLOAD
// =======================================================

dropArea.addEventListener(
  "click",
  () => {

    fileInput.click();

  }
);


// =======================================================
// FILE SELECTED
// =======================================================

fileInput.addEventListener(
  "change",
  () => {

    const file =
      fileInput.files[0];

    if (!file) return;

    uploadImage(file);

  }
);


// =======================================================
// DRAG OVER
// =======================================================

dropArea.addEventListener(
  "dragover",
  (event) => {

    event.preventDefault();

    dropArea.classList.add(
      "drag"
    );

  }
);


// =======================================================
// DRAG LEAVE
// =======================================================

dropArea.addEventListener(
  "dragleave",
  () => {

    dropArea.classList.remove(
      "drag"
    );

  }
);


// =======================================================
// DROP
// =======================================================

dropArea.addEventListener(
  "drop",
  (event) => {

    event.preventDefault();

    dropArea.classList.remove(
      "drag"
    );

    const file =
      event.dataTransfer.files[0];

    if (!file) return;

    uploadImage(file);

  }
);


// =======================================================
// STATUS
// =======================================================

function showStatus(
  message,
  error = false
) {

  status.textContent =
    message;

  status.style.display =
    "block";

  if (error) {

    status.classList.add(
      "error"
    );

  } else {

    status.classList.remove(
      "error"
    );

  }

}


// =======================================================
// RESET
// =======================================================

function resetPage() {

  progressContainer.style.display =
    "none";

  result.style.display =
    "none";

  status.style.display =
    "none";

  progressBar.style.width =
    "0%";

  progressPercent.textContent =
    "0%";

  fileInput.value =
    "";

}


// =======================================================
// UPLOAD IMAGE
// =======================================================

function uploadImage(file) {


  // -----------------------------------------------------
  // CHECK IMAGE
  // -----------------------------------------------------

  if (
    !file.type.startsWith("image/")
  ) {

    showStatus(
      "Please select a valid image file.",
      true
    );

    return;

  }


  // -----------------------------------------------------
  // 200 MB LIMIT
  // -----------------------------------------------------

  if (
    file.size > MAX_FILE_SIZE
  ) {

    showStatus(
      "Upload blocked! Maximum file size is 200 MB.",
      true
    );

    return;

  }


  // -----------------------------------------------------
  // START UI
  // -----------------------------------------------------

  progressContainer.style.display =
    "block";

  fileName.textContent =
    file.name;

  progressBar.style.width =
    "0%";

  progressPercent.textContent =
    "0%";

  showStatus(
    "Uploading image..."
  );


  // -----------------------------------------------------
  // FORM DATA
  // -----------------------------------------------------

  const formData =
    new FormData();

  formData.append(
    "reqtype",
    "fileupload"
  );

  formData.append(
    "fileToUpload",
    file,
    file.name
  );


  // -----------------------------------------------------
  // XHR
  // -----------------------------------------------------

  const xhr =
    new XMLHttpRequest();


  xhr.open(
    "POST",
    UPLOAD_API,
    true
  );


  // -----------------------------------------------------
  // UPLOAD PROGRESS
  // -----------------------------------------------------

  xhr.upload.onprogress =
    function(event) {

      if (
        event.lengthComputable
      ) {

        const percent =
          Math.round(
            (
              event.loaded /
              event.total
            ) * 100
          );

        progressBar.style.width =
          percent + "%";

        progressPercent.textContent =
          percent + "%";

      }

    };


  // -----------------------------------------------------
  // SUCCESS / RESPONSE
  // -----------------------------------------------------

  xhr.onload =
    function() {

      if (
        xhr.status >= 200 &&
        xhr.status < 300
      ) {

        const url =
          xhr.responseText.trim();


        // Check returned URL

        if (
          /^https?:\/\//i.test(url)
        ) {

          progressBar.style.width =
            "100%";

          progressPercent.textContent =
            "100%";


          // Put URL

          imageUrl.value =
            url;


          // Preview

          preview.src =
            url;

          preview.style.display =
            "block";


          // Show result

          result.style.display =
            "block";


          showStatus(
            "Upload complete! Your image URL is ready."
          );

        } else {

          showStatus(
            "Upload failed: " + url,
            true
          );

        }

      } else {

        showStatus(
          "Upload failed. Please try again.",
          true
        );

      }

    };


  // -----------------------------------------------------
  // NETWORK ERROR
  // -----------------------------------------------------

  xhr.onerror =
    function() {

      showStatus(
        "Network error. Please try again.",
        true
      );

    };


  // -----------------------------------------------------
  // SEND
  // -----------------------------------------------------

  xhr.send(
    formData
  );

}


// =======================================================
// COPY URL
// =======================================================

copyButton.addEventListener(
  "click",
  async () => {

    if (!imageUrl.value)
      return;


    try {

      await navigator.clipboard.writeText(
        imageUrl.value
      );

      showStatus(
        "URL copied successfully!"
      );

    } catch {

      imageUrl.select();

      document.execCommand(
        "copy"
      );

      showStatus(
        "URL copied!"
      );

    }

  }
);


// =======================================================
// OPEN URL
// =======================================================

openButton.addEventListener(
  "click",
  () => {

    if (!imageUrl.value)
      return;

    window.open(
      imageUrl.value,
      "_blank",
      "noopener"
    );

  }
);


// =======================================================
// UPLOAD ANOTHER
// =======================================================

anotherButton.addEventListener(
  "click",
  () => {

    resetPage();

    fileInput.click();

  }
);
```
