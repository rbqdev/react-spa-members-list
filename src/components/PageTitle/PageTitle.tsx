import Content from "@components/Content";

type PageTitleProps = {
  title: string;
  breadcrumbs: string[];
};

const Breadcrumbs = ({ breadcrumbs }: Pick<PageTitleProps, "breadcrumbs">) => (
  <div>
    {breadcrumbs.map((crumb) => {
      const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];
      return (
        <span key={`crumb-${crumb}`} className="text-sm">{`${crumb}${
          !isLast ? " > " : ""
        }`}</span>
      );
    })}
  </div>
);

export const PageTitle = ({ title, breadcrumbs = [] }: PageTitleProps) => (
  <section className="flex justify-center py-6 mb-6">
    <Content className="flex flex-col gap-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="text-3xl font-bold">{title}</h2>
    </Content>
  </section>
);
