import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];

  // other code

  constructor() { }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  private async getPhotoFile(cameraPhoto: CameraPhoto, 
    fileName: string): Promise<Photo> {
return {
filepath: fileName,
webviewPath: cameraPhoto.webPath
};
}

 private async savePicture(cameraPhoto: CameraPhoto) { 
     // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(cameraPhoto);

  // Write the file to the data directory
  const fileName = new Date().getTime() + '.jpeg';
  await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: FilesystemDirectory.Data
  });

  // Get platform-specific photo filepaths
  return await this.getPhotoFile(cameraPhoto, fileName);

 }


public async addNewToGallery() {
  // Take a photo
  console.log("hello world")
  console.log("hello world")

  

  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri, 
    source: CameraSource.Camera, 
    quality: 100 
  });

    // Save the picture and add it to photo collection
    const savedImageFile:any = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
  

  this.photos.unshift({
    filepath: "sn...",
    webviewPath: capturedPhoto.webPath
  });

}



}





interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}