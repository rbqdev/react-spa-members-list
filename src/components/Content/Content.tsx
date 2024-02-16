import { cn } from "@lib/shadcn/utils";

type ContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function Content({ className, children }: ContentProps) {
  return (
    <div className="flex justify-center">
      <div className={cn("w-full max-w-[1265px] flex-1", className)}>
        {children}
      </div>
    </div>
  );
}
