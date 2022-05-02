<template>

  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2">

    <div class="text-xl">ข้อมูลผู้พัก</div>
    <hr class="my-4 border-rangmod-purple">

    <div class="w-32 my-10 cursor-pointer" @click="add()">
      <div class="flex flex-row justify-start items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md">
        <div>สร้างประวัติ</div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">รหัสสมาชิก</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <th class="py-4">ว/ด/ป ลงทะเบียน</th>
        <th class="py-4">ห้อง</th>
        <th class="py-4"></th>
        <th class="py-4"></th>
      </tr>

      <tr
        v-for="(member, i) in memberList"
        :key="i"
        class="border-b border-rangmod-gray transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4">{{i+1}}</td>
        <td class="text-center py-4">{{member.code}}</td>
        <td class="text-center py-4">{{member.name}} {{member.surname}}</td>
        <td class="text-center py-4">{{member.date}}</td>
        <td class="text-center py-4">{{member.room}}</td>
        <td class="text-center py-4">
          <div
            v-for="(status, j) in statusList"
            :key="j"
          >
            <div 
              v-if="member.status == status.id"
              :class="`text-rangmod-${status.color}`"
            >
              {{status.title}}
            </div>
          </div>

        </td>
        <td class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold" @click="showDetail(member.code)">
          <!-- <RouterLink :to="`/member/${member.code}`"></RouterLink> -->
          <div>รายละเอียด</div>
        </td>
      </tr>

    </table>

  </div>

</template>

<script>
export default {

  data() {
    
    return {
      
      statusList: [
        {
          id: "1",
          color: "green",
          title: "พักอาศัย"
        },
        {
          id: "2",
          color: "yellow",
          title: "รอเข้าพัก"
        },
        {
          id: "3",
          color: "red",
          title: "ย้ายออก"
        },
      ],

      memberList: [
        {
          code: "00123",
          name: "ธนวินท์",
          surname: "วัตราเศรษฐ์",
          date: "29/03/2565",
          room: "201",
          status: "1",
        },
        {
          code: "00122",
          name: "นพศร",
          surname: "เตชะรุ่งเรืองวิทย์",
          date: "29/03/2565",
          room: "102",
          status: "2",
        },
        {
          code: "00121",
          name: "อาทฤต",
          surname: "วิจิตรพันธ์ไม้",
          date: "29/03/2565",
          room: "203",
          status: "3",
        },
      ]
    }

  },

  methods: {
    showDetail(member_code){
      console.log(`Show ${member_code} !`)
    }
  }

}
</script>

<style>

</style>