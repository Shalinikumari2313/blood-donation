import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Clock, Award, Plus } from 'lucide-react';
import { User, DonationRequest } from '../../types';

interface DonorDashboardProps {
  user: User;
  onLogout: () => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ user, onLogout }) => {
  const [donations] = useState<DonationRequest[]>([
    {
      id: '1',
      donorId: user.id,
      bloodBankId: 'bb1',
      scheduledDate: new Date('2024-02-15'),
      status: 'confirmed',
      bloodType: user.bloodType || 'O+',
      notes: 'Regular donation'
    },
    {
      id: '2',
      donorId: user.id,
      bloodBankId: 'bb2',
      scheduledDate: new Date('2024-01-10'),
      status: 'completed',
      bloodType: user.bloodType || 'O+',
      notes: 'Emergency donation'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedDonations = donations.filter(d => d.status === 'completed').length;
  const nextDonation = donations.find(d => d.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">LifeBank</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900">{completedDonations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Lives Saved</p>
                <p className="text-3xl font-bold text-gray-900">{completedDonations * 3}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Next Eligible</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.lastDonation ? '45 days' : 'Now'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 text-red-600 mr-3" />
                  <span className="font-medium text-red-800">Schedule Donation</span>
                </div>
                <span className="text-red-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-800">Find Blood Banks</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-800">Emergency Requests</span>
                </div>
                <span className="text-green-600">→</span>
              </button>
            </div>
          </div>

          {/* Next Donation */}
          {nextDonation && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Donation</h2>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">Upcoming Appointment</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(nextDonation.status)}`}>
                    {nextDonation.status}
                  </span>
                </div>
                <div className="flex items-center text-blue-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{nextDonation.scheduledDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>City Blood Bank</span>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )}

          {/* Donation History */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation History</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.scheduledDate.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {donation.bloodType}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        City Blood Bank
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};