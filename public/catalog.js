// catalog.js

document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');

    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            window.location.href = '/upload';
        });
    }
});
