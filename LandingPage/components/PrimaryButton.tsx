import * as React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
}
export default function PrimaryButton({ text, onClick }: ButtonProps) {
    return (
        <button className="text-white w-fit cursor-pointer text-base px-4 py-3 rounded-sm bg-[#0078d4] hover:bg-[#c03bc4]" onClick={onClick}>
            {text}
        </button>
    )
}