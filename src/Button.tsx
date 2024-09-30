import React, { useEffect, useState } from "react";
import "./Button.css";

type Props = {
  onClick: () => void;
  loading: boolean;
  queryType: string;
  setQueryType: (queryType: string) => void;
};

const Button: React.FC<Props> = ({
  onClick,
  loading,
  queryType,
  setQueryType,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if(loading) return
    event.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  const queryName = () => {
    switch (queryType) {
      case "random":
        return "Random Images";
      case "user":
        return "Search Users";
      default:
        return "Search";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !(event.target as Element).closest(".relative.inline-block")
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const buttonName: string = queryName();

  return (
    <div className="relative inline-block">
      <div className="h-10 m-w-200 items-center flex justify-center rounded-2xl select-none min-w-200 text-white font-bold hover:shadow-md hover:shadow-[#3b7ab8] transition-shadow duration-500">
        <button
          className="h-10 w-10/12 bg-[#386FA4] rounded-l-2xl active:bg-[#2b5680] disabled:opacity-50"
          type="button"
          disabled={loading}
          onClick={onClick}
        >
          {loading ? "Loading..." : buttonName}
        </button>
        <span
          className={`${loading && 'opacity-50'} flex h-10 items-center justify-center rounded-r-2xl active:bg-[#2b5680] right-0 bg-[#386FA4] w-2/12`}
          onClick={toggleDropdown}
          tabIndex={0}

        >
          ▼
        </span>
      </div>

      {isDropdownOpen && (
        <div className="border-2 border-[#386FA4] rounded-2xl absolute z-[1] bg-[#91E5F6] -right-16 text-[#386FA4] select-none font-bold mt-2">
          <div
            className="p-3 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("");
              console.log("Search for random images");
            }}
          >
            Search
          </div>
          <div
            className="p-3 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("random");
              console.log("Search for random images");
            }}
          >
            Random Images
          </div>
          <div
            className="p-3 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("user");
              console.log("Search for users");
            }}
          >
            Search Users
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
