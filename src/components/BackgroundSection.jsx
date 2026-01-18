'use client';

import { useState, useEffect } from 'react';

export default function BackgroundSection({ children, imageSrc = '/homepage/bg_homepage.png', fixed = false, onImageLoad }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    if (onImageLoad) {
      onImageLoad();
    }
  };

  // Also check if image is already cached
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    if (img.complete) {
      handleImageLoad();
    }
  }, [imageSrc]);

  if (fixed) {
    return (
      <div className="background-container-fixed">
        <img
          className="background-image-fixed"
          src={imageSrc}
          alt="Background"
          onLoad={handleImageLoad}
        />
        <div className="background-content">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="background-container">
      <img
        className="background-image"
        src={imageSrc}
        alt="Background"
        onLoad={handleImageLoad}
      />
      <div className="background-content">
        {children}
      </div>
    </div>
  );
}
