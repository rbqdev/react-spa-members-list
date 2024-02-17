export const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: string[] }) => (
  <div className="my-6">
    {breadcrumbs.map((crumb) => {
      const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];
      return (
        <span key={`crumb-${crumb}`} className="text-xs">{`${crumb}${
          !isLast ? " > " : ""
        }`}</span>
      );
    })}
  </div>
);
