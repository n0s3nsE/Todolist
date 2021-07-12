require('./bootstrap');

import { createApp } from 'vue'
import todolist from './components/Todolist.vue'

createApp({
    components: {
        todolist
    }
}).mount("#app")