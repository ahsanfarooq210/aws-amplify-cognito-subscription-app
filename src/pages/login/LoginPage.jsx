import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate()


  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2 rounded-lg bg-white text-black">
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800 rounded-lg">
        {/* <image
          alt="login page"
          className="h-full w-full object-cover rounded-lg"
          height="800"
          src="/login.png"
          style={{
            aspectRatio: "1200/800",
            objectFit: "cover",
          }}
          width="1200"
        /> */}
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please continue with Google or Email
            </p>
          </div>
          <div className="w-full h-max flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <Label htmlFor="email-input" className="text-muted-foreground">
                Email
              </Label>
              <Input
                className="w-full"
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Label htmlFor="password-input" className="text-muted-foreground">
                Password
              </Label>
              <Input
                className="w-full"
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={()=>{}}>
              Login
            </Button>
            <p className="text-muted-foreground w-full text-center">
              Dont have an account?{" "}
              <span
                className="text-secondary hover:text-primary cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
