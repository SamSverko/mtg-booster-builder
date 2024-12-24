import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { AppBar } from "@/components/AppBar";
import { APP_MAX_WIDTH } from "@/constants";

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
                        maxWidth={APP_MAX_WIDTH}
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
