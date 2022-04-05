<script setup>
import { ref } from 'vue'

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
      <input v-model="task.name" type="text" placeholder="Enter your task" class="px-12 py-2 border-solid border-2">
      <button v-if="!isEdit" @click="submitTask" class="px-3 py-1 btn ml-2 border-yellow-500 bg-yellow-500">SUBMIT</button>
      <button v-else @click="editTask" class="px-3 py-1 btn ml-2 border-yellow-500 bg-yellow-500">UPDATE</button>
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
            <span @click="changeStatus(task)" class="pointer">
              {{task.status}}
            </span>
          </td>
          <td>
            <div @click="changeEdit(task)" class="text-center">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td>
            <div @click="deleteTask(task)" class="text-center">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import ToDoListDataService from "../services/ToDoListDataService";

  export default {
    data() {
      return {
        task: {
          id: null,
          name: "",
          status: "To-do",
        },
        isEdit: false,
        editedTask: null,
        availableStatuses: ['To-do', 'In-progress', 'Done'],
        tasks: []
      }
    },

    methods: {

     getTask() {
        ToDoListDataService.getAll()
        .then((response)=> 
        {this.tasks = response.data;
        console.log(response.data)})
      },

      changeEdit(task){
        this.task = task;
        this.isEdit = true;
        this.task.name =task.name; 
      },

      submitTask() {
        const data = {
          name : this.task.name,
          status: "To-do"
        };
        ToDoListDataService.create(data)
        .then((response)=>
        {
          console.log(response.data);
          // Refresh the To-Do List
          this.getTask();
          // Clear the task input
          this.submitted = false;
          this.task = {};
        })
        .catch((e) => {
          console.log(e);
        })
      }, 

      deleteTask(tasks) {
        ToDoListDataService.delete(tasks.id)
        .then((response)=>
        {
          console.log(response.data);
          this.getTask();
        })
        .catch((e) => {
          console.log(e);
        });
      }, 

      editTask() {
        this.isEdit = false;
         ToDoListDataService.update(this.task.id, this.task)
         .then((response) => {   
           console.log(response.data);
           this.task = {};
          })
          .catch((e) => {
            console.log(e);
          });
      },

      changeStatus(task) {
        let newIndex = this.availableStatuses.indexOf(task.status);
        if(++newIndex > 2) newIndex = 0;
        task.status = this.availableStatuses[newIndex];
        ToDoListDataService.update(task.id, task)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      },
    },

    mounted() {
      this.getTask();
    }
  };
</script>

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
