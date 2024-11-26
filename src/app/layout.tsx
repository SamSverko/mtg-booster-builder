import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "700"],
});

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
        <html className={roboto.className} lang="en">
            <body>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </body>
        </html>
    );
}
