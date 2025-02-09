
// import { ReactNode } from "react";

// interface ButtonProps {
//     onClick: () => void;
//     children: ReactNode;
// }

// export default function Button({ onClick, children }: ButtonProps) {
//     return (
//         <button 
//             onClick={onClick} 
//             className="bg-[#ff8433] text-white px-4 py-2 rounded-lg hover:bg-[#d45500]"
//         >
//             {children}
//         </button>
//     );
// }



// Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";  // Make sure the type prop is included
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
