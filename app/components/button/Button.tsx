import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";  
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className }) => {
  return (
    <button onClick={onClick} type={type} className={`${className} bg-[#ff8433] text-white px-4 py-2 rounded-lg hover:bg-[#d45500]`}>
      {children}
    </button>
  );
};

export default Button;
