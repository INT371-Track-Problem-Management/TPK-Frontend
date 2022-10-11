module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
        'se': '375px',
        'xse': '466px',
        'ssm': '500px',
        'sm': '650px',
        'md': '768px',
        'xmd': '830px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440x',
      },
    extend: {
      fontFamily: {
        'primary': ['Bai_Jamjuree'],
      },
      colors: {
        'primary': "#1A404E",
        'rangmod-bg': "#F9FAFB",
        'rangmod-black': "#525252",
        'rangmod-gray': "#B4B4B4",
        'rangmod-light-gray': "#EEEEEE",
        'rangmod-fog': "#F8F8F8",
        'rangmod-pink': "#FFECEC", 
        'rangmod-dark-pink': "#FF8477",
        'rangmod-light-pink': "#F6F2FF",
        'rangmod-purple': "#7364FF",
        'rangmod-light-yellow': "#FFE996",
        'rangmod-yellow': "#FFB800",
        'rangmod-dark-yellow': "#7A671F",
        'rangmod-red': "#EB3B2A",
        'rangmod-light-red': "#FF8477",
        'rangmod-blue': "#268CCB",
        'rangmod-light-blue': "#5484FF",
        'rangmod-dark-blue': "#4A80AA",
        'rangmod-light-blue': "#66C5FF",
        'rangmod-green': "#64BD79",

        'rangmod-cat-red': "#EB797D",
        'rangmod-cat-orange': "#FB9460",
        'rangmod-cat-yellow': "#FAE25C",
        'rangmod-cat-green': "#71DC8D",
        'rangmod-cat-light-blue': "#71D4FF",
        'rangmod-cat-dark-blue': "#4679F9",
        'rangmod-cat-purple': "#B495FF",
      },
      
    },
  },
  plugins: [],
}
