import { ChangeEvent, useEffect, useState } from "react";
import { ConditionData as conditions } from "@/utils/conditionData";

import "./search.css";
import { ConditionDiagnosis } from "../conditionDiagnosis";

interface ISearch {
  conditionData: any;
  setSelectedSuggestion: (value: string) => void;
}

export default function Search({
  conditionData,
  setSelectedSuggestion,
}: ISearch) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInput(value);

    const newSuggestions = conditions.filter((condition) =>
      condition.toLowerCase().includes(value.toLowerCase()),
    );

    if (newSuggestions.length) {
      handleOpen();
    } else {
      handleClose();
    }
    setSuggestions(newSuggestions);
  };

  const handleClick = (suggestion: string) => {
    setUserInput(suggestion);
    setSelectedSuggestion(suggestion);
    handleClose();
    setSuggestions([]);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const clearInput = () => {
    setUserInput("");
    setSelectedSuggestion("");
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".homeopathic-assistant")) {
        setSuggestions([]);
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center mt-20 search-sec">
      <div className="flex flex-col max-w-lg w-full">
        <div className="text-3xl font-medium text-slate-50	 leading-6 mx-auto mb-10">
          Homeopathic Health Assistant
        </div>

        <div className="text-gray-500 focus-within:text-gray-500 relative">
          <input
            className={`w-full py-2 pl-10 pr-4 rounded-t-2xl bg-gray-100 shadow-md ${
              isOpen ? "rounded-b-none" : "rounded-2xl"
            } focus:outline-none border-none focus:ring-transparent`}
            placeholder="Search conditions"
            value={userInput}
            onChange={handleChange}
          />

          {userInput.length > 0 && (
            <button
              className="absolute right-2 top-1 p-1 cursor-pointer focus:outline-none"
              onClick={clearInput}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                />
              </svg>
            </button>
          )}
          {suggestions.length > 0 && (
            <ul
              className={`scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 absolute top-full left-0 w-full shadow-md overflow-y-auto max-h-40 rounded-b-2xl bg-white ${
                isOpen ? "rounded-t-none" : "rounded-2xl"
              }`}
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {conditionData && <ConditionDiagnosis conditionData={conditionData} />}
      </div>
    </div>
  );
}
