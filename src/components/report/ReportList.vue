<template>

  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2">

    <div class="text-xl">รายงานปัญหา</div>
    <hr class="my-4 border-rangmod-purple">

    <div class="flex flex-row justify-between items-center">
      
      <div class="flex flex-row space-x-2 items-center mb-4">
        <router-link to="/member/report">
          <div
          v-for="(status, i) in requestStatusList"
          :key="i"
          :class="status.bgcolor"
          @click="doFilter(status.id)"
          class="px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90"

        >
          <div
            :class="status.color"
            class="text-lg"
          >{{status.title}}</div>
          </div>
        </router-link>
        <!-- <div 
          @click="doFilter('')"
          class="px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90 bg-rangmod-black/20"
        >
          <div
            class="text-lg text-rangmod-black"
          >ทั้งหมด</div>
        </div> -->
      </div>

      <div 
        @click="activeSortFilter = !activeSortFilter"
        class="flex flex-row space-x-2 items-center cursor-pointer relative"
      >
        <div>เรียงจาก</div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div 
          v-if="activeSortFilter"
          class="absolute top-10 right-0 z-10"
        >
          <div class="w-48 mx-auto p-3 text-center bg-white shadow-lg rounded-xl">
            <div 
              v-for="(sort, i) in sortList"
              :key="i"
              @click="doSort(sort.key)"
              class="w-full text-lg py-2 rounded-xl transition-all hover:bg-rangmod-light-pink">
              {{sort.name}}
            </div>
          </div>
        </div>

      </div> 

      


    </div>

    <table class="w-full text-rangmod-black mb-10">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <!-- <th class="py-4">ห้อง</th> -->
        <th class="py-4">รหัสรายงาน</th>
        <th class="py-4">หัวข้อปัญหา</th>
        <th class="py-4">ว/ด/ป แจ้งซ่อม</th>
        <th class="py-4">ว/ด/ป นัดซ่อม</th>
        <th class="py-4">สถานะ</th>    
        <th class="py-4"></th>
      </tr>

      <tr
        v-for="(request, i) in requestList"
        :key="i"
        class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4">{{i+1}}</td>
        <!-- <td class="text-center py-4">{{request.room}}</td> -->
        <td class="text-center py-4">{{request.id}}   </td>
        <td class="text-center py-4">{{request.title}}</td>
        <td class="text-center py-4">{{request.request_date}}</td>
        <td class="text-center py-4">
          <div 
            v-for="(repair, j) in request.repair_date"
            :key="j"
          >
            <div v-if="repair.isActive">{{repair.date}}</div>
          </div>
        </td>
        <td class="text-center py-4">
          <div
            v-for="(status, j) in requestStatusList"
            :key="j"
          >
            <div 
              v-if="request.status == status.id"
              :class="status.color"
            >
              {{status.title}}
            </div>
          </div>

        </td>
        <!-- <td class="text-center py-4">
          <RouterLink 
            :to="`/dashboard/report/${request.id}`"
            class="text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          >
            รายละเอียด
          </RouterLink>
        </td> -->
        <td class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold" @click="showDetail(request.id)">
          <!-- <RouterLink :to="`/member/${member.code}`"></RouterLink> -->
          <div>รายละเอียด</div>
        </td>
        <!-- <transition> -->
          <div 
            v-if="showModal" 
            class="
              absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all z-20
              bg-white w-1/3  px-10 py-5 rounded-xl shadow-md text-xl
            "
          >
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

            <div class="text-2xl text-rangmod-purple mb-5">รายละเอียดแจ้งซ่อม</div>
            
            <div class="mb-8">
              <div class="text-rangmod-black px-1">หัวข้อปัญหา</div>
              <div class="border border-rangmod-gray rounded-xl px-3 relative">
                <input 
                  type="text" 
                  v-model="modal.code"
                  class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                >
                
                <!-- <div 
                  class="absolute right-4 top-2 text-rangmod-purple cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div> -->

              </div>
            </div>

            <div class="mb-4">
              <div class="text-rangmod-black text-xl px-1">ชื่อ</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input 
                  type="text"
                  readonly
                  v-model="modal.name"
                  class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                >
              </div>
            </div>

            <div class="mb-4">
              <div class="text-rangmod-black text-xl px-1">นามสกุล</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input 
                  type="text"
                  readonly
                  v-model="modal.surname"
                  class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                >
              </div>
            </div>

            <div class="mb-4 grid grid-cols-2 gap-2">
              <div class="text-rangmod-black text-xl px-1">
                ว/ด/ป/เกิด
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.date"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>

              <div class="text-rangmod-black text-xl px-1">
                อายุ
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.age"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>
            </div>

            <div class="mb-4 grid grid-cols-2 gap-2">
              <div class="text-rangmod-black text-xl px-1">
                เพศ
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.gender"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>

              <div class="text-rangmod-black text-xl px-1">
                เบอร์มือถือ
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.tel"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>
            </div>

            <div class="mb-4">
              <div class="text-rangmod-black text-xl px-1">ที่อยู่</div>
              <div class="border border-rangmod-gray rounded-xl -pb-4">
                <textarea 
                  readonly
                  v-model="modal.address"
                  class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider resize-none"
                ></textarea>
              </div>
            </div>

            <div class="mb-4 grid grid-cols-2 gap-2">
              <div class="text-rangmod-black text-xl px-1">
                ห้องพัก
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.room"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>

              <div class="text-rangmod-black text-xl px-1">
                สถานะ
                <div class="border border-rangmod-gray rounded-xl">
                  <input 
                    type="text"
                    readonly
                    v-model="modal.status"
                    class="bg-rangmod-gray/40 px-3 w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
                  >
                </div>
              </div>
            </div>

            <div class="flex flex-row space-x-4 justify-end">

              <div class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
                ยืนยัน
              </div>

            </div>

          </div>
        <!-- </transition> -->
      </tr>

    </table>
    

  </div>

</template>

<script>

export default {

  data() {
    
    return {

      activeSortFilter: false,
      modal: {
        code: "00000",
        name: "name",
        surname: "surname",
        date: "XX/XX/XXXX",
        age: "24",
        gender: "หญิง",
        tel: "0809876543",
        address: "Address B",
        room: "102",
        status: "2",
      },

      sortList: [
        { key: "id", name: "รหัสรายงาน" },
        { key: "room", name: "ห้อง" },
        { key: "request_date", name: "ว/ด/ป แจ้งซ่อม" },
      ],

      requestStatusList: [
        {
          id: "1",
          color: "text-rangmod-dark-yellow",
          bgcolor: "bg-rangmod-light-yellow",
          title: "แจ้งปัญหา"
        },
        // {
        //   id: "2",
        //   color: "text-rangmod-yellow",
        //   bgcolor: "bg-rangmod-yellow/20",
        //   title: "รอดำเนินการ"
        // },
        // {
        //   id: "3",
        //   color: "text-rangmod-green",
        //   bgcolor: "bg-rangmod-green/20",
        //   title: "ดำเนินการแล้ว"
        // },
        // {
        //   id: "4",
        //   color: "text-rangmod-purple",
        //   bgcolor: "bg-rangmod-purple/20",
        //   title: "เลื่อนนัด"
        // },
        // {
        //   id: "5",
        //   color: "text-rangmod-red",
        //   bgcolor: "bg-rangmod-red/20",
        //   title: "ยกเลิก"
        // },
            
      ],

      requestList: [ 
        {
          id: "ED123456",
          room: "201",
          title: "น้ำไม่ไหล",
          desc: "น้ำไม่ไหล DESC ",
          status: "1", 
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1"
            },
            {
              date: "",
              isActive: false,
              remark: ""
            }, 
            {
              date: "",
              isActive: false,
              remark: ""
            },
          ],
        },
        {
          id: "ED654321",
          room: "102",
          title: "ไฟไม่ติด",
          desc: "ไฟไม่ติด DESC ",
          status: "1", 
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1"
            },
            {
              date: "",
              isActive: false,
              remark: ""
            }, 
            {
              date: "",
              isActive: false,
              remark: ""
            },
          ],
        },
        {
          id: "ED789101",
          room: "203",
          title: "น้ำรั่ว",
          desc: "น้ำรั่ว DESC ",
          status: "1", 
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1"
            },
            { 
              date: "",
              isActive: false,
              remark: ""
            }, 
            {
              date: "",
              isActive: false,
              remark: ""
            },
          ],
        },
        {
          id: "ED786123",
          room: "203",
          title: "ปลวกขึ้น",
          desc: "ปลวกขึ้น DESC ",
          status: "1", 
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1"
            },
            {
              date: "",
              isActive: false,
              remark: ""
            }, 
            {
              date: "",
              isActive: false,
              remark: ""
            },
          ],
        },
        {
          id: "ED543210",
          room: "201",
          title: "โต๊ะพัง",
          desc: "โต๊ะพัง DESC ",
          status: "1", 
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1"
            },
            {
              date: "",
              isActive: false,
              remark: ""
            }, 
            {
              date: "",
              isActive: false,
              remark: ""
            },
          ],
        },

      ]
    }
    
  },

  methods: {
    doFilter(id) {
      console.log(`Filtered by ${id} !`)
    },
    doSort(id) {
      console.log(`Sorted by ${id} !`)
    },
    showDetail(report_code){
      console.log(`Show ${report_code} !`)

      this.showModal = true
      // let memberList = this.memberList

      // for (var i = 0; i < memberList.length; i++){
      //   if (memberList[i].code == report_code){
      //     this.modal.code = memberList[i].code
      //     this.modal.name = memberList[i].name
      //     this.modal.surname = memberList[i].surname
      //     this.modal.date = memberList[i].date
      //     this.modal.age = memberList[i].age
      //     this.modal.gender = memberList[i].gender
      //     this.modal.tel = memberList[i].tel
      //     this.modal.address = memberList[i].address
      //     this.modal.room = memberList[i].room
      //     this.modal.status = memberList[i].status
      //   }
      // }
      
    }
  }

}
</script>

<style>

</style>