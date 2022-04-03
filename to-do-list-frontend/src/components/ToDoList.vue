<script setup>
import { ref } from 'vue'
//import axios from 'axios'

defineProps({
   msg: String
})

const count = ref(0)
</script>

<template>
  <div class="container">
    <h1 class="text-2xl font-bold text-center mt-10">
    {{ msg }}
    </h1>

    <div class="text-center mt-10">
      <input v-model="task" type="text" placeholder="Enter your task" class="px-12 py-2 border-solid border-2">
      <button @click="submitTask" class="px-3 py-1 btn ml-2 border-yellow-500 bg-yellow-500">SUBMIT</button>
    </div>

    <table class="table-auto mt-10" style="margin-right:auto;margin-left:auto">
      <thead>
        <tr class="bg-gray-100">
          <th>Task</th>
          <th>Status</th>
          <th class="px-4 py-2">@</th>
          <th class="px-4 py-2">@</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td class="border px-28 py-2">
            <span :class="{'done': task.status === 'Done'}">
              {{task.name}}
            </span>
          </td>
          <td class="border px-4 py-2">
            <span @click="changeStatus(index)" class="pointer">
              {{task.status}}
            </span>
          </td>
          <td>
            <div @click="editTask(index)" class="text-center">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td>
            <div @click="deleteTask(index)" class="text-center">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import axios from "axios";

  export default {
    data() {
      return {
        task: '',
        editedTask: null,
        availableStatuses: ['To-do', 'In-progress', 'Done'],

        tasks: [
        {
          name: 'Eat breakfast',
          status: 'In-progress'
        },
        {
          name: 'Workout at the gym',
          status: 'To-do'
        },
        ]
      }
    },

    methods: {
      submitTask() {
        if(this.task.length === 0) return;

        if(this.editedTask === null) {
          this.tasks.push({
            name: this.task,
            status: 'To-do'
          });
        } else {
          this.tasks[this.editedTask].name = this.task;
          this.editedTask = null;
        }

        this.task='';
      }, 

      deleteTask(index) {
        this.tasks.splice(index, 1);
      }, 

      editTask(index) {
        this.task = this.tasks[index].name;
        this.editedTask = index;
      }, 

      changeStatus(index) {
        let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
        if(++newIndex > 2) newIndex = 0;
        this.tasks[index].status = this.availableStatuses[newIndex];
      },
    }
  };
</script>

<!--
<script>  
  export default {
    name: "TaskList",
    data() {
      return {
        items: [],
      };
    },
  
    created() {
      this.getTasks();
    },
  
    methods: {
      // Get All Tasks
      async getTasks() {
        try {
          const response = await axios.get("http://localhost:3000/task");
          this.tasks = response.data;
        } catch (err) {
          console.log(err);
        }
      },
  
      // Delete Task
      async deleteTask(index) {
        try {
          await axios.delete(`http://localhost:3000/task/${index}`);
          this.getTasks();
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
</script>
-->

<style scoped>
a {
  color: #42b983;
}

.pointer {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
}
</style>
