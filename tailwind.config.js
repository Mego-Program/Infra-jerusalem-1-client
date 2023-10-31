/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      // 'dark-blue': '#121231',
      // 'blue': '',
      // 'yellow': '#F6C927',
      'black':'#000000',
      'green-800':'#087F00',
      'slate-900':'#121231',
      'slate-800':'#21213E',
      'slate-800':'#222240',
      'blue-600':'#2382DB',
      'slate-800':'#242442',
      'green-500':'#35B176',
      'gray-700':'#41355C',
      'neutral-500':'#6DC36B',
      'green-400':'#7BCE67',
      'cyan-200':'#90EBFF',
      'gray-400':'#9BC9B3',
      'stone-300':'#C8C8C8',
      '':'',
    }
  },
  plugins: [],
}


// #CDCDCD <- stone-300
// #D9D9D9 <- zinc-300
// #E4E4E4 <- neutral-200
// #E7E7E7 <- neutral-200
// #EDEDFF <- violet-100
// #EE786C <- red-400
// #F66E6D <- red-400
// #F6C927 <- amber-400
// #F8F8FF <- slate-50
// #FF6968 <- red-400
// #FF7675 <- red-400
// #FFEAEA <- rose-100
// #FFFFFF <- white