"use client";

import { useShoppingStore } from "@/lib/zustand/store";
import { Card, CardContent } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ShoppingProgress() {
  const { route, currentIndex } = useShoppingStore();
  const pathname = usePathname();

  const percentage = (currentIndex / route.length) * 100;

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  if (route && route.length > 0 && pathname === "/choose-market") {
    return (
      <Card className="w-full rounded-b-xl z-50 rounded-t-none fixed top-0 ">
        <CardContent>
          <span>
            {currentIndex} /{route.length}
          </span>
          <div className="w-full h-2 bg-white rounded-full text-sm font-medium">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
