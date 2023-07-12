import thumbnail from '../../assets/thumbnail.png';

export const thumbnailURItoFile = () => {
  const byteString = window.atob(thumbnail.split(',')[1]);
  const mimeString = thumbnail.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blobFile = new Blob([ab], { type: mimeString });
  return new File([blobFile], 'defaultThumbnail.jpeg');
};
