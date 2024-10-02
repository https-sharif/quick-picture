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
    document.body.style.overflow = "hidden";
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText = `
      position: relative;
      max-width: 70vw;
      max-height: 70vh;
      min-width: 300px;
      min-height: 300px;
      background-color: 	hsl(203, 63%, 20%)
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    // Create image element
    const image = document.createElement("img");
    // Preload the image
    // Create loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.className =
      "flex space-x-2 justify-center items-center bg-white dark:invert";
    loadingSpinner.innerHTML = `
      <span class='sr-only'>Loading...</span>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    `;

    // Create download button
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

    // Create download icon
    const downloadSvg = document.createElement("img");
    if (downloadIcon) {
      downloadSvg.src = downloadIcon;
    } else {
      console.error("Download icon not found");
    }
    downloadSvg.style.objectFit = "contain";
    downloadSvg.style.cssText = `
    width: 80%;
    height: 80%;`;
    downloadButton.classList.add(
      "hover:scale-110",
      "hover:shadow-md",
      "transition-scale",
      "duration-300"
    );

    // Append download button to image container
    downloadButton.appendChild(downloadSvg);

    // Append loading spinner to image container
    imageContainer.appendChild(loadingSpinner);

    // Preload the image
    const preloadedImage = new Image();
    preloadedImage.src = url.raw;
    preloadedImage.onload = () => {
      image.src = url.raw;
      imageContainer.removeChild(loadingSpinner);
      imageContainer.appendChild(image);
      imageContainer.appendChild(downloadButton);
      // Create author element and append to overlay
      if (user && user.links && user.links.html) {
        const author = document.createElement("div");
        author.innerText = `Photo by ${
          user.name || `@` + user.username
        } from Unsplash`;
        author.style.cssText = `
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        text-align: center;
        color: white;
        z-index: 1000;
        cursor: pointer;
        font-weight: bold;
      `;
        author.onclick = () => window.open(user.links.html, "_blank");
        overlay.appendChild(author);
      }
    };
    image.alt = "Image";
    image.style.cssText = `
      max-width: 70vw;
      max-height: 70vh;
      border-radius: 10px;
      border: 5px solid white;
      width: auto;
      height: auto;
      object-fit: contain;
    `;

    // Prevent closing overlay when clicking on image
    image.onclick = (e) => e.stopPropagation();

    // Append image to container and container to overlay
    // imageContainer.appendChild(image);
    overlay.appendChild(imageContainer);

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.removeChild(overlay);
        removeEventListener("keydown", handleKeyDown);
      } else if (e.key === "Enter") {
        downloadButton.click();
      } else if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    addEventListener("keydown", handleKeyDown);

    // Handle download button click
    downloadButton.onclick = (e) => {
      e.stopPropagation();
      const link = document.createElement("a");
      link.href = download;
      link.target = "_blank";
      link.download = `${user?.username}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Close overlay when clicking outside
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      }
    };

    // Append overlay to body
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
              tabIndex={index + 1}
              src={image.url.regular}
              className="rounded-md hover:scale-105 hover:shadow-[20px_35px_60px_-15px_rgba(0,0,0,0.3)] w-96 h-auto object-contain mb-2 hover:z-10 transition-all duration-500"
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.target as HTMLElement).blur();
                  handleImageClick(image);
                }
              }}
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
