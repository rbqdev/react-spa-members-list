import { Breadcrumbs } from "@components/Breadcrumbs/Breadcrumbs";
import { Content } from "@components/Content/Content";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";

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
  <Content className="flex flex-col gap-8">
    <section>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading ? (
        <Skeleton
          className="h-10 w-[220px]"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
      ) : (
        <h2 className="text-3xl font-bold capitalize">{title}</h2>
      )}
    </section>
  </Content>
);
