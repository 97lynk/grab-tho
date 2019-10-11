import { async } from '@angular/core/testing';

export const fetchAsBlob = url => fetch(url)
    .then(response => response.blob());

export const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


export async function fetchAndConvertToBase64(url) {
    return await fetchAsBlob(url).then(convertBlobToBase64);
}

