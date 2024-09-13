/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5B84B1',
                'primary-dark': '#3a5a7e',
                secondary: '#8AB0AB',
                accent: '#FFCB47',
                background: '#F7F7F7',
                text: '#2F2F2F',
              },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp')
    ],
}