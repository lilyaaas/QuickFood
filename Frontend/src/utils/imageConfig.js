export const getImageUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"; // Default Image
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_IMAGE_BASE_URL}/${path}`;
};