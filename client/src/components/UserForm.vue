<template>
  <div class="user-form__container">
    <div class="user-form">
      <div class="user-form__field">
        <div class="user-form__input-label">
          Email:<span style="color: tomato">*</span>
        </div>
        <div class="user-form__input-container">
          <input
            @focus.once="isEmailInputFocused = true"
            v-model="form.email"
            class="user-form__input"
            type="email"
          />
        </div>
      </div>
      <div
        class="user-form__field-error"
        :style="{
          opacity: showEmailError ? 1 : 0,
          padding: showEmailError ? '5px 0' : 0
        }"
      >
        please enter valid email
      </div>
      <div class="user-form__field">
        <div class="user-form__input-label">Number:</div>
        <div class="user-form__input-container">
          <input
            v-model="form.number"
            v-maska:[options]
            class="user-form__input"
            type="text"
          />
        </div>
      </div>
      <div class="user-form__submit-btn-container">
        <a-button
          type="primary"
          :disabled="!isEmailValid"
          @click="submitForm"
          :loading="isRequestSended"
        >
          <template v-if="!isRequestSended"> </template>
          Submit
        </a-button>
      </div>
      <template v-if="userList.length > 0">
        <UserList :userList="userList" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import UserList from './UserList.vue'
export default {
  components: {
    AButton: Button
  }
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vMaska } from 'maska'

import api from '../helpers/api'
import type { IUser } from '../helpers/interfaces'

const options = ref({
  mask: (value: string) => {
    let result = ''
    for (let index = 0; index < value.replace(/-/g, '').length; index++) {
      if (index > 0 && index % 2 === 0) {
        result += '-#'
      } else {
        result += '#'
      }
    }
    return result
  },
  eager: true
})

const userList = ref<IUser[]>([])

const form = ref<IUser>({
  email: 'jams@gmail.com',
  number: ''
})

const isEmailValid = computed(() => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return pattern.test(form.value.email)
})

const isEmailInputFocused = ref(false)

const showEmailError = computed(
  () => isEmailInputFocused.value && !isEmailValid.value
)

const isRequestSended = ref(false)

async function submitForm() {
  try {
    isRequestSended.value = true

    const formNumber = form.value.number
    const reqBody: IUser = {
      email: form.value.email
    }

    if (formNumber && typeof formNumber === 'string') {
      reqBody.number = Number(formNumber.replace(/-/g, ''))
    }

    const req = await api.post('user', {
      ...reqBody
    })
    userList.value = req.data
  } catch (error) {
    console.error(error)
  } finally {
    isRequestSended.value = false
  }
}
</script>

<style lang="scss">
.user-form {
  border-radius: 10px;
  padding: 30px 50px;
  background-color: white;
  color: black;
  font-size: 20px;

  &__container {
    background-color: #222;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__field {
    display: flex;
    align-items: flex-end;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &-error {
      font-size: 14px;
      padding: 5px 0;
      margin-top: -20px;
      opacity: 0;
      color: tomato;
    }
  }

  &__input {
    padding: 5px 10px;
    border-radius: 10px;
    outline: none;
    border: 1px solid black;

    &-container {
      margin-left: auto;
      padding-left: 20px;
    }
  }

  &__submit-btn {
    margin-top: 10px;
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    min-width: 150px;

    &_disabled {
      background-color: grey;
      color: black;
      cursor: not-allowed;
    }

    &-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
../helpers/interfaces
