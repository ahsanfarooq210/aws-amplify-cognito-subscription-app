import "./App.css";
import AppRouter from "./routes/AppRouter";
import awsconfig from "./aws-exports.js";
import { Amplify} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";
import {listProfiles} from './graphql/queries'
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json'

Amplify.configure(config);

const graphqlClient=generateClient()

function App({ signOut, user }) {
  console.log("user data", user);
  const {setUser,setSignout  } = useAppContext()

  // const hitAPi=async()=>{
  //   try {
  //     const data = await graphqlClient.graphql({
  //       query:listProfiles,

  //     }) 

  //     console.log("hit api data", data)
  //   } catch (error) {
  //       console.log("hit api error", error)
  //   }
  // }

  useEffect(() => {
    setUser(user);
    setSignout(()=>signOut)
    // hitAPi()
  }, []);
  
  return (
    <div className="w-screen h-screen overflow-auto">
      {/* <Button onClick={signOut}>Signout</Button> */}
      <AppRouter   />
    </div>
  );
}

export default withAuthenticator(App);
