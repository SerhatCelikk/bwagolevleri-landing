export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bwagolevleri.webinen.com/sitemap.xml",
    other: {
      "LLMs.txt": "https://bwagolevleri.webinen.com/llms.txt",
      "AI.txt": "https://bwagolevleri.webinen.com/.well-known/ai.txt",
    },
  };
}
