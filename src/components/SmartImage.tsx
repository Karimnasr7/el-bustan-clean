// src/components/SmartImage.tsx
interface Props {
  src: string;
  alt: string;
  className?: string;
  crop?: { x: number; y: number; width: number; height: number };
  focal?: { x: number; y: number };
  objectFit?: 'cover' | 'contain' | 'fill';
}

export const SmartImage: React.FC<Props> = ({
  src,
  alt,
  className = '',
  crop,
  focal,
  objectFit = 'cover',
}) => {
  const style: React.CSSProperties = {
    objectFit,
    objectPosition: focal
      ? `${focal.x * 100}% ${focal.y * 100}%`
      : crop
      ? `${(crop.x + crop.width / 2) * 100}% ${(crop.y + crop.height / 2) * 100}%`
      : 'center',
    clipPath: crop
      ? `inset(${crop.y * 100}% ${(1 - crop.x - crop.width) * 100}% ${(1 - crop.y - crop.height) * 100}% ${crop.x * 100}%)`
      : undefined,
  };

  return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
};