"use client";

import {
    Home,
    HomeOutlined,
    TableRows,
    TableRowsOutlined,
    WebStories,
} from "@mui/icons-material";
import {
    AppBar as AppBarMUI,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { APP } from "@/constants";

/**
 * Component for the application top bar.
 */
export function AppBar() {
    const pathname = usePathname();

    const [localSerializedBoosters, setLocalSerializedBoosters] = useState<
        string | null
    >(null);

    useEffect(() => {
        window.setTimeout(() => {
            const boosters = localStorage?.getItem(
                APP.SERIALIZED_BOOSTERS_LS_KEY
            );
            setLocalSerializedBoosters(boosters);
        }, 250);
    }, [pathname]);

    return (
        <AppBarMUI position="sticky">
            <Toolbar
                sx={{
                    boxSizing: "border-box",
                    justifyContent: "center",
                    margin: "0 auto",
                    maxWidth: APP.MAX_WIDTH,
                    width: "100%",
                    "@media (min-width: 600px)": {
                        paddingInline: (theme) => theme.spacing(2),
                    },
                }}
                variant="dense"
            >
                <Box alignItems="center" display="flex" gap={1} width="100%">
                    <WebStories />
                    <Typography
                        component="h1"
                        sx={{
                            flexGrow: 1,
                        }}
                        variant="body1"
                    >
                        MTG Booster Builder
                    </Typography>
                    {localSerializedBoosters && (
                        <Link
                            href={`/boosters?serializedBoosters=${localSerializedBoosters}`}
                            passHref
                            style={{ textDecoration: "none" }}
                        >
                            <IconButton
                                edge="end"
                                size="small"
                                sx={{
                                    color: "white",
                                }}
                            >
                                {pathname === "/boosters" ? (
                                    <TableRows />
                                ) : (
                                    <TableRowsOutlined />
                                )}
                            </IconButton>
                        </Link>
                    )}
                    <Link href="/" passHref style={{ textDecoration: "none" }}>
                        <IconButton
                            edge="end"
                            size="small"
                            sx={{
                                color: "white",
                            }}
                        >
                            {pathname === "/" ? <Home /> : <HomeOutlined />}
                        </IconButton>
                    </Link>
                </Box>
            </Toolbar>
        </AppBarMUI>
    );
}
