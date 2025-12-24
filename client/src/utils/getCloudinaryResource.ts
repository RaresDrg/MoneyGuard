const BASE_URL = "https://res.cloudinary.com/db73szjbz";

export function getCloudinaryVideo(name: string) {
  return {
    src: `${BASE_URL}/video/upload/f_auto,q_auto/${name}`,
    poster: `${BASE_URL}/video/upload/so_0,f_auto,q_auto/${name}`,
  };
}

export function getCloudinaryImage(name: string) {
  return `${BASE_URL}/image/upload/f_auto,q_auto/${name}`;
}
