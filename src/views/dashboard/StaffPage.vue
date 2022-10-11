<template>
  
    <div>
      <SearchPanel />
      <StaffList />
    </div>
  
  </template>
  
  <script>
  
  import SearchPanel from "@/components/manage_staff/SearchPanel.vue"
  import StaffList from "@/components/manage_staff/StaffList.vue"
  
  export default {
  
    components: { SearchPanel, StaffList }
  
  }
  </script>
  
  <style>
  
  </style>