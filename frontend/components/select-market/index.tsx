import { Button, Key, Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";
import { ArrowRight } from "@gravity-ui/icons";

interface SelectMarketProps {
  onContinue: (marketId: string) => void;
}
export function SelectMarket({ onContinue }: SelectMarketProps) {
  const [selectedMarket, setSelectedMarket] = useState<Key | null>(null);

  const handleContinue = () => {
    if (selectedMarket) {
      onContinue(selectedMarket.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto space-y-8 animate-fade-up animate-duration-500 animate-ease-out">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Onde vamos comprar?
        </h2>
        <p className="text-default-500 text-sm">
          Escolha o supermercado para traçarmos a rota ideal.
        </p>
      </div>

      <Select
        className="w-full"
        placeholder="Selecione um mercado"
        value={selectedMarket}
        onChange={setSelectedMarket}
      >
        <Label className="sr-only">Selecione o mercado</Label>
        <Select.Trigger className="h-14 bg-default-100 hover:bg-default-200 transition-colors">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="confianca-max" textValue="confianca-max">
              Confiança Supermercados
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Button
        variant="primary"
        size="lg"
        className="w-full font-medium"
        onClick={handleContinue}
        isDisabled={!selectedMarket}
      >
        Prosseguir <ArrowRight />
      </Button>
    </div>
  );
}
