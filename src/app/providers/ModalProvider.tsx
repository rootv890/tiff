"use client";
import { ModalOpenType } from "@/types";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  open: ModalOpenType | null;
  setOpen: (open: ModalOpenType | null) => void;
}

const ModalContext = createContext<ModalContextProps>({
  open: null,
  setOpen: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<ModalOpenType | null>(null);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
