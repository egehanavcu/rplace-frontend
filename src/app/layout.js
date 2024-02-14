import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YıldızPlace",
  description:
    "Yıldız Teknik Üniversitesi'nde r/place etkinliği! Sanat, işbirliği ve eğlence dolu bu interaktif platformda, YTU topluluğu olarak bir araya gelin. Renkli piksellerle özgün sanat eserleri oluşturun, topluluğunuzu temsil edin ve bu benzersiz deneyimde yerinizi alın!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta property="og:image" content="/images/og.png" />
      </head>
      <body className={inter.className}>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
        <script src="/js/stomp.min.js"></script>
      </body>
    </html>
  );
}
