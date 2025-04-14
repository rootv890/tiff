import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { nanoid } from "nanoid";

const prefixMap = {
    server: "SR_",
    category: "CG_",
    channel: "CH_",
    user: "US_",
    message: "MS_",
    emoji: "EM_",
    system: "SYS_",
};

type IDtype = keyof typeof prefixMap;
export const generateId = (
    type: IDtype,
    length = 8,
): string => {
    const prefix = prefixMap[type];
    if (!prefix) throw new Error("Invalid ID type");

    return `${prefix}${nanoid(length)}`;
};

export const generateSuffixId = (): string => {
    return nanoid(6);
};

export const getBaseUrl = () => {
    if (typeof window !== "undefined") return window.location.origin;
    return process.env.NEXT_PUBLIC_URL
        ? `https://${process.env.NEXT_PUBLIC_URL}`
        : "http://localhost:3000";
};

export const imageReader = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = (error) => reject(error);
    });
};

export const randomServerAvatar = () => {
    return;
};
