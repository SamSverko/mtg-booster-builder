import { Link } from "@mui/material";
import { MouseEventHandler } from "react";

type AppLinkProps = {
    appHref: string;
    children: React.ReactNode;
    href: string;
};

/**
 * Component for linking to a native mobile app or website.
 */
export function AppLink({ appHref, children, href }: AppLinkProps) {
    const openApp: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (!isMobile) {
            window.open(href, "_blank");
            return;
        }

        window.open(appHref, "_self");
    };

    return (
        <Link
            component="button"
            onClick={openApp}
            sx={{
                verticalAlign: "baseline",
            }}
        >
            {children}
        </Link>
    );
}
