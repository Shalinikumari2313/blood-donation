import React, { useState } from 'react';
import { Heart, MapPin, Clock, AlertTriangle, Plus, Search } from 'lucide-react';
import { User, BloodRequest } from '../../types';

interface RecipientDashboardProps {
  user: User;
  onLogout: () => void;
}

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({ user, onLogout }) => {
  const [requests] = useState<BloodRequest[]>([
    {
      id: '1',
      recipientId: user.id,
      bloodType: 'A+',
      urgency: 'high',
      unitsNeeded: 3,
      hospitalName: 'City General Hospital',
      doctorName: 'Dr. Smith',
      patientName: 'John Doe',
      contactNumber: '1234567890',
      medicalReason: 'Surgery',
      status: 'active',
      dateRequested: new Date('2024-01-20'),
      requiredBy: new Date('2024-01-25'),
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: 'New York, NY'
      }
    }
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const activeRequests = requests.filter(r => r.status === 'active').length;

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
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Active Requests</p>
                <p className="text-3xl font-bold text-gray-900">{activeRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Blood Type</p>
                <p className="text-3xl font-bold text-gray-900">{user.bloodType}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Response Time</p>
                <p className="text-lg font-semibold text-gray-900">&lt; 2 hours</p>
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
                  <span className="font-medium text-red-800">New Blood Request</span>
                </div>
                <span className="text-red-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-800">Find Donors</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-800">Nearby Blood Banks</span>
                </div>
                <span className="text-green-600">→</span>
              </button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <span className="font-semibold text-red-800">24/7 Emergency Helpline</span>
              </div>
              <div className="space-y-2">
                <p className="text-red-700">
                  <strong>Phone:</strong> 1-800-BLOOD-HELP
                </p>
                <p className="text-red-700">
                  <strong>Emergency:</strong> 911
                </p>
                <p className="text-sm text-red-600">
                  Call immediately for critical blood requirements
                </p>
              </div>
              <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Call Emergency Line
              </button>
            </div>
          </div>

          {/* Blood Requests */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Blood Requests</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-lg">{request.patientName}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{request.medicalReason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-red-600">{request.bloodType}</p>
                      <p className="text-sm text-gray-500">{request.unitsNeeded} units needed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Hospital</p>
                      <p className="font-medium">{request.hospitalName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Doctor</p>
                      <p className="font-medium">{request.doctorName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Requested</p>
                      <p className="font-medium">{request.dateRequested.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Required By</p>
                      <p className="font-medium text-red-600">{request.requiredBy.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{request.location.address}</span>
                    </div>
                    <div className="space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};