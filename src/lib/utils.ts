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
