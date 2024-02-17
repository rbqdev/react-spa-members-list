import { Breadcrumbs } from "@components/Breadcrumbs/Breadcrumbs";
import { Content } from "@components/Content/Content";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import "./PageTitle.styles.css";

type PageTitleProps = {
  title: string;
  breadcrumbs: string[];
  isLoading?: boolean;
};

export const PageTitle = ({
  title,
  breadcrumbs = [],
  isLoading,
}: PageTitleProps) => (
  <Content childNodeClassName="page-title__content">
    <section>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading ? (
        <Skeleton className="page-title__skeleton" />
      ) : (
        <h2 className="page-title__h2">{title}</h2>
      )}
    </section>
  </Content>
);
