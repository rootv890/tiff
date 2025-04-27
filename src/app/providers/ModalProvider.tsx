"use client";
import { CategoryType, ChannelType, ModalOpenType } from "@/types";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  open: ModalOpenType | null;
  setOpen: (open: ModalOpenType | null) => void;
  categoryData: CategoryType | null;
  setCategoryData: (data: CategoryType) => void;
  channelData: ChannelType | null;
  setChannelData: (data: ChannelType) => void;
  from: "server" | "category";
  setFrom: (from: "server" | "category") => void;
}

const ModalContext = createContext<ModalContextProps>({
  open: null,
  setOpen: () => {},
  categoryData: null,
  setCategoryData: () => {},
  channelData: null,
  setChannelData: () => {},
  from: "server",
  setFrom: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<ModalOpenType | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryType | null>(null);
  const [from, setFrom] = useState<"server" | "category">("server");
  const [channelData, setChannelData] = useState<ChannelType | null>(null);
  return (
    <ModalContext.Provider value={{ open, setOpen, setCategoryData, categoryData, from, setFrom  ,channelData, setChannelData}}>
      {children}
    </ModalContext.Provider>
  );
};
