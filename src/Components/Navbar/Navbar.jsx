import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../Helpers/Helpers'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo/reshot-icon-shopping-cart-FQVKD3HXJT.svg'
import { AuthContext } from '../../Context/AuthContext'
import { CartCountContext } from '../../Context/CartCountContext'
import LogoTwo from '../../assets/Logo/0089b7ae1ed394f041c5f7929e111c11e8eafe4d-424x421.webp'

import { useContext } from 'react'


const navigation = [
  { name: 'Home', href: ''},
  { name: 'Product', href: 'product'},
  { name: 'Brands', href: 'brands'},
  { name: 'Orders', href: 'allorders'},
]


export default function Navbar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  const { cartCount } = useContext(CartCountContext)
  const navigate = useNavigate()
  function logout() {
    setIsUserLoggedIn(false)
    navigate("/login")
    localStorage.removeItem("token")
  }
  return (
<Disclosure as="nav" className="bg-gray-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={Logo}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {isUserLoggedIn && navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      'text-gray-500 hover:bg-gray-200  rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {   isUserLoggedIn &&<>
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={LogoTwo}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                <Link to={'carts'} className="flex justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-start">
                  <span>Cart</span>
                  <span className='w-5 h-5 border flex justify-center items-center rounded-[50%] text-yellow-500 border-yellow-300'>{cartCount}</span>
                  </Link>
                </MenuItem>

                <MenuItem>
                  <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-start">
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            </>}
            {isUserLoggedIn || <>
              <NavLink
                    
                    to={'login'}
                    aria-current={'page'}
                    className={classNames(
                      'text-gray-500 hover:bg-gray-200  rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={'register'}
                    aria-current={'page'}
                    className={classNames(
                      'text-gray-500 hover:bg-gray-200  rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    Register
                  </NavLink>
            </>}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
