// import the site config from the environment variables
const siteConfig = {
  siteName: "فروشگاه قالب و افزونه ژاکت کلون",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  defaultDescription: "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
};

export const metadata = ({ title, description, seoData = {} }) => {
  const pageTitle = title
    ? `${title} | ${siteConfig.siteName}`
    : siteConfig.siteName;
  const pageDescription = description || siteConfig.defaultDescription;

  // create the metadata object
  const metadata = {
    title: pageTitle,
    description: pageDescription,
    robots: {
      index: seoData.robots?.noindex ? false : true,
      follow: seoData.robots?.nofollow ? false : true,
    },
    // open graph metadata for social media
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.siteName,
      type: "website",
      url: seoData.canonicalUrl || siteConfig.baseUrl,
    },
    // twitter metadata for social media
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };

  // add the canonical url to the metadata if it is defined
  if (seoData.canonicalUrl) {
    metadata.alternates = {
      canonical: seoData.canonicalUrl,
    };
  }

  return metadata;
};
