'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PropertyForm from '../components/PropertyForm';
import { useAuth } from '../components/AuthProvider';
import Link from 'next/link';

export default function AddPropertyPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.userType !== 'owner') {
      // Property seekers cannot list properties
      router.push('/properties');
      return;
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to access this page.</p>
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (user.userType !== 'owner') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-6">
            Only property owners can list properties. Please sign up as a property owner to list your property.
          </p>
          <div className="space-x-4">
            <Link
              href="/properties"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Properties
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Sign Up as Owner
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyAdded = () => {
    router.push('/properties');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">List Your Property</h1>
          <p className="text-gray-600">
            Fill in the details below to reach potential tenants
          </p>
        </div>

        <PropertyForm onPropertyAdded={handlePropertyAdded} />
      </div>
    </div>
  );
}