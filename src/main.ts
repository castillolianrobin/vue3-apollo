import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'


/** APOLLO INTEGRATION */

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://main--lian-robin-castillos-92ydxb.apollographos.net/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})


const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})


app.use(createPinia())
app.mount('#app')
