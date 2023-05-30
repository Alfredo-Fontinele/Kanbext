/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        dark_theme: '#151515',
        'custom-purple': 'rgba(110, 56, 224, 0.4)',
      },
      backdropBlur: {
        'custom-blur': '40px',
      },
      borderColor: {
        border_card: '#6E38E0',
      },
    },
  },
  plugins: [],
}
