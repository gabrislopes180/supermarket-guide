"use client";

import {
  Button,
  Card,
  CardDescription,
  Spinner,
  TextArea,
} from "@heroui/react";
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
        className="max-w-100 md:max-w-280 animate-fade-right animate-duration-[300ms] animate-ease-linear"
        onSubmit={handleSubmit(submit)}
      >
        <CardtTest market={market!} />
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex mb-4 ${
              chat.isMe ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%]  ${chat.isMe ? "bg-accent rounded-br-none text-white animate-fade-left animate-duration-200 animate-ease-out" : "rounded-bl-none animate-fade-right animate-duration-200 animate-ease-out"}`}
            >
              <CardDescription
                className={`${chat.isMe && "bg-accent rounded-br-none text-white"}`}
              >
                {chat.message}
              </CardDescription>
            </Card>
          </div>
        ))}

        {route && route.length > 0 && currentIndex < route.length && (
          <>
            {hasStarted ? (
              <Button
                className={"w-full bg-blue-600 text-white"}
                onClick={() => markItemAsFound(false)}
              >
                {route[currentIndex]?.item
                  ? `Já peguei o ${route[currentIndex].item}`
                  : "Continuar trajeto"}
              </Button>
            ) : (
              <Button
                className={"w-full text-white"}
                onClick={() => {
                  setHasStarted(true);
                  markItemAsFound(true);
                }}
              >
                Iniciar trajeto
              </Button>
            )}
          </>
        )}

        {loading && (
          <Card className="pulse my-5 animate-fade-right animate-duration-200 animate-ease-out">
            <CardDescription>
              Um momento, sua rota está sendo gerada...
            </CardDescription>
          </Card>
        )}
        {(!route || route.length < 1) && (
          <div className="relative w-81 h-32 ">
            <TextArea
              aria-label="Quick project update"
              className={`h-full w-full ${errors.prompt && "border border-red-400"}`}
              placeholder="Manda Bala na lista do supermercado..."
              {...register("prompt")}
            />
            {errors.prompt && (
              <p className="text-xs text-red-400 font-medium">
                {errors.prompt?.message}
              </p>
            )}
            <Button
              variant="primary"
              type="submit"
              className="absolute bottom-3 right-3"
              isDisabled={loading}
            >
              {loading ? <Spinner color="current" size="sm" /> : <ArrowRight />}
            </Button>
          </div>
        )}
      </form>
    );
  }
}
