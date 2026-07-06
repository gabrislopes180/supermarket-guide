import PageContainer from "@/layouts/pageContainer";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-8 animate-fade-up animate-duration-500 animate-delay-150 animate-ease-out">
        <p className="text-default-500 text-center max-w-sm text-lg">
          Seu assistente inteligente para otimizar suas compras no supermercado.
        </p>
        <Link href={"/choose-market"}>
          <Button variant="primary" size="lg" className="font-medium">
            Começar Agora <ArrowRight />
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
}
