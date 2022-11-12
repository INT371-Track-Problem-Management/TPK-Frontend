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
        '2xmd': '850px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
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
        'rangmod-light-purple': "#8699FF",
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

        'rangmod-stat-gray': "#B4B4B4",
        'rangmod-stat-light-gray': "#EEEEEE",
        'rangmod-stat-yellow' : "#FFD039",
        'rangmod-stat-light-yellow' : "#FFF0BA",
        'rangmod-stat-green' : "#15C976",
        'rangmod-stat-light-green' : "#E6FFCA",
        'rangmod-stat-red' : "#FF3939",
        'rangmod-stat-light-red' : "#FFE2E2",

        'rangmod-step-yellow' : "#FFD200",

        'rangmod-selected-gray' : "#C6C6C6",
        'rangmod-selected-green' : "#64BD79",

        'rangmod-ppbtn-blue' : "#77ADFF",

        'rangmod-font-light-purple' : "#A57CFF",
        'rangmod-font-purple' : "#7364FF",
        'rangmod-font-light-gray' : "#B4B4B4",
        'rangmod-font-gray' : "#858585",
      },
      
    },
  },
  plugins: [],
}
