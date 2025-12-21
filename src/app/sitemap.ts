import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.luckygen.click";
  const lastModified = "2025-01-01";

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          id: `${baseUrl}/id`,
        },
      },
    },
    {
      url: `${baseUrl}/id`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          id: `${baseUrl}/id`,
        },
      },
    },
    {
      url: `${baseUrl}/lucky-amount-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
