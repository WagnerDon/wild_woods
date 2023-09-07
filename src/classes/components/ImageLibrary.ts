export class ImageLibrary {
 private static readonly images: Record<string, HTMLImageElement> = {}; // Or index signature

 static loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
   const image = new Image();
   image.src = url;
   image.onload = () => resolve(image);
   image.onerror = reject;
  });
 }

 static async loadImages() {
  const response = await fetch("../assets/data/images.json");
  const json = await response.json();
  const imageFiles = json.images;
  for (const file of imageFiles) {
   const { name, url } = file;
   const image = await ImageLibrary.loadImage(url);
   ImageLibrary.images[name] = image;
  }
 }

 static getImage(name: string) {
  return ImageLibrary.images[name];
 }
}
