<template>
  <div class="font-primary bg-white rounded-xl">

    <NavMenu />
    <RepairStatus />
    <RepairForm />
    
  </div>
</template>

<script>

import RepairStatus from "@/components/repair_status/RepairStatus.vue";
import RepairForm from "@/components/repair_status/RepairForm.vue";
import NavMenu from "@/components/NavMenu.vue";

export default {

  components: { RepairStatus, RepairForm, NavMenu },

  data() {
    return {

    }
  }

}
</script>

<style>

</style>