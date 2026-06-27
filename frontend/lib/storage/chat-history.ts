import { Chat } from "@/types/interfaces";

const KEY = "chat";

export const getStoredChat = () => {
  if (typeof window === "undefined") return;

  const stored = sessionStorage.getItem(KEY);

  if (!stored) return;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Erro no chat");
    return [];
  }
};

export const setStoredChat = (chatContent: Chat[]) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(chatContent));
};

export const clearStoredChat = () => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(KEY);
};
