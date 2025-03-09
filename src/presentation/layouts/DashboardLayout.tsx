import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import SidebarMenuItem from "../components/sidebar/SidebarMenuItem";

export const DashboardLayout = () => {
  return (
    <main className="flex flex-row mt-7">
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-gray-800 bg-opacity-90 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          ReactGPT<span className="text-indigo-500">.</span>
        </h1>
        <span className="text-xl text-white">Bienvenido</span> {/* Texto blanco */}
        <div className="border-gray-700 border my-3" />
        {/* Opciones del menú */}

        {
          menuRoutes.map( option => (
            <SidebarMenuItem 
              key ={ option.to } 
              to = { option.to }
              icon = { option.icon }
              title = { option.title }
              description = { option.description }
            />
          ))
        }
      </nav>
      <section className="mx-1 sm:mx-5 flex flex-col w-full h-[calc(100vh-50px)] bg-gray-800 bg-opacity-90 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};