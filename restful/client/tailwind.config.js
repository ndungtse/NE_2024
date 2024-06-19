/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#1877F2',
            secondary: '#F7F7F7',
            light: '#F5F7FA',
            lightText: '#8BA3CB',
         },
         fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
         },
      },
   },
   plugins: [],
};
