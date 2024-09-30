import React from "react";
import "./index.css";

type Props = {
  images: { url: string }[];
  haveImages: boolean;
};

const ImageCanvas: React.FC<Props> = ({ images, haveImages }) => {
  return (
    <div className="select-none mt-20 w-11/12 columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-2 mb-20 no-scrollbar">
      {!haveImages && <p>No images found</p>}
      {images.map((image: { url: string }, index: number) => (
        <img
          key={index}
          src={image.url}
          className="rounded-md hover:scale-105 hover:shadow-[20px_35px_60px_-15px_rgba(0,0,0,0.3)] w-96 h-auto object-contain mb-2 hover:z-10 transition-all duration-500"
          alt={`Image ${index + 1}`}
          onError={(e) => {
            console.error("Error loading image:", e);
            (e.target as HTMLImageElement).src = "path/to/fallback/image.png";
          }}
        />
      ))}
    </div>
  );
};

export default ImageCanvas;
