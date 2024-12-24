import { Alert, Box } from "@mui/material";

export default function NotFoundPage() {
    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            width="100%"
        >
            <Alert
                severity="error"
                sx={{
                    boxSizing: "border-box",
                    width: "100%",
                }}
            >
                Page not found.
            </Alert>
        </Box>
    );
}
