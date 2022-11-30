<template>
  <div>
    <div class="bg-rangmod-light-pink w-full h-16 absolute -z-10 top-0">
      &nbsp;
    </div>

    <div
      class="cursor-pointer"
      :class="
        handleMenu
          ? 'bg-black fixed inset-0 opacity-60 visible z-[100]'
          : 'hidden opacity-0'
      "
      v-on:click="handleMenu = !handleMenu"
    ></div>

    <div
      class="bg-white mx-auto fixed inset-y-0 duration-300 transition-right overflow-scroll z-[110] w-80 shadow-xl"
      :class="handleMenu ? 'left-0' : '-left-full'"
    >
      <div
        class="h-full inset-y-0 py-12 px-4 text-rangmod-black shadow-lg font-primary"
      >
        <div
          class="flex justify-end mb-5 px-5"
          v-on:click="handleMenu = !handleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
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
                  {{ menu.name }}
                </div>
              </div>
            </RouterLink>

            <div v-else>
              <div
                class="flex flex-row space-x-2 items-center px-5 py-4 rounded-xl hover:bg-rangmod-light-pink relative"
                @click="menu.activeDropdown = !menu.activeDropdown"
              >
                <div v-html="menu.icon"></div>
                <div>
                  {{ menu.name }}
                </div>
                <div class="absolute right-4 text-rangmod-black cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div v-if="menu.activeDropdown">
                <div v-for="(item, j) in menu.menuItems" :key="j">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <div>
                        {{ item.name }}
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
      <div
        class="flex flex-row justify-between py-2 px-5 ssm-2:px-10 transition-all"
      >
        <div class="w-40 flex flex-row justify-start items-center py-1">
          <div
            class="px-2 cursor-pointer xl:hidden"
            v-on:click="handleMenu = !handleMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div
            class="rounded-full cursor-pointer hover:scale-110 transition ease-in-out delay-150 h-fit w-fit hover:bg-rangmod-pink"
          >
            <RouterLink
              :to="
                this.role == 'E' || this.role == 'A'
                  ? '/dashboard/member'
                  : '/member/myroom'
              "
              @click="closeMenu()"
              class="h-full w-full items-start"
            >
              <img
                src="@/assets/images/LOGO-rangmod.png"
                class="h-full w-full"
              />
            </RouterLink>
          </div>
        </div>

        <div
          @click="showProfileMenu = !showProfileMenu"
          class="flex space-x-4 items-center rounded-full py-1 px-2 cursor-pointer hover:scale-110 transition ease-in-out delay-150 hover:bg-rangmod-pink"
          :class="
            showProfileMenu ? 'scale-110 bg-rangmod-pink' : 'scale-100 bg-none'
          "
        >
          <div class="w-10 h-10 rounded-full bg-rangmod-light-gray">
            <img
              v-if="profileMedia != null"
              :src="profileMedia"
              class="rounded-full w-full h-full"
            />
          </div>
          <div class="text-rangmod-black">{{ username }}</div>
        </div>
      </div>
    </div>
    <transition>
      <div
        v-show="showProfileMenu"
        class="flex flex-row justify-end font-primary"
      >
        <div
          class="bg-rangmod-fog w-fit flex flex-col h-full rounded-b-lg z-20 top-0 px-1 shadow-md"
        >
          <div
            @click="
              toProfilePage(this.role), (showProfileMenu = !showProfileMenu)
            "
            class="p-2 flex flex-row items-center cursor-pointer hover:font-bold transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
            <div class="px-2">บัญชี</div>
          </div>
          <hr class="border-rangmod-gray" />
          <div
            class="p-2 flex flex-row items-center cursor-pointer hover:font-bold transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              id="IconChangeColor"
              height="20"
              width="20"
            >
              <path
                stroke="#EB3B2A"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
                id="mainIconPathAttribute"
              ></path>
            </svg>
            <div
              class="px-2 text-rangmod-red"
              @click="logout(), (showProfileMenu = !showProfileMenu)"
            >
              ออกจากระบบ
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {

  props: ["menuList"],

  data() {
    return {
      token: localStorage.getItem("token"),
      handleMenu: false,
      showProfileMenu: false,
      profileMedia: ''
    };
  },
  computed: {
    email() {
      return localStorage.getItem("email");
    },
    role() {
      return localStorage.getItem("role");
    },
    username() {
      return localStorage.getItem("username");
    },
  },
  mounted() {
    this.getProfileMedia();
  },
  methods: {
    async getProfileMedia() {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/service/profileMedia/${this.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (res.status == 404) {
          this.profileMedia = null
        } else {
          const binaryData = await res.arrayBuffer();
          const base64 = this.arrayBufferToBase64(binaryData);
          const dataUrl = `data:image/*;base64,${base64}`;
          this.profileMedia = dataUrl
        }
    },
    arrayBufferToBase64(buffer) {
      return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    },
    selectMenu(index, listIndex, isItemList) {
      this.closeMenu();

      if (!isItemList) {
        this.menuList.forEach((menu, i) => {
          if (i == index) {
            menu.isActive = true;
          }
        });
      } else {
        this.menuList.forEach((menu, i) => {
          menu.menuItems.forEach((item, j) => {
            if (i == index && j == listIndex) {
              item.isActive = true;
            }
          });
        });
      }
    },
    logout() {
      fetch(`${process.env.VUE_APP_API_URL}/logout`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      localStorage.clear();
      this.$router.push("/login");
    },
    toProfilePage(role) {
      this.closeMenu();
      if (role == "E" || role == "A") {
        this.$router.push(`/owner/profile`);
      }

      if (role == "C") {
        this.$router.push(`/member/profile`);
      }
    },
    closeMenu() {
      this.menuList.forEach((menu) => {
        if (menu.isActive) {
          menu.isActive = false;
        }
        menu.menuItems.forEach((item) => {
          if (item.isActive) {
            item.isActive = false;
          }
        });
      });
    },
  },
};
</script>

<style></style>
