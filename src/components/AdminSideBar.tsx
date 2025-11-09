import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/store";
import api, { setAccessToken } from "../api/axiosIntercepter"; // our Axios instance
import { useToast } from "@/hooks/use-toast";
import { IoMdSettings } from "react-icons/io";

function AdminSideBar() {

  const { SetAccessToken, clearAccessToken } = useUserStore();
  const routes = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-3"
          viewBox="0 0 24 24"
        >
          <path d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z" />
          <path d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z" />
        </svg>
      ),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-3"
          viewBox="0 0 512 512"
        >
          <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754z" />
        </svg>
      ),
    },
    {
      name: "manage Products",
      path: "/admin/manage-products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-3"
          viewBox="0 0 576 512"
        >
          <path d="M528 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM144 400c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm336-64H96V96h384v240z" />
        </svg>
      ),
    },
  ];

  const navigate = useNavigate();
  const { toast } = useToast();

  const [openSide, setOpenSide] = useState(true);

  const handleLogout = async () => {
    try {
      const res = api.post("/auth/logout");
      console.log(res.data);
      useUserStore.getState().setUser(null);
      // SetAccessToken(null);
      clearAccessToken()
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-[#f7f7f8]   hidden  h-screen  lg:block   lg:min-w-[250px] border  py-6 px-4">
        <div className="relative flex  items-center justify-center mb-6">
          <Link to="/admin">
            <img
              src={"/logo.svg"}
              alt={"Image du produit"}
              className="w w-[150px] h-20 p-2 rounded-2xl"
            />
          </Link>
        </div>

        <div className="overflow-auto h-full">
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  onClick={() => setOpenSide(true)}
                  to={route.path}
                  className="text-slate-800 font-medium hover:text-slate-900 hover:bg-gray-200 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                >
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
            <button className="mt-10" onClick={handleLogout}>
              <div className="flex hover:bg-gray-200  transition-all items-center">
                <CiLogin color="red" size={30} />
                <h1 className="text-slate-800 font-medium hover:text-slate-900 text-[15px] flex items-center rounded px-4 py-2 ">
                  {" "}
                  Déconnecter
                </h1>
              </div>
            </button>
          </ul>
        </div>
      </nav>
      {/*the fixed one  */}

      <div
        className={`    ${
          openSide ? " translate-x-[-220px] " : "translate-x-[0px] "
        }
 bg-[#f7f7f8]    lg:hidden z-[99]  h-screen   animate-scale-in  transition-all fixed top-0 left-0  border  py-6 px-4    `}
      >
        <button
          className="border-r-2 border-b-2  bg-[#f7f7f8]  absolute rounded-r-full right-[-40px] p-2 "
          onClick={() => setOpenSide(!openSide)}
        >
          <IoMdSettings size={25} />
        </button>
        <div className="relative flex  items-center justify-center mb-6">
          <Link to="/admin">
            <img
              src={"/logo.svg"}
              alt={"Image du produit"}
              className="w w-[150px] h-20 p-2 rounded-2xl"
            />
          </Link>
        </div>

        <div className="overflow-auto h-full">
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  onClick={() => setOpenSide(true)}
                  to={route.path}
                  className="text-slate-800 font-medium hover:text-slate-900 hover:bg-gray-200 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                >
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
            <button className="mt-10" onClick={handleLogout}>
              <div className="flex hover:bg-gray-200  transition-all items-center">
                <CiLogin color="red" size={30} />
                <h1 className="text-slate-800 font-medium hover:text-slate-900 text-[15px] flex items-center rounded px-4 py-2 ">
                  {" "}
                  Déconnecter
                </h1>
              </div>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;
