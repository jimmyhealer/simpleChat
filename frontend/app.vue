<script lang="ts" setup>
import { ref } from 'vue'
import {
  getChatData, clearChatData, submitChatData,
  saveChatData, loadChatData
} from './api'

interface ChatData {
  id: number
  name: string
  message: string
  time: string
}

const chatData = ref<ChatData[]>()
const user = ref<string>()
const message = ref<string>()

const refreshHandler = () => {
  getChatData().then((res: any) => {
    chatData.value = res.data.data;
  })
}

const clearHandler = () => {
  clearChatData().then(() => {
    chatData.value = []
  })
}

const submitHanlder = () => {
  submitChatData({
    name: user.value,
    message: message.value
  }).then((res: any) => {
    chatData.value = res.data.data
  })
}

const saveHandler = () => {
  saveChatData().then((res: any) => {
    chatData.value = res.data.data
  })
}

const loadHandler = () => {
  loadChatData().then((res: any) => {
    chatData.value = res.data.data
  })
}

refreshHandler();
</script>

<template>
  <div class="container">
    <div class="chat">
      <div v-for="item in chatData" :key="item.id">
        <span>{{ item.name }} </span><span class="verb">說</span><span>{{ item.message }}</span><span class="time">({{
    item.time
}})</span>
      </div>
    </div>
    <div class="form">
      <div class="row">
        <label>User: </label>
        <input type="text" class="user-input" v-model="user">
        <label>Say: </label>
        <input type="text" class="message-input" v-model="message">
        <button @click="submitHanlder">Submit</button>
      </div>
      <div class="row">
        <button @click="refreshHandler">Refresh</button>
        <button @click="clearHandler">Clear</button>
        <button @click="saveHandler">Save to Atlas</button>
        <button @click="loadHandler">Reload from Atlas</button>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
}

.chat {
  width: 800px;
  height: 200px;
  padding: 5px;
  background-color: lightyellow;
  border: 1px solid black;
  overflow-y: scroll;
}

.verb {
  font-weight: bold;
  margin-right: 3px;
  background-color: rgba(250, 185, 34);
}

.time {
  font-size: .7em;
  margin-left: 3px;
  color: darkblue;
}

.row {
  display: flex;
  flex-direction: row;
}

.row {
  padding: 5px;
}

label,
input,
button {
  margin: 0px 5px;
}
</style>