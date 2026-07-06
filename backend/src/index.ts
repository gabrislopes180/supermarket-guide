import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";
import {} from "../../backend/src/";

const app = express();

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API do Guia de Supermercado rodando!",
  });
});

app.post("/api/route-list", async (req, res) => {
  const { mercadoId, listaTexto } = req.body;

  if (!mercadoId || !listaTexto) {
    return res
      .status(400)
      .json({ error: "mercadoId e listaTexto são obrigatórios." });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      `${mercadoId}.json`,
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: "Mapa do mercado não encontrado.",
        caminho_buscado: filePath,
      });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const layoutMercado = JSON.parse(fileContent);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = fs.readFileSync(
      path.resolve("src/prompts/mapa-confianca.md"),
      "utf-8",
    );

    const promptFinal = `${systemPrompt}\n\n--- DADOS DA REQUISIÇÃO ---\n\nMapa JSON do Supermercado:\n${fileContent}\n\nLista de itens desejados pelo usuário:\n${listaTexto}`;

    console.log("A processar a otimização da rota...");

    const result = await model.generateContent(promptFinal);
    const respostaTexto = result.response.text();

    // Extrai apenas a estrutura JSON da resposta, ignorando textos antes ou depois
    const match = respostaTexto.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const jsonLimpo = match ? match[0] : respostaTexto;

    const rotaCalculada = JSON.parse(jsonLimpo);

    const explicacaoFinal =
      "Olá! Serei seu GPS pessoal neste supermercado. Usaremos o termo 'Avenida' para os corredores amplos por onde se atravessa a loja, como o espaço entre os caixas e os corredores baixos, ou entre os corredores baixos e os altos. Os 'corredores baixos' são os primeiros corredores com produtos que você verá ao entrar, estendendo-se até a parte inicial da loja. Já os 'corredores altos' ficam após a Avenida Central, sendo a segunda leva de corredores, localizados na parte mais ao fundo/norte do mercado. Um aviso importante: a organização das prateleiras e setores pode mudar. Faremos o possível para ser o mais preciso, mas o produto pode estar na direita ou esquerda, ou ter mudado de corredor.";

    return res.json({
      message: "Rota otimizada com sucesso!",
      mercado: layoutMercado.nome,
      rota: rotaCalculada,
      explicacao: explicacaoFinal,
    });
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
