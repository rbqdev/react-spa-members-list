import { cn } from "@lib/shadcn/utils";

type ContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function Content({ className, children }: ContentProps) {
  return (
    <div className={cn("w-full max-w-[1265px]", className)}>{children}</div>
  );
}
