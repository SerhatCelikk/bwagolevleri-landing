export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bwagyo.com/sitemap.xml",
    other: {
      "LLMs.txt": "https://bwagyo.com/llms.txt",
      "AI.txt": "https://bwagyo.com/.well-known/ai.txt",
    },
  };
}
