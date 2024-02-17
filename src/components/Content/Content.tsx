import { cn } from "@lib/shadcn/utils";

type ContentProps = {
  parentNodeClassName?: string;
  childNodeClassName?: string;
  children: React.ReactNode;
};

export function Content({
  parentNodeClassName,
  childNodeClassName,
  children,
}: ContentProps) {
  return (
    <div className={cn("flex justify-center px-12", parentNodeClassName)}>
      <div className={cn("w-full max-w-[1265px] flex-1", childNodeClassName)}>
        {children}
      </div>
    </div>
  );
}
