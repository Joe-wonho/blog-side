import defaultProfile from '../../assets/profile.png';

export const profileURItoFile = () => {
  // atob()는 Base64를 디코딩하는 메서드
  const byteString = window.atob(defaultProfile.split(',')[1]);

  const mimeString = defaultProfile.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);

  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blobFile = new Blob([ab], { type: mimeString });
  return new File([blobFile], 'defaultProfile.jpeg');
};
