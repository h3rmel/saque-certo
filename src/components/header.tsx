import { useScrollPosition } from "@/hooks/guarahooks/use-scroll-position";
import { cn } from "@/lib/utils";

export function Header() {
  const { x, y } = useScrollPosition();

  return <header className={cn()}></header>;
}
