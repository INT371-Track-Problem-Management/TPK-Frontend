<template>

  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2 transition-all">

    <div
      v-for="(room, i) in roomList"
      :key="i"
      class="mb-10"
    >
      <div class="text-xl">หอพักชั้นที่ {{room.floor_number}}</div>
      <hr class="my-4 border-rangmod-purple">

      <div class="flex flex-wrap justify-center xl:justify-start">
        
        <div
          v-for="(item, j) in room.roomItems"
          :key="j"
          @click="showDetail(item.room_number)"
        >
          <div 
            v-if="item.isActive"
            class="text-center px-24 py-5 m-2 border border-rangmod-purple cursor-pointer transition-all hover:bg-rangmod-light-pink hover:font-bold"
          >
            <div class="pb-2">{{item.room_number}}</div>

            <div class="flex justify-center">
              <div
                v-for="(status, j) in statusList"
                :key="j"
              >
                <div 
                  v-if="item.status == status.id"
                  :class="[status.color, status.border_color]"
                  class="whitespace-nowrap border px-1 rounded-md"
                >
                  {{status.title}}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      
    </div>
    
    <div 
      :class="showModal ? 
      'bg-black fixed inset-0 opacity-60 visible z-[80]' : 
      'hidden opacity-0'"
      v-on:click="showModal = !showModal"
    ></div>

    <transition>

      <div 
        v-show="showModal" 
        class="fixed w-full h-screen z-[90] inset-0 pb-20 "
      >

        <div class="w-11/12 xl:w-1/3 h-2/3 xl:h-1/3 mx-auto my-44 xl:my-60 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar">

          
          <!-- Closed -->
          <div class="flex justify-end">
            <div 
              @click="showModal = false"
              class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <div v-if="modal.code !== ''">
            <div class="text-2xl text-rangmod-purple mb-5">ห้อง {{modal.room}}</div>
            <div class="flex flex-col space-y-1 pb-8">

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">รหัสผู้ใช้งาน : </div>
                <div>{{modal.code}}</div>
              </div>

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">ชื่อ-นามสกุล : </div>
                <div>{{modal.name}} {{modal.surname}}</div>
              </div>

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">สถานะ : </div>
                <div
                  v-for="(status, j) in statusList"
                  :key="j"
                >
                  <div 
                    v-if="modal.status == status.id"
                    :class="status.color"
                  >
                    {{status.title}}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div v-else>
            <div class="text-2xl text-rangmod-purple mb-5">ห้อง {{modal.room}}</div>

            <div class="flex flex-col space-y-1 pb-8">

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">ไม่มีข้อมูลผู้พัก</div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </transition>

  </div>

</template>

<script>
export default {

  data() {
    
    return {
      
      showModal: false,
      modal: {
        code: "",
        name: "",
        surname: "",
        gender: "",
        room: "",
        status: "",
      },

      statusList: [
        {
          id: "1",
          color: "text-rangmod-green",
          border_color: "border-rangmod-green",
          title: "พักอาศัย"
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          border_color: "border-rangmod-yellow",
          title: "รอเข้าพัก"
        },
        {
          id: "3",
          color: "text-rangmod-red",
          border_color: "border-rangmod-red",
          title: "ย้ายออก"
        },
      ],

      memberList: [
        {
          code: "00123",
          name: "ธนวินท์",
          surname: "วัตราเศรษฐ์",
          date: "29/03/2565",
          age: "24",
          gender: "ชาย",
          tel: "0809876543",
          address: "Address A",
          room: "201",
          status: "1",
        },
        {
          code: "00122",
          name: "นพศร",
          surname: "เตชะรุ่งเรืองวิทย์",
          date: "29/03/2565",
          age: "24",
          gender: "หญิง",
          tel: "0809876543",
          address: "Address B",
          room: "102",
          status: "2",
        },
        {
          code: "00121",
          name: "อาทฤต",
          surname: "วิจิตรพันธ์ไม้",
          date: "29/03/2565",
          age: "24",
          gender: "ชาย",
          tel: "0809876543",
          address: "Address C",
          room: "203",
          status: "3",
        },
      ],

      roomList: [
        {
          floor_number: 1,
          roomItems: [
            { room_number: "101", status: "3", isActive: true, },
            { room_number: "102", status: "1", isActive: true, },
            { room_number: "103", status: "3", isActive: true, },
            { room_number: "104", status: "3", isActive: true, },
          ],
        },
        {
          floor_number: 2,
          roomItems: [
            { room_number: "201", status: "1", isActive: true, },
            { room_number: "202", status: "3", isActive: true, },
            { room_number: "203", status: "1", isActive: true, },
            { room_number: "204", status: "3", isActive: true, },
          ],
        },
        {
          floor_number: 3,
          roomItems: [
            { room_number: "301", status: "3", isActive: false, },
            { room_number: "302", status: "2", isActive: true, },
            { room_number: "303", status: "3", isActive: false, },
            { room_number: "304", status: "2", isActive: true, },
          ],
        },
      ]
    }

  },

  methods: {
    showDetail(room_number){
      // console.log(`Show ${room_number} !`)

      this.showModal = true
      let memberList = this.memberList

      this.modal.code = ""
      this.modal.room = room_number
      for (var i = 0; i < memberList.length; i++){
        if (memberList[i].room == room_number){
          this.modal.code = memberList[i].code
          this.modal.name = memberList[i].name
          this.modal.surname = memberList[i].surname
          this.modal.gender = memberList[i].gender
          this.modal.status = memberList[i].status
        }
      }
      
    },
    sortRoom() {
      console.log('search');
    }
  }

}
</script>

<style>

</style>