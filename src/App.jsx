import "./App.css";
import AppRouter from "./routes/AppRouter";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";
import config from "./amplifyconfiguration.json";

Amplify.configure(config);

function App({ signOut, user }) {
  console.log("user data", user);
  const { setUser, setSignout } = useAppContext();

  useEffect(() => {
    console.log("user in app", user);
    setUser(user);
    setSignout(() => signOut);
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
      <AppRouter />
    </div>
  );
}

export default withAuthenticator(App);
