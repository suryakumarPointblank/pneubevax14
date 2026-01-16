export default function BackgroundSection({ children, imageSrc = '/homepage/bg_homepage.png', fixed = false }) {
  if (fixed) {
    return (
      <div className="background-container-fixed">
        <img 
          className="background-image-fixed" 
          src={imageSrc}
          alt="Background"
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
      />
      <div className="background-content">
        {children}
      </div>
    </div>
  );
}
