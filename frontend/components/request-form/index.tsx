"use client";

import { Button, Spinner, TextArea } from "@heroui/react";
import { useState } from "react";
import { SelectMarket } from "../select-market";
import { CardtTest } from "../card";
import { ArrowRight } from "@gravity-ui/icons";
import { useRequestPrompt } from "@/hooks/request-prompt";
import "ldrs/react/DotWave.css";

export default function RequestForm() {
  const [currentState, setCurrentState] = useState<"select-market" | "form">(
    "select-market",
  );

  const [market, setMarket] = useState<string | null>(null);

  const [hasStarted, setHasStarted] = useState(false);

  const {
    loading,
    chatHistory,
    handleSubmit,
    register,
    setValue,
    submit,
    errors,
    route,
    currentIndex,
    markItemAsFound,
    clearChat,
  } = useRequestPrompt();

  if (currentState === "select-market") {
    return (
      <SelectMarket
        onContinue={(param) => {
          setCurrentState("form");
          setMarket(param);
          setValue("market", param);
        }}
      />
    );
  }

  if (currentState === "form") {
    return (
      <form
        className="w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-140px)] relative animate-fade-in animate-duration-300"
        onSubmit={handleSubmit(submit)}
      >
        {/* Fixed Header (Badge) */}
        <div className="shrink-0 pt-2 pb-4">
          <CardtTest market={market!} />
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto pb-32 px-2 md:px-4 space-y-6 scrollbar-hide">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`flex w-full ${
                chat.isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] px-4 py-3 shadow-sm ${
                  chat.isMe
                    ? "bg-blue-500 text-primary-foreground rounded-2xl rounded-br-sm animate-fade-left animate-duration-300 animate-ease-out"
                    : "bg-default-100 text-foreground rounded-2xl rounded-bl-sm animate-fade-right animate-duration-300 animate-ease-out"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {chat.message}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-4 py-3 bg-default-100 rounded-2xl rounded-bl-sm animate-fade-right animate-duration-300 animate-ease-out">
                <div className="flex gap-1.5 items-center h-6 px-1">
                  <span className="w-2 h-2 rounded-full bg-default-400 animate-bounce"></span>
                  <span
                    className="w-2 h-2 rounded-full bg-default-400 animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-default-400 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {(!route || route.length < 1) && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl pt-10 pb-6 px-4 bg-gradient-to-t from-background via-background/90 to-transparent z-40">
            <div className="relative flex items-end gap-2 bg-default-100/50 backdrop-blur-md p-2 rounded-3xl border border-white/5 shadow-lg">
              <TextArea
                aria-label="Lista de compras"
                min={1}
                max={4}
                variant="secondary"
                className="flex-grow bg-transparent shadow-none hover:bg-transparent focus-within:!bg-transparent group-data-[focus=true]:bg-transparent"
                placeholder="Insira aqui sua lista de compras..."
                {...register("prompt")}
                disabled={!!errors.prompt}
              />
              <Button
                isIconOnly
                variant="primary"
                type="submit"
                className="mb-[6px] mr-1 shrink-0 h-10 w-10 shadow-md rounded-full"
                isDisabled={loading}
              >
                {loading ? (
                  <Spinner size="sm" color="current" />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            </div>
            {errors.prompt && (
              <div className="text-center mt-1">
                <span className="text-xs text-danger font-medium">
                  {errors.prompt.message as string}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Floating Action Buttons (When route is active) */}
        {route && route.length > 0 && currentIndex < route.length && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl pt-10 pb-6 px-4 bg-gradient-to-t from-background via-background/90 to-transparent z-40 flex justify-center">
            {hasStarted ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full max-w-sm font-medium shadow-primary/30 h-14 text-base"
                onClick={() => markItemAsFound(false)}
              >
                {route[currentIndex]?.item
                  ? `Já peguei o ${route[currentIndex].item}`
                  : "Continuar trajeto"}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-full max-w-sm font-medium shadow-primary/30 h-14 text-base"
                onClick={() => {
                  setHasStarted(true);
                  markItemAsFound(true);
                }}
              >
                Iniciar trajeto
              </Button>
            )}
          </div>
        )}
      </form>
    );
  }
}
