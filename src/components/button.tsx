interface IButton {
  type: "submit" | "reset" | "button" | undefined;
  buttonLabel: string;
  onClick?: () => void;
}

export function Button(props: IButton) {
  return (
    <div>
      <button
        onClick={props && props.onClick}
        type={props.type}
        className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        {props.buttonLabel}
      </button>
    </div>
  );
}
