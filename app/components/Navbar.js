'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-300 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? "/properties" : "/"} className="flex items-center space-x-2">
            <span className="text-3xl">🏠</span>
            <span className="font-bold text-2xl text-blue-600">Rentify</span>
          </Link>

          <div className="flex space-x-4">
            {user ? (
              <>
                <Link
                  href="/properties"
                  className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                    pathname === '/properties'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Browse Properties
                </Link>
                {user.userType === 'owner' && (
                  <Link
                    href="/add-property"
                    className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                      pathname === '/add-property'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    List Your Property
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user.name}
                    {user.userType === 'owner' ? ' (Owner)' : ' (Seeker)'}
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-2 rounded-md text-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-2 rounded-md text-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}