export const mediaUrl = (name?: string | null, fallback = '/default_cover.jpg'): string => {
  if (!name) return fallback;
  if (name.startsWith('/') || name.startsWith('http')) return name;
  return `/media/${name}`;
};