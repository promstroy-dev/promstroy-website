/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://promstroy-samara.ru",
  generateRobotsTxt: false, // We manage robots.txt manually
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/privacy"],
  additionalPaths: async () => [
    { loc: "/", priority: 1.0, changefreq: "weekly" },
    { loc: "/uslugi", priority: 0.9, changefreq: "weekly" },
    { loc: "/proekty", priority: 0.9, changefreq: "weekly" },
    { loc: "/o-kompanii", priority: 0.7, changefreq: "monthly" },
    { loc: "/kontakty", priority: 0.8, changefreq: "monthly" },
  ],
};
