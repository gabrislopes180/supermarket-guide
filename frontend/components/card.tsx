import { Card, Link } from "@heroui/react";
import { MapPin } from "@gravity-ui/icons";

export function CardtTest({ market }: { market: string }) {
  return (
    <Card className="w-[260px] my-5">
      <MapPin
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        role="img"
      />
      <Card.Header>
        <Card.Title>Mercado Selecionado:</Card.Title>
        <Card.Description>{market}</Card.Description>
      </Card.Header>
    </Card>
  );
}
