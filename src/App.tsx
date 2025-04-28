import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from "react-router-dom"
import routes from "./router/routes"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
     <RouterProvider router={routes}/>
     <Toaster position="top-right"/>
    </ThemeProvider>
  )
}

export default App
