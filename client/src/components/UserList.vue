<template>
  <table
    v-if="userList?.length"
    border="1"
    class="user-list"
  >
    <thead>
      <tr>
        <th>email</th>
        <th>number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user of userList"
        :key="user.email + user.number"
        class="user-list__item"
      >
        <td>{{ user.email }}</td>
        <td>{{ user.number }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { IUser } from '@/helpers/interfaces'

defineProps({
  userList: Array<IUser>
})
</script>

<style lang="scss">
.user-list {
  margin-top: 20px;
  width: 100%;
  & th,
  & td {
    padding: 10px 15px;
  }
}
</style>
