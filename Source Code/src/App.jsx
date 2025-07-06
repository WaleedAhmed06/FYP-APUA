import { ToastProvider } from "./context/ToastProvider";
import AppRouter from "./router/appRouter";

function App() {
  return (
    <div>
      <ToastProvider>
      <AppRouter />
      </ToastProvider>
    </div>
  );
}

export default App;
