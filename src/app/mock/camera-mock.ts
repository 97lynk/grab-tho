import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

export class CameraMock extends Camera {

    getPictures(options: CameraOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve("C:/Users/anhtu/Downloads/boat.jpg");
          });
    }
}