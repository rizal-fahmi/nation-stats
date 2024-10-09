import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b-2 border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          <Link
            to={`/`}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="h-8" alt="nationstats logo" />
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-400 rounded-lg md:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              isOpen ? 'block' : 'hidden'
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={`/`}
                  className={({ isActive }) =>
                    `block w-full py-2 px-3 font-medium rounded-md mt-2 transition duration-300 ease-in-out ${
                      isActive
                        ? 'bg-blue-400 text-white'
                        : 'text-gray-700 hover:bg-blue-400 hover:text-white'
                    } md:w-auto md:hover:bg-blue-400 md:hover:text-white dark:text-white`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/compare`}
                  className={({ isActive }) =>
                    `block w-full py-2 px-3 font-medium rounded-md mt-2 transition duration-300 ease-in-out ${
                      isActive
                        ? 'bg-blue-400 text-white'
                        : 'text-gray-700 hover:bg-blue-400 hover:text-white'
                    } md:w-auto md:hover:bg-blue-400 md:hover:text-white dark:text-white`
                  }
                >
                  Compare
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/news`}
                  className={({ isActive }) =>
                    `block w-full py-2 px-3 font-medium rounded-md mt-2 transition duration-300 ease-in-out ${
                      isActive
                        ? 'bg-blue-400 text-white'
                        : 'text-gray-700 hover:bg-blue-400 hover:text-white'
                    } md:w-auto md:hover:bg-blue-400 md:hover:text-white dark:text-white`
                  }
                >
                  News
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
