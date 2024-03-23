/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#040711',
        bgSource: '#212936cc',
        bgTarget: '#121826cc',
        bgButtonPrimary: '#3662E3',
        bgButtonSecondary: '#4D5562',
        textPrimary: '#F9FAFB',
        textSecondary: '#4D5562',
        textButtonPrimary: '#7CA9F3',
        borderForm: '#4D5562',
        borderButton: '#7CA9F3'
      }
    },
    fontFamily: {
      sans: ['DM Sans Variable', 'sans-serif']
    }
  },
  plugins: []
}
