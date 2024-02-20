import { Content } from "@components/Content/Content";
import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";
import { PageTitle } from "@components/PageTitle/PageTitle";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  breadcrumbs: string[];
  isLoading?: boolean;
};

export const PageContainer = ({
  children,
  title,
  breadcrumbs = [],
  isLoading,
}: PageContainerProps) => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="flex flex-col flex-1">
      <PageTitle
        breadcrumbs={breadcrumbs}
        title={title}
        isLoading={isLoading}
      />
      <Content parentNodeClassName="pb-12">{children}</Content>
    </div>
    <Footer />
  </div>
);
