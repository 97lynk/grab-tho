import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Observable } from 'rxjs';


const { Camera } = Plugins;


@Injectable({
    providedIn: 'root'
})
export class ImageProvider {



    /**
     *  Creates a FileReader API object
     */
    private _READER: any = new FileReader();




    /**
     * Create an image object using the Angular SafeResourceUrl
     * Interface property to define a URL as safe for loading
     * executable code from
     */
    private _IMAGE: SafeResourceUrl;




    constructor(public http: HttpClient, private sanitizer: DomSanitizer) { }




    /* ----------------------------------------------------------------

       Mobile environment specific methods - used for iOS/Android only
       ---------------------------------------------------------------- */




    /**
     * Uses the getPhoto method of the Capacitor Camera plugin
     * API to return a file Uri which is then made available
     * to the parent script as a resolved (or rejected) Promise
     * object courtesy of the async/await functions
     *
     */
    async takePicture() {

        /* Define the options for the getPhoto method - particularly the source for where
           the image will be taken from (I.e. the device camera) and how we want the captured
           image data returned (I.e. base64 string or a file uri) */
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });



        /* We need to run the returned Image URL through Angular's DomSanitizer to 'trust'
           this for use within the application (I.e. so that Angular knows this isn't an
           XSS attempt or similarly malicious code) */
        // this._IMAGE = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
        this._IMAGE = image.dataUrl;
        return this._IMAGE;
    }




    /**
     *
     * Uses the getPhoto method of the Capacitor Camera plugin
     * API to return a file Uri from the Photolibrary selected
     * image which is then made available to the parent script
     * as a resolved (or rejected) Promise object courtesy of the
     * async/await functions
     *
     */
    async selectPhoto() {

        /* Define the options for the getPhoto method - particularly how we want the
           image data returned (I.e. base64 string or a file uri) */
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });


        // We return the webPath property of the image object (which contains the image path)
        return image.webPath;
    }




    /* ----------------------------------------------------------------

       Web environment specific methods - used for Progressive Web Apps

       ---------------------------------------------------------------- */



    /**
     * The DOM event that we are capturing from the File input field
     * Uses the FileReader API to capture the input field event,
     * retrieve the selected image and return that as a base64 data
     * URL courtesy of an Observable
     * @method selectImage
     * @params event {any}
     */
    selectImage(event) {
        return new Observable((observer) => {
            this.handleImageSelection(event)
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }




    /**
     * The DOM event that we are capturing from the File input field
     * Uses the FileReader API to capture the input field event,
     * retrieve the selected image and return that as a base64 data
     * URL courtesy of an Observable
     * @method handleImageSelection
     * @params event  {any}
     *
     */
    handleImageSelection(event: any) {
        const file: any = event.target.files[0];

        this._READER.readAsDataURL(file);
        return new Observable((observer) => {
            this._READER.onloadend = () => {
                observer.next(this._READER.result);
                observer.complete();
            };
        });
    }

}
