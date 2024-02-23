const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    mode: "jit",
    theme: {
        extend: {
            colors: {}
        },
        screens: {
            xsup: "480px",
            ssup: "620px",
            smup: "768px",
            mdup: "1060px",
            lgup: "1200px",
            xxlup: "1700px",
            xs: { 'max': '480px' },
            ss: { 'max': '640px' },
            sm: { 'max': '768px' },
            md: { 'max': '1024px' },
            lg: { 'max': '1280px' },
            xl: { 'max': '1536px' },
        },
    },
    darkMode: "class",
    plugins: [
        nextui(),
    ],
    corePlugins: {},
    important: true,
};