import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";

export const metadata = {
  title: "تای‌های نیایش",
  description: "کاغذهایی که با دست نیایش تا می‌شوند، زنده می‌شوند و لبخند می‌زنند.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff3f6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
