"use client";
import { useEffect, useState } from "react";

interface IConditionDiagnosis {
  conditionData: any;
}

export function ConditionDiagnosis({ conditionData }: IConditionDiagnosis) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: number) => {
    const selectedDiagnosis = conditionData.Diagnosis.find(
      (elem: any) => elem.Key === option,
    );
    setSelected(selectedDiagnosis);
    setIsOpen(false); // Close dropdown on selection
  };

  return (
    <div>
      <div className="mt-6 text-gray-500 focus-within:text-gray-500 fancy-dropdown relative flex flex-col items-center justify-center max-w-lg m-auto">
        <div
          className={`pl-10 w-full py-2 pr-8 rounded-2xl cursor-pointer ${"bg-gray-100 shadow-md"}`}
          onClick={handleClick}
        >
          {selected === null ? "Select Option" : selected.Question}
        </div>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md overflow-y-auto max-h-40 rounded-2xl">
            {conditionData.Diagnosis.map((diagnosis: any) => (
              <li
                key={`${conditionData.Condition}-${diagnosis.Key}`}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                  selected === diagnosis.Key ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={() => handleSelect(diagnosis.Key)}
              >
                {diagnosis.Question}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected?.Medication.map((med: any) => (
        <div className="container flex items-center justify-center m-auto">
          <div className="flex items-center justify-center max-w-lg mt-10 mb-2 mr-2 bg-gray-100 shadow-md rounded-2xl px-4 py-2">
            <a href={`https://www.google.com/search?q=${med}`} target="_blank">
              <p className="pl-2 text-gray-500 font-medium mr-2 underline">
                {med}
              </p>
            </a>
            <span className="text-gray-500">{selected.Dosage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
