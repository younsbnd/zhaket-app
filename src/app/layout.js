import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/components/providers/heroProviders";
import ToastHeroProvider from "@/components/providers/ToastHeroProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { fetchServerData } from "@/lib/api/fetchServerData";

// Generate dynamic metadata based on settings
export async function generateMetadata() {
  try {
    const response = await fetchServerData("/main/settings");
    const settings = response?.data;

    return {
      title: {
        default: settings?.siteName || "فروشگاه قالب و افزونه ژاکت",
        template: `%s | ${settings?.siteName || "ژاکت"}`,
      },
      description:
        settings?.siteDescription ||
        "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
      icons: {
        icon: settings?.faviconUrl || "/icon.png",
      },
    };
  } catch (error) {
    // Fallback metadata if fetching fails
    return {
      title: {
        default: "فروشگاه قالب و افزونه ژاکت",
        template: "%s | ژاکت",
      },
      description: "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
      icons: {
        icon: "/icon.png",
      },
    };
  }
}

export default async function RootLayout({ children }) {
  // Fetch settings on server side for initial data
  let initialSettings = null;
  try {
    const response = await fetchServerData("/main/settings");
    initialSettings = response?.data;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>
        <AuthProvider>
          <HeroProviders>
            <SettingsProvider initialSettings={initialSettings}>
              <ToastHeroProvider>{children}</ToastHeroProvider>
            </SettingsProvider>
          </HeroProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
