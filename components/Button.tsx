import classNames from "classnames";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

// Button component
export default function Button({
  loadingText = "Loading",
  isLoading,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classList = classNames(
    "bg-gray-200 text-black border border-gray-600 px-4 py-2 shadow-inner hover:bg-gray-300 active:shadow-none active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500",
    isLoading && "opacity-50 cursor-not-allowed",
    className
  );

  const loadingEl = (
    <span className="flex items-center justify-center gap-2">
      <Spinner />
      {loadingText}...
    </span>
  );

  return (
    <button
      {...rest}
      className={classList}
      disabled={isLoading || rest.disabled}
    >
      {isLoading ? loadingEl : children}
    </button>
  );
}
