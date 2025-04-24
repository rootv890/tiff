"use client";
import { CategoryType, ModalOpenType } from "@/types";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  open: ModalOpenType | null;
  setOpen: (open: ModalOpenType | null) => void;
  categoryData: CategoryType | null;
  setCategoryData: (data: CategoryType) => void;
}

const ModalContext = createContext<ModalContextProps>({
  open: null,
  setOpen: () => {},
  categoryData: null,
  setCategoryData: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<ModalOpenType | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryType | null>(null);
  return (
    <ModalContext.Provider value={{ open, setOpen, setCategoryData, categoryData }}>
      {children}
    </ModalContext.Provider>
  );
};
