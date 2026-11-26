export const mediaUrl = (name?: string | null, fallback = '/default_cover.jpg'): string => {
  const base = import.meta.env.BASE_URL || '/';

  if (!name) {
    return `${base}${fallback.replace(/^\//, '')}`;
  }
  if (name.startsWith('http://localhost:9000/posttrace/')) {
    return `/media/${name.replace('http://localhost:9000/posttrace/', '')}`;
  }
  if (name.startsWith('http')) {
    return name;
  }
  if (name.startsWith('/')) {
    return `${base}${name.slice(1)}`;
  }
  return `/media/${name}`;
};