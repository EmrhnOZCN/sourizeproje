/** @type {import('tailwindcss').Config} */

module.exports = {
    mode:'jit',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          'xs': '375px',
          // => @media (min-width: 640px) { ... }
        },
        contrast: {
          25: '.25',
        },
        colors: {
          'regal-blue': '#243c5a',
          'eksi-yesili':'#52a500ff',
          'reddit-grisi':'#e3e3e3',
          'reddit-fontcolor':'#87888aff',
          'orange':'#fd4400ff',
          'light-orange':'#f2a795ff',
          'lighter-orange':'#FADBD8',
          'b5c276':'#b5c276',
          'cinnemon':'#7b3f00',
          'koyu-reddit-grisi':'#b0a8a0',
          'header-bg':'#fcfefbff',
        },
        height: {
          custom_for_scrollbar:'480px',
          px107_for_logo:'107px',
        },
        width: {
          px310_for_logo:'310px',
          w3pcs:'6%',
        },
        fontSize: {
          '2xs': '0.65rem',
        },
        
      },
    plugins: [],
    }
  
  }