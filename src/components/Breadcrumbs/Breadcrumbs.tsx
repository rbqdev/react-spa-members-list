export const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: string[] }) => (
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
