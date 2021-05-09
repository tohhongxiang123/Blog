module.exports = {
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        code: {
                            padding: '0.2rem 0.3rem',
                            overflow: 'auto',
                            fontSize: '85%',
                            lineHeight: 1.45,
                            backgroundColor: '#f6f8fa',
                            borderRadius: '3px',
                            '&::after': {
                                content: '"" !important'
                            },
                            '&::before': {
                                content: '"" !important'
                            },
                        }
                    }
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}