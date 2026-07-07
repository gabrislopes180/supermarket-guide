"use client";

import { useShoppingStore } from "@/lib/zustand/store";
import { PromptResponse } from "@/types/interfaces";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const useRequestPrompt = () => {
  const {
    route,
    loading,
    setLoading,
    chatHistory,
    addToChat,
    setRouteData,
    initChat,
    currentIndex,
    markItemAsFound,
    clearChat,
  } = useShoppingStore();

  useEffect(() => {
    initChat();
  }, [initChat]);

  const PromptSchema = z.object({
    market: z.string(),
    prompt: z.string().min(1, "Preencha o campo"),
  });

  type PromptFormSchema = z.infer<typeof PromptSchema>;

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PromptFormSchema>({
    resolver: zodResolver(PromptSchema),
  });

  const submit = async (data: PromptFormSchema) => {
    setLoading(true);
    addToChat(data.prompt, true);
    reset();

    try {
      const req = await fetch(
        "https://supermarket-guide-backend.onrender.com/api/route-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mercadoId: data.market,
            listaTexto: data.prompt,
          }),
        },
      );
      const res: PromptResponse = await req.json();

      if (!req.ok) {
        throw new Error("Erro no servidor ao gerar rota.");
      }

      if (!res.rota || res.rota.rota.length === 0) {
        throw new Error(res.message || "A rota retornada está vazia.");
      }

      console.log("Oq vem do res: ", res.rota.rota);
      setRouteData(res.rota.rota);

      if (res.explicacao) {
        addToChat(res.explicacao, false);
      }
      toast.success(res.message || "Rota gerada!");
    } catch (err: any) {
      console.error(err);
      toast.danger(err.message || "Houve um erro ao enviar a requisição");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    chatHistory,
    setValue,
    handleSubmit,
    register,
    submit,
    errors,
    //
    route,
    currentIndex,
    markItemAsFound,
    clearChat,
  };
};
