import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/components/providers/heroProviders";
import ToastHeroProvider from "@/components/providers/ToastHeroProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import connectToDb from "@/lib/utils/db";
import Setting from "@/models/Setting";

// Default settings fallback
const defaultSettings = {
  siteName: "فروشگاه قالب و افزونه ژاکت",
  siteDescription: "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
  faviconUrl: "/icon.png",
};

// Helper function to serialize MongoDB documents to plain objects
function serializeDoc(doc) {
  if (!doc) return null;
  
  // Convert to plain object and serialize all values
  const serialized = JSON.parse(JSON.stringify(doc));
  
  return serialized;
}

// Helper function to get settings from database
async function getSettings() {
  try {
    await connectToDb();
    let settings = await Setting.findOne({ siteId: "global" }).lean();
    
    if (!settings) {
      // Create default settings if they don't exist
      const newSettings = await Setting.create({ siteId: "global" });
      settings = serializeDoc(newSettings);
    } else {
      // Serialize lean document
      settings = serializeDoc(settings);
    }
    
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings from database:", error);
    return null;
  }
}

// Generate dynamic metadata based on settings
export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.siteName || defaultSettings.siteName,
      template: `%s | ${settings?.siteName || "ژاکت"}`,
    },
    description:
      settings?.siteDescription || defaultSettings.siteDescription,
    icons: {
      icon: settings?.faviconUrl || defaultSettings.faviconUrl,
    },
  };
}

export default async function RootLayout({ children }) {
  // Fetch settings on server side for initial data
  const initialSettings = await getSettings();

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
