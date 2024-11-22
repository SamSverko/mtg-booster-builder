import type { Metadata } from "next";

import "@/app/global.scss";

export const metadata: Metadata = {
    title: "MTG Booster Builder",
    description:
        "Generate custom Magic: The Gathering Play Booster Packs from your library.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
