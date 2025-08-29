'use client'

import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [user, setUser] = useState({ name: 'Admin User', email: 'admin@furniq.com', role: 'admin' })
  const { theme, setTheme, systemTheme } = useTheme()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const themeDropdownRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-menu-button]')) {
        setIsMobileMenuOpen(false)
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target) && 
          !event.target.closest('[data-theme-button]')) {
        setIsThemeDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Remove manual theme management, next-themes handles this globally

  const handleProfile = () => {
    setIsDropdownOpen(false)
    router.push('/profile')
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('userData')
    router.push('/login')
  }

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    setIsThemeDropdownOpen(false)
  }

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Products', href: '/products', icon: '🛋️' },
    { name: 'Categories', href: '/categories', icon: '📂' },
    { name: 'Inventory', href: '/inventory', icon: '📦' },
    { name: 'Customers', href: '/customers', icon: '👥' },
    { name: 'Orders', href: '/orders', icon: '📝' },
    { name: 'Reports', href: '/reports', icon: '📈' },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        data-menu-button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md shadow-lg dark:bg-indigo-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <Bars3Icon className="w-5 h-5" />
        )}
      </button>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div ref={mobileMenuRef} className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg overflow-y-auto dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-100">Furniq Admin</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
                        pathname === item.href
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}

                {/* Theme switcher in mobile */}
                <li className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                    <div className="flex items-center space-x-2">
                      {mounted && (
                        <>
                          <button
                            onClick={() => changeTheme('light')}
                            className={`p-2 rounded-full ${theme === 'light' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                          >
                            <SunIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => changeTheme('dark')}
                            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                          >
                            <MoonIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="z-10 py-4 bg-white shadow-md md:ml-64 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="container flex items-center justify-between h-full px-4 md:px-6 mx-auto text-purple-600 dark:text-purple-400">
          <h1 className="text-xl font-semibold text-gray-800 md:hidden dark:text-white">
            {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
          </h1>

          {/* Search bar */}
          <div className="hidden md:flex justify-center flex-1 lg:mr-32">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </div>
              <input
                className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:bg-white focus:outline-none dark:bg-gray-700 dark:text-white"
                type="text"
                placeholder="Search for products, customers, orders..."
              />
            </div>
          </div>

          {/* Right side */}
          <ul className="flex items-center flex-shrink-0 space-x-4 md:space-x-6">
            {/* Theme switcher desktop */}
            <li className="relative hidden md:block" ref={themeDropdownRef}>
              <button
                data-theme-button
                className="relative align-middle rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              >
                {mounted && (theme === 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />)}
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <button onClick={() => changeTheme('light')} className="flex items-center w-full px-4 py-2 text-sm">
                    <SunIcon className="w-4 h-4 mr-2" /> Light
                  </button>
                  <button onClick={() => changeTheme('dark')} className="flex items-center w-full px-4 py-2 text-sm">
                    <MoonIcon className="w-4 h-4 mr-2" /> Dark
                  </button>
                  <button onClick={() => changeTheme('system')} className="flex items-center w-full px-4 py-2 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    System
                  </button>
                </div>
              )}
            </li>

            {/* User dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                className="align-middle rounded-full flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="ml-2 hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[120px] dark:text-gray-300">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize dark:text-gray-400">{user.role}</p>
                </div>
                <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 border-b dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <button onClick={handleProfile} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    Profile & Settings
                  </button>
                  <div className="border-t dark:border-gray-600"></div>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
