import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../store/store.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api  from "../api/axiosIntercepter.js"; // our Axios instance
import { Navbar } from "@/components/Navbar.js";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
const { SetAccessToken } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 4) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Le mot de passe doit contenir au moins 4 caractères.",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("auth/register", {
        email,
        password,
        name: fullName,
        isAdmin: false,
      });
      if (res.data) {
        // make the toast in the buttom
        toast({
          title: "Inscription réussie !",
          description: "Vous pouvez maintenant vous connecter.",
        });

        setEmail("");
        setPassword("");
        setFullName("");
        setActiveTab("signin");
        // navigate("/");
      }
    } catch (error: unknown) {
 
               const err = error as AxiosError<{ message: string }>;

               toast({
                 variant: "destructive",
                 title: "Erreur de inscription",
                 description: err.response?.data?.message || "Erreur inconnue",
               });

    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      SetAccessToken(res.data.accessToken);
      useUserStore.getState().setUser(res.data.user);
      useUserStore.getState().SetAccessToken(res.data.accessToken);
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur Maison Élégante",
      });

      if (res.data.user.isAdmin) {
        navigate("/admin"); // go to admin dashboard
      } else {
        navigate("/"); // go to home page
      }
    } catch (error :unknown) {
          const err = error as AxiosError<{ message: string }>;

          toast({
            variant: "destructive",
            title: "Erreur de connexion",
            description: err.response?.data?.message || "Erreur inconnue",
          });


    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "url('/sec4.jpg')" }}
        className="h-[calc(100vh-100px)] flex items-center justify-center p-4 
             bg-cover bg-center bg-no-repeat animate-fade-in"
      >
        <Card className="w-full max-w-md animate-float shadow-2xl backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kings of Sedari
            </CardTitle>
            <CardDescription>Accédez à votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input
                      id="email-signin"
                      type="email"
                      placeholder="votre_main@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signin">Mot de passe</Label>
                    <Input
                      id="password-signin"
                      type="password"
                      placeholder="votre mot de passe "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Nom complet</Label>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Votre nom complet"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="votre_mail@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Mot de passe</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="votre mot de passe "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Inscription..." : "S'inscrire"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
