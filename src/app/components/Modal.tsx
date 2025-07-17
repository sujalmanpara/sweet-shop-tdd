'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-card rounded-lg p-8 shadow-2xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-foreground text-2xl font-bold hover:text-primary transition-colors"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
} 