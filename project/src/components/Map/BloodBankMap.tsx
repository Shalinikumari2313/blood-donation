import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Filter, Layers } from 'lucide-react';
import { BloodBank } from '../../types';

interface BloodBankMapProps {
  userLocation?: { lat: number; lng: number };
  onBloodBankSelect?: (bloodBank: BloodBank) => void;
}

export const BloodBankMap: React.FC<BloodBankMapProps> = ({
  userLocation = { lat: 40.7128, lng: -74.0060 },
  onBloodBankSelect
}) => {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [selectedBloodBank, setSelectedBloodBank] = useState<BloodBank | null>(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [mapView, setMapView] = useState<'standard' | 'satellite'>('standard');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock blood banks data
    const mockBloodBanks: BloodBank[] = [
      {
        id: '1',
        name: 'City General Blood Bank',
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-4567',
        email: 'info@citygeneral.com',
        location: { lat: 40.7580, lng: -73.9855 },
        operatingHours: { open: '08:00', close: '18:00' },
        inventory: [
          { bloodType: 'O+', units: 45, expiryDate: new Date('2024-02-15'), lastUpdated: new Date() },
          { bloodType: 'A+', units: 32, expiryDate: new Date('2024-02-18'), lastUpdated: new Date() },
        ],
        distance: 2.3
      },
      {
        id: '2',
        name: 'Metropolitan Blood Center',
        address: '456 Park Ave, New York, NY 10016',
        phone: '(555) 234-5678',
        email: 'contact@metrobc.com',
        location: { lat: 40.7505, lng: -73.9934 },
        operatingHours: { open: '06:00', close: '20:00' },
        inventory: [
          { bloodType: 'AB-', units: 12, expiryDate: new Date('2024-02-20'), lastUpdated: new Date() },
          { bloodType: 'B+', units: 28, expiryDate: new Date('2024-02-16'), lastUpdated: new Date() },
        ],
        distance: 1.8
      },
      {
        id: '3',
        name: 'Community Health Blood Bank',
        address: '789 Broadway, New York, NY 10003',
        phone: '(555) 345-6789',
        email: 'help@communityhealth.org',
        location: { lat: 40.7282, lng: -73.9942 },
        operatingHours: { open: '07:00', close: '19:00' },
        inventory: [
          { bloodType: 'O-', units: 18, expiryDate: new Date('2024-02-14'), lastUpdated: new Date() },
          { bloodType: 'A-', units: 25, expiryDate: new Date('2024-02-22'), lastUpdated: new Date() },
        ],
        distance: 4.1
      }
    ];

    // Filter blood banks by radius
    const filteredBanks = mockBloodBanks.filter(bank => 
      bank.distance !== undefined && bank.distance <= searchRadius
    );
    
    setBloodBanks(filteredBanks);
  }, [searchRadius]);

  const handleBloodBankClick = (bloodBank: BloodBank) => {
    setSelectedBloodBank(bloodBank);
    onBloodBankSelect?.(bloodBank);
  };

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden shadow-md">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Navigation className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Search Radius</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1km</span>
            <span className="font-medium">{searchRadius}km</span>
            <span>50km</span>
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white rounded-lg shadow-md p-3 hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Map View Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-md p-1 flex">
          <button
            onClick={() => setMapView('standard')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              mapView === 'standard' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMapView('satellite')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              mapView === 'satellite' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Layers className="h-4 w-4 mr-1 inline" />
            Satellite
          </button>
        </div>
      </div>

      {/* Mock Map Display */}
      <div className={`w-full h-full ${
        mapView === 'satellite' ? 'bg-green-100' : 'bg-blue-100'
      } flex items-center justify-center relative`}>
        {mapView === 'satellite' && (
          <div className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }}
          />
        )}
        
        {/* User Location */}
        <div className="absolute" style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md animate-pulse"></div>
          <div className="text-xs text-blue-800 font-medium mt-1 whitespace-nowrap">Your Location</div>
        </div>

        {/* Blood Bank Markers */}
        {bloodBanks.map((bank, index) => (
          <div
            key={bank.id}
            className="absolute cursor-pointer transform transition-transform hover:scale-110"
            style={{
              left: `${45 + index * 15}%`,
              top: `${35 + index * 10}%`,
            }}
            onClick={() => handleBloodBankClick(bank)}
          >
            <div className="relative">
              <MapPin className="h-6 w-6 text-red-600 drop-shadow-md" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {bank.name}
                <div className="text-gray-500">{bank.distance}km away</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blood Bank Details Panel */}
      {selectedBloodBank && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-h-32 overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{selectedBloodBank.name}</h3>
            <button
              onClick={() => setSelectedBloodBank(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{selectedBloodBank.address}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-blue-600 font-medium">{selectedBloodBank.distance}km away</span>
            <span className="text-green-600">
              Open {selectedBloodBank.operatingHours.open} - {selectedBloodBank.operatingHours.close}
            </span>
          </div>
          <div className="flex space-x-2 mt-2">
            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
              Get Directions
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
              Call Now
            </button>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 left-4 bg-white rounded-lg shadow-lg p-4 w-64">
          <h4 className="font-semibold mb-3">Filter Blood Banks</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Operating Hours</label>
              <select className="w-full mt-1 p-2 border rounded">
                <option>Any time</option>
                <option>Open 24/7</option>
                <option>Open now</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Blood Type Available</label>
              <select className="w-full mt-1 p-2 border rounded">
                <option>All types</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};