import PageContainer from "@/layouts/pageContainer";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  return (
    <PageContainer>
      <Link href={"/choose-market"}>
        <Button>Começar</Button>
      </Link>
    </PageContainer>
  );
}
