import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { type Metadata, type Viewport } from "next";
import { Roboto } from "next/font/google";

import { AppBar } from "@/components/AppBar";
import { APP } from "@/constants";

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    appleWebApp: {
        title: APP.TITLE,
        statusBarStyle: "default",
        startupImage: [
            {
                media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-640x1136.png",
            },
            {
                media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-750x1334.png",
            },
            {
                media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1242x2208.png",
            },
            {
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1125x2436.png",
            },
            {
                media: "(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1536x2048.png",
            },
            {
                media: "/apple-touch-startup-image-1668x2224.png",
                url: "(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                media: "/apple-touch-startup-image-2048x2732.png",
                url: "(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
            },
        ],
    },
    applicationName: APP.TITLE,
    description: APP.DESCRIPTION,
    creator: APP.AUTHOR,
    metadataBase: new URL(APP.URL),
    openGraph: {
        description: APP.DESCRIPTION,
        images: [
            {
                alt: `${APP.TITLE} logo`,
                height: 1200,
                url: "/opengraph-image.png",
                width: 630,
            },
        ],
        locale: "en_US",
        siteName: APP.TITLE,
        title: APP.TITLE,
        type: "website",
        url: APP.URL,
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    title: APP.TITLE,
};

export const viewport: Viewport = {
    colorScheme: "light",
    initialScale: 1,
    themeColor: "white",
    width: "device-width",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box className={roboto.className} component="html" lang="en">
            <Box component="body" m={0}>
                <AppRouterCacheProvider>
                    <AppBar />
                    <Box
                        boxSizing="border-box"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        margin="0 auto"
                        maxWidth={APP.MAX_WIDTH}
                        px={1}
                        py={2}
                    >
                        {children}
                    </Box>
                </AppRouterCacheProvider>
            </Box>
        </Box>
    );
}
