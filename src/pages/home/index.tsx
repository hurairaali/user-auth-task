import { useAuth } from "../../provider/AuthProvider";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Welcome {user?.firstName}!
        </h1>
        <div className="flex justify-center">
          <Button onClick={handleSignOut} variant="green" size="lg">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
