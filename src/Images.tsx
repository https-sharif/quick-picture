import React from "react";
import "./index.css";
import downloadIcon from "./assets/download.png";

type UserType = {
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  instagram_username: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  twitter_username: string;
} | null;

type Props = {
  images: {
    url: { raw: string; regular: string };
    download: string;
    user: UserType;
  }[];
  haveImages: boolean;
};

const ImageCanvas: React.FC<Props> = ({ images, haveImages }) => {

  const handleImageClick = ({
    url,
    download,
    user,
  }: {
    url: { raw: string; regular: string };
    download: string;
    user: UserType;
  }) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText = `
      position: relative;
      max-width: 70%; max-height: 70%;
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  
    const image = document.createElement("img");
    image.src = url.raw;
    image.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `;
    
    image.onclick = (e) => e.stopPropagation();
    imageContainer.appendChild(image);
    overlay.appendChild(imageContainer);
  
    if (user && user.links && user.links.html) {
      const author = document.createElement("div");
      author.innerText = `Photo by ${user.name || `@` + user.username} from Unsplash`;
      author.style.cssText = `
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        text-align: center;
        color: white;
        z-index: 1000;
        cursor: pointer;
        font-weight: bold;
      `;
      author.onclick = () => window.open(user.links.html, "_blank");
      overlay.appendChild(author);
    }
  
    const downloadButton = document.createElement("div");
    downloadButton.style.cssText = `
      position: absolute;
      bottom: 25px; right: 25px;
      width: 40px; height: 40px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `;
  
    const downloadSvg = document.createElement("img");
    if (downloadIcon) {
      downloadSvg.src = downloadIcon;
    } else {
      console.error("Download icon not found");
    }
    downloadSvg.style.width = "80%";
    downloadSvg.style.height = "80%";
    downloadButton.appendChild(downloadSvg);
    imageContainer.appendChild(downloadButton);


    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Escape") {
      document.body.removeChild(overlay);
      removeEventListener("keydown", handleKeyDown);
      } else if (e.key === "Enter") {
      const link = document.createElement("a");
      link.href = download;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      }
    };

    addEventListener("keydown", handleKeyDown);
  
    downloadButton.onclick = (e) => {
      e.stopPropagation(); // Prevent closing the overlay on download button click
      const link = document.createElement("a");
      link.href = download;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay); // Only close when the overlay is clicked, not the image or button
      }
    };
  
    document.body.appendChild(overlay);
  };
  

  return (
    <div className="select-none mt-20 w-11/12 mb-20 ">
      {!haveImages && (
        <div className="font-bold text-white text-2xl w-full text-center">
          No images found
        </div>
      )}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 ">
        {images.map(
          (
            image: {
              url: { raw: string; regular: string };
              download: string;
              user: UserType;
            },
            index: number
          ) => (
            <img
              key={index}
              src={image.url.regular}
              className="rounded-md hover:scale-105 hover:shadow-[20px_35px_60px_-15px_rgba(0,0,0,0.3)] w-96 h-auto object-contain mb-2 hover:z-10 transition-all duration-500"
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              onError={(e) => {
                console.error("Error loading image:", e);
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ImageCanvas;
