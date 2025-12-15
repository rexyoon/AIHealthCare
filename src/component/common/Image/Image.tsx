import { useState } from 'react';
import { cn } from '@/utils/cn';

type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const Image = ({ src, alt = '', className }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className={cn('bg-gray2 flex items-center justify-center', className)} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoading(false)}
      onError={() => setHasError(true)}
      className={cn('object-cover', isLoading ? 'opacity-70 blur-sm' : '', className)}
    />
  );
};

export default Image;
