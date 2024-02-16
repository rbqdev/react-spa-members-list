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
    <PageTitle breadcrumbs={breadcrumbs} title={title} isLoading={isLoading} />
    <div className="flex justify-center flex-1 px-12 pb-24">
      <Content>{children}</Content>
    </div>
    <Footer />
  </div>
);
