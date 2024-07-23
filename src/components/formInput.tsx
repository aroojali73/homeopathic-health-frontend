import {
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from "react";

interface IFormInput {
  htmlFor: string;
  labelText: string;
  placeholder: string;
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  autoComplete: HTMLInputAutoCompleteAttribute;
  isRequired: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput(props: IFormInput) {
  return (
    <div>
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-500 pl-2"
      >
        {props.labelText}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          required={props.isRequired}
          className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
