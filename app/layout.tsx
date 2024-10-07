import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import { Metadata } from "next";
import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Your App Title",
  description: "A brief description of your app",
  keywords: "nextjs, app, react, web",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <App>{children}</App>
        </AntdRegistry>
      </body>
    </html>
  );
}
