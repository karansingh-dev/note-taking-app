import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from "react-hot-toast"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './context/userContext.tsx';


const queryClient = new QueryClient();




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
  <UserProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <App />
        </LocalizationProvider>
      </BrowserRouter>
      </UserProvider>

    </QueryClientProvider>
  </StrictMode>,
)
