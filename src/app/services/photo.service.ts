import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

public async addNewToGallery() {
  // Take a photo
  console.log("hello world")
  console.log("hello world")

  

  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri, 
    source: CameraSource.Camera, 
    quality: 100 
  });
}

}