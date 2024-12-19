import { Link } from "@mui/material";
import { MouseEventHandler } from "react";

type AppLinkProps = {
    appHref: string;
    children: React.ReactNode;
    href: string;
};

/**
 * A link that opens an app if on mobile, otherwise opens a new tab.
 */
export default function AppLink({ appHref, children, href }: AppLinkProps) {
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
