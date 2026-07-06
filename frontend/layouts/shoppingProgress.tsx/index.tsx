"use client";

import { useShoppingStore } from "@/lib/zustand/store";
import { ProgressBar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ShoppingProgress() {
  const { route, currentIndex } = useShoppingStore();
  const pathname = usePathname();

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  if (route && route.length > 0 && pathname === "/choose-market") {
    const percentage = (currentIndex / route.length) * 100;
    const currentItem = route[currentIndex]?.item;

    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 animate-fade-down animate-duration-300 animate-ease-out">
        <div className="bg-background/70 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">
              {currentItem ? `Buscando: ${currentItem}` : "Trajeto concluído"}
            </span>
            <span className="text-default-500 font-semibold">
              {currentIndex} / {route.length}
            </span>
          </div>
          <ProgressBar
            size="sm"
            value={percentage}
            color="accent"
            aria-label="Progresso das compras"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return null;
}
