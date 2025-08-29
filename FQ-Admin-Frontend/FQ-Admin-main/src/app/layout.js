import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { InventoryProvider } from "@/context/Inventorycontext";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Furniq Furniture Admin",
  description: "Admin panel for Furniq Furniture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <InventoryProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </InventoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
