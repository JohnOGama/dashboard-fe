"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/const/const";
import axios, { AxiosError, AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/store/useAuthStore";
import { useCookies } from "react-cookie";

const Login = () => {
  const { login, user } = useAuthStore((state) => state);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      // if (!email || !password) {
      //   setError("All fields are required");
      // }
      // const response: AxiosResponse = await axios.post(
      //   `${baseUrl}/api/auth/login`,
      //   {
      //     email,
      //     password,
      //   }
      // );

      // if (response.status === 200) {
      //   const token = response.data.accessToken;
      //   login(email, password, token);
      //   setCookie("auth", token);
      //   toast({
      //     color: "white",
      //     title: "Successful login",
      //     description: "Redirect to dashboard",
      //   });
      // }
      const token = "123";
      login(email, password, token);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    if (user.token) {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
            {error && <h1 className="text-red-600">{error}</h1>}
            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button>Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <small className="text-center w-full">John Ogama dev</small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
