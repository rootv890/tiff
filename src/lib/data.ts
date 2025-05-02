import { MessageType } from "@/types";
import { Message } from "react-hook-form";

export const serverAvatarsLink: {
  id: string;
  url: string;
  publicId: string;
}[] = [
  {
    id: "1",
    url:
      "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641230/server_3_l7ww5h.jpg",

    publicId: "server_3",
  },
  {
    id: "2",
    url:
      "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641230/server_3_l7ww5h.jpg",
    publicId: "server_3",
  },
  {
    id: "3",
    url:
      "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server_2_nsygnw.jpg",
    publicId: "server_2",
  },
  {
    id: "4",
    url:
      "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
    publicId: "server_",
  },
  {
    id: "5",
    url:
      "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
    publicId: "server_",
  },
];
export const tempMessages: MessageType[] = [
  {
    id: "1",
    content: "Hey everyone! 👋",
    authorId: "1",
    channelId: "1",
    replyToId: null,
    isEdited: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "johndoe",
      pronouns: "he",
      bio: "Full-stack dev and coffee addict.",
      banner: "",
      status: "online",
      acceptTos: true,
    },
  },
  {
    id: "2",
    content: "Hey John! Nice to see you here.",
    authorId: "2",
    channelId: "1",
    replyToId: "1",
    isEdited: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "janesmith",
      pronouns: "she",
      bio: "Frontend designer with a love for UX.",
      banner: "",
      status: "idle",
      acceptTos: true,
    },
  },
  {
    id: "3",
    content: "What's up, folks?",
    authorId: "3",
    channelId: "1",
    replyToId: null,
    isEdited: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "3",
      name: "Mike Lin",
      email: "mike.lin@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "mikelin",
      pronouns: "they",
      bio: "Always hacking something 🔧",
      banner: "",
      status: "online",
      acceptTos: true,
    },
  },
  {
    id: "4",
    content: "Just deployed a new update. Check it out! 🚀",
    authorId: "1",
    channelId: "1",
    replyToId: null,
    isEdited: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "johndoe",
      pronouns: "he",
      bio: "Full-stack dev and coffee addict.",
      banner: "",
      status: "online",
      acceptTos: true,
    },
  },
  {
    id: "5",
    content: "Nice! I'll test it out now.",
    authorId: "2",
    channelId: "1",
    replyToId: "4",
    isEdited: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "janesmith",
      pronouns: "she",
      bio: "Frontend designer with a love for UX.",
      banner: "",
      status: "idle",
      acceptTos: true,
    },
  },
  {
    id: "6",
    content: "Hi all, just joined the channel 👀",
    authorId: "4",
    channelId: "1",
    replyToId: null,
    isEdited: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "4",
      name: "Aria Patel",
      email: "aria.patel@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image:
        "https://res.cloudinary.com/drhdaopqy/image/upload/v1744641229/server__di2a1a.jpg",
      username: "ariapatel",
      pronouns: "she",
      bio: "Product manager who loves building communities.",
      banner: "",
      status: "online",
      acceptTos: true,
    },
  },
];
