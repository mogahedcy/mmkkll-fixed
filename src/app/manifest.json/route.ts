export async function GET() {
  const manifest = {
    name: "محترفين الديار العالمية - أفضل شركة مظلات وبرجولات في جدة",
    short_name: "الديار العالمية",
    description: "شركة رائدة في تصميم وتنفيذ وتركيب المظلات والبرجولات والسواتر والساندوتش بانل في جدة والمملكة العربية السعودية. خبرة 15 عام مع ضمان 10 سنوات وخدمة 24/7",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a365d",
    orientation: "portrait-primary",
    categories: ["business", "construction", "home", "architecture", "services"],
    lang: "ar",
    dir: "rtl",
    prefer_related_applications: false,
    screenshots: [
      {
        src: "/uploads/mazallat-1.webp",
        sizes: "1080x1920",
        type: "image/webp",
        platform: "narrow"
      },
      {
        src: "/uploads/pergola-1.jpg",
        sizes: "1920x1080",
        type: "image/jpeg",
        platform: "wide"
      }
    ],
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    shortcuts: [
      {
        name: "طلب عرض سعر",
        short_name: "عرض سعر",
        description: "احصل على عرض سعر مجاني فوري",
        url: "/quote",
        icons: [{ src: "/favicon-192x192.png", sizes: "192x192" }]
      },
      {
        name: "أعمالنا",
        short_name: "البورتفوليو",
        description: "شاهد أحدث مشاريعنا",
        url: "/portfolio",
        icons: [{ src: "/favicon-192x192.png", sizes: "192x192" }]
      },
      {
        name: "خدماتنا",
        short_name: "الخدمات",
        description: "تعرف على جميع خدماتنا",
        url: "/#services",
        icons: [{ src: "/favicon-192x192.png", sizes: "192x192" }]
      },
      {
        name: "اتصل بنا",
        short_name: "تواصل",
        description: "تواصل معنا الآن",
        url: "/contact",
        icons: [{ src: "/favicon-192x192.png", sizes: "192x192" }]
      }
    ],
    related_applications: [],
    edge_side_panel: {
      preferred_width: 480
    }
  };

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'max-age=86400',
      'Vercel-CDN-Cache-Control': 'max-age=86400',
    }
  });
}
