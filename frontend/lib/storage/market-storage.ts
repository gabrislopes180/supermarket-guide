const KEY = "market";

export const getStoredMarkett = () => {
  if (typeof window === "undefined") return;

  const stored = sessionStorage.getItem(KEY);

  if (!stored) return;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Erro");
    return [];
  }
};

export const setStoredMarket = (market: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(market));
};

export const clearStoredChat = () => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(KEY);
};
