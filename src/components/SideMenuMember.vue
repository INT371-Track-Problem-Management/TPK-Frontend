<template>
  
  <div>

    <div class="h-full inset-y-0 p-4 text-rangmod-black shadow-lg font-primary">

      <div class="text-2xl px-4 my-4 font-bold tracking-wider">เมนู</div>

      <div class="flex flex-col">
        
        <div
          v-for="(menu, i) in menuList"
          :key="i"
          class="tracking-wide transition-all cursor-pointer"
        >
          <RouterLink
            :to="menu.url"
            v-if="!menu.isDropdown"
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
                <RouterLink :to="item.url">
                  <div 
                    class="flex flex-row space-x-2 items-center px-8 py-2 rounded-xl hover:bg-rangmod-light-pink"
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

</template>

<script>
export default {

  props: ["menuList"],

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