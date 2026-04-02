
const Button = ({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 cursor-pointer ${rest.className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;