import { PageContainer } from "@components/PageContainer/PageContainer";

export function NotFound() {
  return (
    <PageContainer
      breadcrumbs={["Home", "Não encontrada"]}
      title="Página não encontrada"
    >
      <div className="flex items-center justify-center flex-1">
        <span className="text-[8em] flex items-center">404</span>
      </div>
    </PageContainer>
  );
}
