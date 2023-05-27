import React from 'react'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import InputSearch from './Components/InputSearch'


const queryClient = new QueryClient()

function App() {
  return (
  <div>
    <QueryClientProvider client={queryClient}>
      <InputSearch />
    </QueryClientProvider>
  </div>
  )
}

export default App
