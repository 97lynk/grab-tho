import { async } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

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

export const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const bb = new Blob([ab]);
    return bb;
};

export const imageHost = `${environment.serviceUrl}/requests/description-images/`;
