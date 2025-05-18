import Routes from "./routes";
import AuthProvider from "./provider/AuthProvider";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
