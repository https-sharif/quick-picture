import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./index.css";

type Props = {
  prompt: string;
  loading: boolean;
  handleClick: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | null;
  queryType: string;
  setQueryType: (queryType: string) => void;
};

const Form: React.FC<Props> = ({
  prompt,
  onInputChange,
  loading,
  handleClick,
  error,
  queryType,
  setQueryType,
}) => {
  const [randomizedIndex, setRandomizedIndex] = useState<number>(
    Math.floor(Math.random() * 10)
  );

  const placeholdersValue: string[] = [
    "Cats",
    "Foods",
    "Birds",
    "Flowers",
    "Mountains",
    "Beaches",
    "Sunsets",
    "Sunrises",
    "Stars",
    "Galaxies",
  ];

  useEffect(() => {
    setRandomizedIndex(Math.floor(Math.random() * 10));
  }, [prompt]);

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <div className="mb-16">
        <form className="flex items-center flex-col justify-center relative mt-20">
          {queryType !== "random" && (
            <div>
              <textarea
                id="prompt"
                placeholder={queryType !== 'user' ? placeholdersValue[randomizedIndex] : 'Enter a username'}
                disabled={loading}
                value={prompt}
                rows={2}
                onChange={(e) => {
                  onInputChange(e);
                  autoResizeTextarea(e.target);
                }}
                onKeyDown={handleKeyPress}
                className="w-96 h-20 disabled:opacity-80 border-2 placeholder:text-[#84D2F6] mb-10 text-[#133C55] bg-[#91E5F6] rounded-lg border-[#386FA4] outline-none focus:border-[#133C55] resize-none text-center text-2xl p-2 transition-colors duration-500"
              />
              <p className="font-bold text-white absolute bottom-12 right-1">
                {prompt.length}/100
              </p>
            </div>
          )}

          <Button
            loading={loading}
            onClick={handleClick}
            queryType={queryType}
            setQueryType={setQueryType}
          />

          {error && (
            <p className="h-16 text-red-500 font-bold absolute -bottom-20">
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
