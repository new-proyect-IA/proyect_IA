import { NavLink } from "react-router-dom";


interface props {
    to: string;
    icon: string;
    title: string;
    description: string
}

const SidebarMenuItem = ({
    to, icon, title, description
}: props) => {
  return (
    <>
        <NavLink
          key={ to }
          to={ to }
          className={
            ({ isActive }) => 
              isActive
                ? 'flex justify-center items-center bg-gay-800 rounde-md p-2 transition-colors'
                : 'flex justify-center items-center hover:bg-gay-800 rounde-md p-2 transition-colors'
              }
        >
          <i className={`${ icon } text-4x1 mt-2 mr-4 text-indigo-400`}></i>
          <div className="flex flex-col flex-grow">
              <span className="text-white text-lg font-semibold">
                { title }
              </span>
              <span className="text-gray-400 text-sm">
                { description }
              </span>
          </div>

        </NavLink>
    </>
  )
}

export default SidebarMenuItem