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
import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/store/useAuthStore";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login, token, errorMessage, onError, successMessage, loading } =
    useAuthStore((state) => state);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["auth"]);
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      login(email, password, rememberMe);
      if (token) {
        setCookie("auth", token, { path: "/" });

        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    if (cookies.auth) {
      router.push("/");
    }
  }, [cookies, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
            <div>
              <Label>Username</Label>
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
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe((prev) => !prev)}
              />
              <Label htmlFor="remember" className="cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button disabled={loading} type="submit">
              {loading ? "Submitting..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {onError && <h1 className="text-red-600">{errorMessage}</h1>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
