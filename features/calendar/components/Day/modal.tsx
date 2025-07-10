import { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
    if (!isOpen) return null;

    return (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
    >
        <div
        className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
        >
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
            ✕
        </button>
        {children}
        </div>
    </div>
    );
};
