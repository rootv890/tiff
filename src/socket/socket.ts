//  for client side of the socket
"use client";
import { io, Socket } from "socket.io-client";

// types
export type SocketEvents = {
  "message": (data: { message: string }) => void;
};

export type ClientToServerEvents = {
  "message": (data: { message: string }) => void;
};

export type ServerToClientEvents = {
  "message": (data: { message: string }) => void;
};

const isBrowser = typeof window !== "undefined"; // true-> client, false-> server

const socket: Socket<ServerToClientEvents, ClientToServerEvents> | {} =
  isBrowser ? io(window.location.origin) : {};


export default socket;

/*
    !NOTE :
  The isBrowser check is important, as it prevents Next.js from trying to create a Socket.IO client when doing server-side rendering.
*/
