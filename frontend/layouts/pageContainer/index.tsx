export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] gap-6 py-8 md:py-10">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent animate-fade-up animate-duration-500 animate-ease-out tracking-tight">
        MarketGuide
      </h1>
      {children}
    </section>
  );
}
