<template>
  
  <div>
    
    <div class="bg-rangmod-light-pink w-full h-16 absolute -z-10 top-0">&nbsp;</div>

    <div 
      class="cursor-pointer"
      :class="handleMenu ? 
      'bg-black fixed inset-0 opacity-60 visible z-80' : 
      'hidden opacity-0'"
      v-on:click="handleMenu = !handleMenu"
    ></div>

    <div  
      class="bg-white mx-auto fixed inset-y-0 duration-300 transition-right overflow-scroll z-50 w-80 shadow-xl" 
      :class="handleMenu ? 'left-0' : '-left-full'" 
    >
      <div class="h-full inset-y-0 py-12 px-4 text-rangmod-black shadow-lg font-primary">

        <div class="flex justify-end mb-5 px-5" v-on:click="handleMenu = !handleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div class="text-2xl px-4 my-4 font-bold tracking-wider">เมนู</div>

        <div class="flex flex-col">
          
          <div
            v-for="(menu, i) in menuList"
            :key="i"
            class="text-xl tracking-wide transition-all cursor-pointer"
          >
            <RouterLink
              :to="menu.url"
              v-if="!menu.isDropdown"
              v-on:click="handleMenu = !handleMenu"
            >
              <div 
                class="flex flex-row space-x-2 items-center px-5 py-4 rounded-xl hover:bg-rangmod-light-pink" 
                :class="menu.isActive ? `bg-rangmod-light-pink` : ``"
                @click="selectMenu(i, false)"
              >
                <div v-html="menu.icon"></div>
                <div>
                  {{menu.name}}
                </div>
              </div>
            </RouterLink>

            <div v-else >
              <div 
                class="flex flex-row space-x-2 items-center px-5 py-4 rounded-xl hover:bg-rangmod-light-pink relative" 
                @click="menu.activeDropdown = !menu.activeDropdown"
              >
                <div v-html="menu.icon"></div>
                <div>
                  {{menu.name}}
                </div>
                <div class="absolute right-4 text-rangmod-black cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div v-if="menu.activeDropdown">
                <div
                  v-for="(item, j) in menu.menuItems"
                  :key="j"
                >
                  <RouterLink 
                    :to="item.url"
                    v-on:click="handleMenu = !handleMenu"
                  >
                    <div 
                      class="flex flex-row space-x-2 items-center px-8 py-2 text-lg rounded-xl hover:bg-rangmod-light-pink"
                      :class="item.isActive ? `bg-rangmod-light-pink` : ``"
                      @click="selectMenu(i, j, true)"
                    >
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div>
                        {{item.name}}
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto">

      <div class="flex flex-row justify-between py-2  pl-5 pr-10">

        <div class="w-40 xl:w-32 flex flex-row items-center space-x-4">
          <div class="px-2 cursor-pointer xl:hidden" v-on:click="handleMenu = !handleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <RouterLink to="/">
            <img src="@/assets/images/RangmodLogoName.webp" alt="">
          </RouterLink>
        </div>

        <div class="flex space-x-4 items-center">
          <div class="w-10 h-10 rounded-full bg-rangmod-gray"></div>
          <div class="text-rangmod-black">{{ email }}</div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>

// import SideMenu from "@/components/SideMenu.vue"

export default {

  // name: 'admin',
  // components: { SideMenu },

  props: ["menuList"],

  data() {
    return {
      handleMenu: false,

    }
  },
  computed: {
    email() {
      return localStorage.getItem('email')
    }
  },
  methods: {
    selectMenu(index, listIndex, isItemList){

      this.menuList.forEach((menu) => {
        if (menu.isActive) { menu.isActive = false }
        // if (menu.activeDropdown) { menu.activeDropdown = false }
        menu.menuItems.forEach((item) => {
          if (item.isActive) { item.isActive = false }
        })
      })

      if(!isItemList) {
        this.menuList.forEach((menu, i) => {
          if(i == index){
            menu.isActive = true
          }
        })
      } else {
        this.menuList.forEach((menu, i) => {
          // if(i == index) { menu.activeDropdown = true }
          menu.menuItems.forEach((item, j) => {
            if(i == index && j == listIndex){
              item.isActive = true
            }
          })
        })
      }

    }
  },
    
}
</script>

<style>

</style>