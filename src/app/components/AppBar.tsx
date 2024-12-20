import { AppBar as AppBarMUI, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function AppBar() {
    return (
        <AppBarMUI position="sticky">
            <Toolbar sx={{ justifyContent: "center" }} variant="dense">
                <Link href="/" passHref style={{ textDecoration: "none" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "white",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        MTG Booster Builder
                    </Typography>
                </Link>
            </Toolbar>
        </AppBarMUI>
    );
}
