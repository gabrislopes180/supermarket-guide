import { create } from "zustand";
import { getStoredChat, setStoredChat } from "@/lib/storage/chat-history";
import { Chat, Route } from "@/types/interfaces";
import { clearStoredChat } from "../storage/market-storage";

interface ShoppingState {
  route: Route[];
  currentIndex: number;
  chatHistory: Chat[];
  loading: boolean;

  // Ações
  initChat: () => void;
  addToChat: (message: string, isMe: boolean) => void;
  clearChat: () => void;
  setLoading: (status: boolean) => void;
  setRouteData: (routeData: Route[]) => void;
  markItemAsFound: (isStarting?: boolean) => void; // Adicionamos o parâmetro aqui
  reset: () => void;
}

export const useShoppingStore = create<ShoppingState>((set, get) => ({
  route: [],
  currentIndex: 0,
  chatHistory: [],
  loading: false,

  initChat: () => {
    const stored = getStoredChat();
    if (stored) set({ chatHistory: stored });
  },

  addToChat: (message, isMe) => {
    const newMessage = {
      id: crypto.randomUUID(),
      message,
      isMe,
    };

    set((state) => {
      const updated = [...state.chatHistory, newMessage];
      setStoredChat(updated);
      return { chatHistory: updated };
    });
  },

  setLoading: (status) => set({ loading: status }),

  setRouteData: (routeData) => {
    set({ route: routeData || [], currentIndex: 0 });
  },

  markItemAsFound: (isStarting = false) => {
    const { route, currentIndex, addToChat } = get();

    if (!route || route.length === 0) return;

    const currentItem = route[currentIndex];
    if (!currentItem) return;

    const isLastItem = currentIndex === route.length - 1;

    // 1. MENSAGEM DO USUÁRIO
    if (isStarting) {
      addToChat("Iniciar trajeto!", true);
    } else {
      if (currentItem.item) {
        addToChat(`Já peguei o ${currentItem.item}!`, true);
      } else {
        addToChat("Entendi, vamos continuar!", true);
      }
    }

    // 2. VERIFICA SE ACABOU
    if (isLastItem) {
      addToChat(
        "🎉 Parabéns! Você finalizou sua lista de compras. Pode ir para o caixa!",
        false,
      );
      // Avança o index para sair do alcance do botão de ação na UI
      set({ currentIndex: currentIndex + 1 });
      return;
    }

    // 3. MENSAGEM DO BOT (PRÓXIMO PASSO)
    const nextIndex = isStarting ? currentIndex : currentIndex + 1;
    const nextItem = route[nextIndex];

    let textoBot = "";

    if (nextItem.item) {
      const prefixo = isStarting ? "Vamos lá! 1º Item:" : "Excelente! Próximo:";
      textoBot = `${prefixo} ${nextItem.item.toUpperCase()}\n\n${nextItem.instrucao}`;
    } else {
      textoBot = nextItem.instrucao || "Siga em frente...";
    }
    addToChat(textoBot, false);
    set({ currentIndex: nextIndex });
  },

  clearChat: () => {
    set(() => {
      clearStoredChat();
      return { chatHistory: [] };
    });
  },

  reset: () => set({ route: [], currentIndex: 0, chatHistory: [] }),
}));
