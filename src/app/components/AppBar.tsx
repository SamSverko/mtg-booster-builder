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

export function AppBar() {
    const pathname = usePathname();

    return (
        <AppBarMUI position="sticky">
            <Toolbar sx={{ justifyContent: "center" }} variant="dense">
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
