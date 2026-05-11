'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from './components/AuthProvider';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userType, setUserType] = useState('seeker'); // 'seeker' or 'owner'

  useEffect(() => {
    if (!loading && user) {
      router.push('/properties');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // If user is authenticated, don't render anything (will redirect via useEffect)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
     <section className="relative py-20 px-4 sm:px-6 lg:px-8">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80')",
    }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto text-white">
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Find Your Perfect Home
        <span className="block text-blue-400">Rent Smart</span>
      </h1>

      <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
        Connect directly with property owners and find your ideal rental property.
        No agents, no commissions, just direct connections between seekers and owners.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setUserType('seeker')}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
            userType === 'seeker'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          I'm Looking for a Property
        </button>

        <button
          onClick={() => setUserType('owner')}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
            userType === 'owner'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          I Want to List My Property
        </button>
      </div>
    </div>

    {/* Card Section */}
    <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
      {userType === 'seeker' ? (
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold mb-4">
              Find Your Dream Home
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Browse thousands of properties directly from owners. Filter by location,
              price, and amenities to find exactly what you're looking for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600 text-xl">All listings are from verified property owners</p>
            </div>

            <div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold mb-2">No Agent Fees</h3>
              <p className="text-gray-600 text-xl">Direct connection means no commission fees</p>
            </div>

            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600 text-xl">Contact owners directly for faster responses</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up as Property Seeker
            </Link>

            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Login to Browse Properties
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-3xl font-bold mb-4">
              List Your Property Today
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Reach thousands of potential tenants directly. No agents, no commissions,
              just direct connections with serious renters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold mb-2">More Visibility</h3>
              <p className="text-gray-600 text-xl">Your property gets maximum exposure</p>
            </div>

            <div>
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-2xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600 text-xl">No agent fees means more profit</p>
            </div>

            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-2">Targeted Audience</h3>
              <p className="text-gray-600 text-xl">Connect with serious renters</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Sign Up as Property Owner
            </Link>

            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              Login to Manage Properties
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
</section>

      {/* Features Section */}
      <section
  className="relative py-20 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Why Choose <span className="text-blue-400">Rent-Path</span>?
      </h2>

      <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
        We’re transforming the rental experience by connecting
        property owners and seekers directly with speed,
        transparency, and trust.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* Card 1 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 hover:-translate-y-2 hover:bg-white/15 transition-all duration-300">
        <div className="text-5xl mb-5">🔒</div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          Secure Platform
        </h3>

        <p className="text-gray-200 text-xl leading-relaxed">
          Verified users and secure transactions for safe renting.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 hover:-translate-y-2 hover:bg-white/15 transition-all duration-300">
        <div className="text-5xl mb-5">💬</div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          Direct Communication
        </h3>

        <p className="text-gray-200 leading-relaxed text-xl">
          Chat directly with landlords and property owners instantly.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 hover:-translate-y-2 hover:bg-white/15 transition-all duration-300">
        <div className="text-5xl mb-5">📱</div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          Mobile Friendly
        </h3>

        <p className="text-gray-200 leading-relaxed text-xl">
          Browse and manage properties seamlessly on any device.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 hover:-translate-y-2 hover:bg-white/15 transition-all duration-300">
        <div className="text-5xl mb-5">⭐</div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          Quality Assurance
        </h3>

        <p className="text-gray-400 leading-relaxed text-xl">
          All properties are reviewed, verified, and highly rated.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🏠</span>
                <span className="font-bold text-xl">Rent-Path</span>
              </div>
              <p className="text-gray-400 text-xl">
                Connecting property owners and seekers directly for better rental experiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-4">For Property Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/auth/login" className="hover:text-white">Login</Link></li>
                <li><a href="#features" className="hover:text-white">How it Works</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Property Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/register" className="hover:text-white">List Property</Link></li>
                <li><Link href="/auth/login" className="hover:text-white">Manage Listings</Link></li>
                <li><a href="#features" className="hover:text-white">Owner Benefits</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Rent-Path. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}