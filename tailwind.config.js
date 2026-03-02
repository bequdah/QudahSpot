/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a',
                surface: '#1e293b',
                'surface-hover': '#334155',
                primary: '#6366f1',
                'primary-hover': '#818cf8',
                accent: '#f43f5e',
                'text-main': '#f8fafc',
                'text-muted': '#94a3b8',
            },
            borderRadius: {
                'xl': '12px',
            }
        },
    },
    plugins: [],
}
