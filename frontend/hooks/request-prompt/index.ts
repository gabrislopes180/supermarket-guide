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

  // const res: PromptResponse = {
  //   message: "Rota otimizada com sucesso!",
  //   mercado: "Supermercado Principal",
  //   rota: {
  //     message: "Rota otimizada com sucesso!",
  //     mercado: "Supermercado Principal",
  //     explicacao:
  //       "A rota foi planejada para iniciar no centro da loja e seguir em direção ao lado esquerdo, o ponto mais distante da entrada, minimizando o trajeto de retorno.",
  //     rota: [
  //       {
  //         item: "nuggets",
  //         corredor_destino: "ilha_congelados",
  //         instrucao:
  //           "Da entrada, siga pela Avenida dos Caixas em direção ao fundo da loja. Ao chegar na Avenida Central, a ilha de congelados estará à sua direita, próxima ao C3L. Os nuggets ficam na ilha, no lado esquerdo.",
  //         status: "pendente",
  //       },
  //       {
  //         item: "suco de uva",
  //         corredor_destino: "geladeira_esquerda",
  //         instrucao:
  //           "Após pegar os nuggets, continue reto pela Avenida Central no sentido da parede esquerda da loja. Ao chegar na parede, você verá a geladeira das bebidas frias. O suco de uva, parte das bebidas frias em geral, estará no lado mais próximo à entrada (sul) dessa geladeira.",
  //         status: "pendente",
  //       },
  //     ],
  //   },
  //   explicacao:
  //     "Olá! Serei seu GPS pessoal neste supermercado. Usaremos o termo 'Avenida' para os corredores amplos por onde se atravessa a loja, como o espaço entre os caixas e os corredores baixos, ou entre os corredores baixos e os altos. Os 'corredores baixos' são os primeiros corredores com produtos que você verá ao entrar, estendendo-se até a parte inicial da loja. Já os 'corredores altos' ficam após a Avenida Central, sendo a segunda leva de corredores, localizados na parte mais ao fundo/norte do mercado. Um aviso importante: a organização das prateleiras e setores pode mudar. Faremos o possível para ser o mais preciso, mas o produto pode estar na direita ou esquerda, ou ter mudado de corredor.",
  // };

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
      const req = await fetch("http://localhost:8000/api/route-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mercadoId: data.market,
          listaTexto: data.prompt,
        }),
      });
      const res: PromptResponse = await req.json();

      if (!req.ok) {
        throw new Error(res.message || "Erro retornado pelo servidor.");
      }

      if (!res.rota || res.rota.rota.length === 0) {
        throw new Error(res.message || "A rota retornada está vazia.");
      }

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
