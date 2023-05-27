import { useState } from 'react';
import IsLoading from './IsLoading';

interface LoadingImageProps {
  src: string;
  alt: string;
}

const LoadingImage = ({ src, alt }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='cart_img_wrap' style={{position: 'relative'}}>
      {isLoading && <IsLoading />}
      <img 
        className="product_img"
        src={src} 
        alt={alt} 
        onLoad={handleImageLoad} 
        style={isLoading ? {visibility: 'hidden'} : {}} 
      />
    </div>
  );
}

export default LoadingImage;