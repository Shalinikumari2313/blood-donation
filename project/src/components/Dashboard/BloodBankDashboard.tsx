import React, { useState } from 'react';
import { Heart, Package, Users, MapPin, Plus, Edit, TrendingUp } from 'lucide-react';
import { User, BloodInventory, BLOOD_TYPES } from '../../types';

interface BloodBankDashboardProps {
  user: User;
  onLogout: () => void;
}

export const BloodBankDashboard: React.FC<BloodBankDashboardProps> = ({ user, onLogout }) => {
  const [inventory, setInventory] = useState<BloodInventory[]>([
    { bloodType: 'A+', units: 45, expiryDate: new Date('2024-02-15'), lastUpdated: new Date() },
    { bloodType: 'A-', units: 23, expiryDate: new Date('2024-02-18'), lastUpdated: new Date() },
    { bloodType: 'B+', units: 34, expiryDate: new Date('2024-02-20'), lastUpdated: new Date() },
    { bloodType: 'B-', units: 12, expiryDate: new Date('2024-02-14'), lastUpdated: new Date() },
    { bloodType: 'AB+', units: 8, expiryDate: new Date('2024-02-16'), lastUpdated: new Date() },
    { bloodType: 'AB-', units: 5, expiryDate: new Date('2024-02-19'), lastUpdated: new Date() },
    { bloodType: 'O+', units: 67, expiryDate: new Date('2024-02-22'), lastUpdated: new Date() },
    { bloodType: 'O-', units: 28, expiryDate: new Date('2024-02-17'), lastUpdated: new Date() },
  ]);

  const [editingInventory, setEditingInventory] = useState<string | null>(null);

  const getStockLevel = (units: number) => {
    if (units < 10) return { level: 'Critical', color: 'bg-red-100 text-red-800 border-red-300' };
    if (units < 20) return { level: 'Low', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    if (units < 50) return { level: 'Good', color: 'bg-green-100 text-green-800 border-green-300' };
    return { level: 'Excellent', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  };

  const updateInventory = (bloodType: string, units: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.bloodType === bloodType 
          ? { ...item, units, lastUpdated: new Date() }
          : item
      )
    );
    setEditingInventory(null);
  };

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const criticalStock = inventory.filter(item => item.units < 10).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">LifeBank</h1>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Blood Bank
              </span>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Units</p>
                <p className="text-3xl font-bold text-gray-900">{totalUnits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Critical Stock</p>
                <p className="text-3xl font-bold text-gray-900">{criticalStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Active Donors</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-3xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 text-red-600 mr-3" />
                  <span className="font-medium text-red-800">Add Blood Units</span>
                </div>
                <span className="text-red-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-800">Manage Donors</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-800">Blood Requests</span>
                </div>
                <span className="text-green-600">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-800">View Analytics</span>
                </div>
                <span className="text-purple-600">→</span>
              </button>
            </div>
          </div>

          {/* Blood Inventory */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Blood Inventory</h2>
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Update Stock
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inventory.map((item) => {
                const stockLevel = getStockLevel(item.units);
                return (
                  <div key={item.bloodType} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-red-600">{item.bloodType}</span>
                      <button
                        onClick={() => setEditingInventory(item.bloodType)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>

                    {editingInventory === item.bloodType ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          defaultValue={item.units}
                          className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-red-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const value = parseInt((e.target as HTMLInputElement).value);
                              updateInventory(item.bloodType, value);
                            }
                          }}
                          autoFocus
                        />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              const input = document.querySelector(`input`) as HTMLInputElement;
                              updateInventory(item.bloodType, parseInt(input.value));
                            }}
                            className="flex-1 bg-green-600 text-white py-1 rounded text-xs hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingInventory(null)}
                            className="flex-1 bg-gray-600 text-white py-1 rounded text-xs hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-2">
                          <p className="text-3xl font-bold text-gray-900">{item.units}</p>
                          <p className="text-xs text-gray-500">units available</p>
                        </div>

                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${stockLevel.color}`}>
                          {stockLevel.level}
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          Expires: {item.expiryDate.toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { type: 'donation', donor: 'John Smith', bloodType: 'O+', units: 1, time: '2 hours ago' },
                { type: 'request', hospital: 'City General', bloodType: 'A-', units: 3, time: '4 hours ago' },
                { type: 'donation', donor: 'Sarah Johnson', bloodType: 'B+', units: 1, time: '6 hours ago' },
                { type: 'request', hospital: 'Memorial Hospital', bloodType: 'AB-', units: 2, time: '8 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      activity.type === 'donation' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">
                        {activity.type === 'donation' ? 
                          `${activity.donor} donated ${activity.units} unit of ${activity.bloodType}` :
                          `${activity.hospital} requested ${activity.units} units of ${activity.bloodType}`
                        }
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.type === 'donation' ? 
                      'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.bloodType}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};