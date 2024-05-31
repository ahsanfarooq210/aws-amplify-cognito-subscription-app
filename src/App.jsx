import "./App.css";
import AppRouter from "./routes/AppRouter";
import awsconfig from "./aws-exports.js";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  console.log("user data", user);
  const {setUser,setSignout  } = useAppContext()

  useEffect(() => {
    setUser(user);
    setSignout(()=>signOut)
  }, []);
  
  return (
    <div className="w-screen h-screen overflow-auto">
      {/* <Button onClick={signOut}>Signout</Button> */}
      <AppRouter   />
    </div>
  );
}

export default withAuthenticator(App);
