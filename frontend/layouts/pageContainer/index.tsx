export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-3xl font-medium animate-fade-right animate-duration-[600ms] animate-ease-linear">
        MarketGuide
      </h1>
      {children}
    </section>
  );
}
