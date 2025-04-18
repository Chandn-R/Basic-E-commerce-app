import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode: "LIVE",
            refillRate: 30, // Refill 30 tokens per interval
            interval: 5, // Refill every 5 seconds
            capacity: 20, // Bucket capacity of 20 tokens
        }),
    ],
});

