module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Bai_Jamjuree'],
      },
      colors: {
        'primary': "#1A404E",
        'rangmod-black': "#525252",
        'rangmod-gray': "#B4B4B4",
        'rangmod-pink': "#FFECEC", 
        'rangmod-light-pink': "#F6F2FF",
        'rangmod-purple': "#7364FF",
        'rangmod-light-yellow': "#FFE996",
        'rangmod-yellow': "#FFB800",
        'rangmod-dark-yellow': "#7A671F",
        'rangmod-red': "#EB3B2A",
        'rangmod-blue': "#268CCB",
        'rangmod-green': "#64BD79",
        
      },
    },
  },
  plugins: [],
}
