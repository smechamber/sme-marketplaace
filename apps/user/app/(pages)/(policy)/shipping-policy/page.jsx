import React from 'react';
import { Package, Clock, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Package className="w-8 h-8" style={{ color: '#29688A' }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Policy</h1>
            <p className="text-lg text-gray-600">SME Marketplace - Digital Services & Memberships</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                At <span className="font-semibold" style={{ color: '#29688A' }}>SME Marketplace</span> (Small and Medium Enterprises Marketplace), 
                we provide memberships and digital services. We do not ship any physical products.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Section 1: Delivery of Services */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#29688A' }}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">1. Delivery of Services</h2>
            </div>
            <div className="space-y-4 ml-14">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#29688A' }}></div>
                <p className="text-gray-700">Upon successful payment, membership activation is processed immediately or within 24 hours.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#29688A' }}></div>
                <p className="text-gray-700">All membership benefits and services are accessible through our online platform.</p>
              </div>
            </div>
          </div>

          {/* Section 2: No Physical Shipping */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#29688A' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">2. No Physical Shipping</h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700">
                Since our offerings are digital (membership and access to marketplace services), there is no shipping, 
                courier, or physical delivery involved.
              </p>
            </div>
          </div>

          {/* Section 3: Communication */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#29688A' }}>
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">3. Communication</h2>
            </div>
            <div className="space-y-4 ml-14">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#29688A' }}></div>
                <p className="text-gray-700">
                  Once your membership is activated, confirmation details and login credentials (if applicable) 
                  will be sent to your registered email address.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#29688A' }}></div>
                <p className="text-gray-700">
                  In case you do not receive confirmation within 24 hours, please contact our support team.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Contact Us */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">4. Contact Us</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" style={{ color: '#29688A' }} />
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                </div>
                <div className="space-y-2">
                  <a href="mailto:secretariat@smechamber.com" 
                     className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    secretariat@smechamber.com
                  </a>
                  <a href="mailto:director@smechamber.com" 
                     className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    director@smechamber.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" style={{ color: '#29688A' }} />
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                </div>
                <a href="tel:+912269511111" 
                   className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  + 91 – 22 – 6951 1111
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#29688A' }} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                  <address className="text-gray-700 not-italic leading-relaxed">
                    Samruddhi Venture Park, Office No. 1, 3rd Floor,<br />
                    Krantiveer Lakhuji Salve Marg,<br />
                    adjoining Hotel Tunga Paradise,<br />
                    next to Akruti Centre,<br />
                    Andheri East, Mumbai, Maharashtra 400093
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full" style={{ backgroundColor: 'rgba(41, 104, 138, 0.1)' }}>
            <CheckCircle className="w-5 h-5 mr-2" style={{ color: '#29688A' }} />
            <span className="text-sm font-medium" style={{ color: '#29688A' }}>
              All services are delivered digitally - No physical shipping required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;