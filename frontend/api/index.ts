import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getChatData = () => {
  return api.get('/chat');
}

export const submitChatData = (data: any) => {
  return api.post('/chat', data);
}

export const clearChatData = () => {
  return api.delete('/chat');
}

export const saveChatData = () => {
  return api.get('/save');
}

export const loadChatData = () => {
  return api.get('/get');
}