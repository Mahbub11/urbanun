import React from "react";

interface PropsType {
  title: string;
}

export default function CustomButton({ title }: PropsType) {
  return (
    <div className="bg-yellow-200 w-fit overflow-hidden group">
      <button
        className="bg-yellow-300 relative px-3 py-3 font-[600]
                   overflow-hidden group"
      >
        <span className="relative z-10">{title}</span>
        {/* Pseudo-element for filling effect */}
        <span
          className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-[1500ms] w-0"
        ></span>
      </button>
    </div>
  );
}
