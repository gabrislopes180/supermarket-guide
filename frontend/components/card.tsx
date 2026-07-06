import { MapPin } from "@gravity-ui/icons";

export function CardtTest({ market }: { market: string }) {
  return (
    <div className="flex justify-center w-full mb-8">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm animate-fade-down animate-duration-300 animate-ease-out">
        <MapPin className="size-4" />
        <div>
          <span className="font-semibold mr-1">Mercado:</span>
          {market}
        </div>
      </div>
    </div>
  );
}
