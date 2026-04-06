export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bwagolevleri.webinen.com/sitemap.xml",
  };
}
