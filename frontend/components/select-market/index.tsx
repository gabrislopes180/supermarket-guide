import { Button, Key, Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";

interface SelectMarketProps {
  onContinue: (marketId: string) => void;
}
export function SelectMarket({ onContinue }: SelectMarketProps) {
  const [selectedMarket, setSelectedMarket] = useState<Key | null>(null);

  // Função intermediária para checar e enviar o dado ao pai
  const handleContinue = () => {
    if (selectedMarket) {
      onContinue(selectedMarket.toString());
    }
  };
  return (
    <>
      <Select
        className="w-[256px] animate-fade-right animate-duration-[300ms] animate-ease-linear"
        placeholder="Select one"
        value={selectedMarket}
        onChange={setSelectedMarket}
      >
        <Label>Selecione o mercado</Label>
        <Select.Trigger>
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
        variant="secondary"
        onClick={handleContinue}
        isDisabled={!selectedMarket}
      >
        Prosseguir
      </Button>
    </>
  );
}
