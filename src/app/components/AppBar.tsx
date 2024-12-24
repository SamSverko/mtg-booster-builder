"use client";

import { Home, HomeOutlined } from "@mui/icons-material";
import {
    AppBar as AppBarMUI,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_MAX_WIDTH } from "@/app/constants";

export function AppBar() {
    const pathname = usePathname();

    return (
        <AppBarMUI position="sticky">
            <Toolbar
                sx={{
                    boxSizing: "border-box",
                    justifyContent: "center",
                    margin: "0 auto",
                    maxWidth: APP_MAX_WIDTH,
                    width: "100%",
                    "@media (min-width: 600px)": {
                        paddingInline: (theme) => theme.spacing(2),
                    },
                }}
                variant="dense"
            >
                <Typography
                    component="h1"
                    sx={{
                        flexGrow: 1,
                    }}
                    variant="h6"
                >
                    MTG Booster Builder
                </Typography>
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
            </Toolbar>
        </AppBarMUI>
    );
}
