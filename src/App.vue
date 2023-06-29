<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import ggl from 'graphql-tag';
import { computed, ref } from 'vue';



/** GRAPHQL Fetch Logic */

const SAMPLE_QUERY = ggl`
query(
  $id: ID!
)  {
  post (id: $id) {
    id
    title
    body
  }
}
`

const fetchOptions = ref({ enabled: false });

const variables = ref({ id: 1 })
const posts = useQuery<Post>(SAMPLE_QUERY, variables, fetchOptions);


/** Button Logic */

const  inputRef = ref<HTMLInputElement>()
async function fetchData() {
  fetchOptions.value.enabled = true;
  console.log(inputRef.value?.value);
  variables.value.id = +(inputRef.value?.value || 1);
  
}


/** __TYPE DEFINITION__ */

interface Post {
  post?: {
    title?: string;
    id?: number;
    body?: number;
  }
}
</script>

<template>
  <div class="container">
    <div>
      <h3>Vue 3 + Apollo Basic Graph Fetch</h3>
      <label>Basic implementation of Apollo GraphQL in Vue 3 Composition API using script setup</label>
    </div>
    
    <div class="controls">
      <div>
        <p>Post ID:</p>
        <input 
          ref="inputRef"
          type="number"
          class="searchBar" 
          :value="variables.id" 
        >
      </div>
      <div>
        <button @click="fetchData" class="loadDataBtn">Load Data</button>
      </div>
    </div>
    
    <main>
      <!-- Loader -->
      <p 
        v-if="posts.loading.value" class="loading-screen"
      >
        Loading...
      </p>
      <!-- Error -->
      <p v-else-if="posts.error.value" class="error">
      {{  posts.error.value  }}
      </p>
      <!-- Actual Value -->
      <div v-else-if="posts.result.value?.post">
        <h3 class="title">Post #{{ posts.result.value.post.id  }}: {{  posts.result.value.post.title  }}</h3>
        <p class="body">{{  posts.result.value.post.body  }}</p>
      </div>
      <p v-else>
          No Data Available
      </p>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.container {
  height: 100vh;
  width: 100vw;
  padding: 3rem;
}
main {
  margin-top: 3rem;
  padding: 1rem;
  border: solid 1px gray;
  position: relative;
}

.controls {
  margin-top: 3rem;
  display:  flex;
  gap: 2rem;
  align-items: end;
}

.searchBar {
  padding: 0.5rem;
  background-color: #444444;
  outline: none;
  border: solid 1px lightgray;
  color: white;
}

.loadDataBtn {
  cursor: pointer;
  background-color: gray;
  padding: 0.5rem 2rem;
  color: white;
}
.loadDataBtn:hover {
  background-color: lightgray;
}

.error {
  color: red;
}
.loading-screen {
  position: absolute;
  top: 0;
  lefT: 0;
  background-color: #444444;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

}

.title {
  color: lightgray;
}

.body {
  margin-top: 2rem;
  color: gray;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
