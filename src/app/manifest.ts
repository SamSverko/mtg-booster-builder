import { MetadataRoute } from "next";

import { APP } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        background_color: "#ffffff",
        description: APP.DESCRIPTION,
        display: "standalone",
        icons: [
            {
                purpose: "any",
                sizes: "192x192",
                src: "/manifest-icon-any-192x192.png",
                type: "image/png",
            },
            {
                purpose: "any",
                sizes: "512x512",
                src: "/manifest-icon-any-512x512.png",
                type: "image/png",
            },
            {
                purpose: "maskable",
                sizes: "512x512",
                src: "/manifest-icon-maskable.png",
                type: "image/png",
            },
        ],
        name: APP.TITLE,
        orientation: "portrait",
        prefer_related_applications: true,
        scope: ".",
        short_name: APP.TITLE,
        start_url: "/",
        theme_color: "#ffffff",
    };
}
