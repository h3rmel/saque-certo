import "@/globals.css";
import { VolleyballSorter } from "@/views/volleyball-sorter";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider>
      <main className={cn("w-full min-h-dvh antialiased font-sans")}>
        <VolleyballSorter />
      </main>
    </ThemeProvider>
  );
}
