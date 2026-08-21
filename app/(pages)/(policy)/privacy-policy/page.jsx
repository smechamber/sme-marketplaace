import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
  const contactInfo = {
    email: ['secretariat@smechamber.com', 'director@smechamber.com'],
    phone: '+ 91 – 22 – 6951 1111',
    address: 'Samruddhi Venture Park, Office No. 1, 3rd Floor, Krantiveer Lakhuji Salve Marg, adjoining Hotel Tunga Paradise, next to Akruti Centre, Andheri East, Mumbai, Maharashtra 400093'
  };

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal details: name, email, phone number, company details, billing information.',
        'Usage data: website activity, login details, IP address.'
      ]
    },
    {
      title: '2. How We Use Information',
      content: [
        'To process membership applications and payments.',
        'To provide access to platform services and updates.',
        'To improve user experience and send relevant communications.'
      ]
    },
    {
      title: '3. Data Sharing',
      content: [
        'We do not sell or rent personal data.',
        'Data may be shared with payment partners (e.g., Razorpay) and service providers strictly for operational purposes.',
        'We may disclose data if required by law or government authorities.'
      ]
    },
    {
      title: '4. Data Security',
      content: [
        'We implement appropriate security measures to protect member information.',
        'However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.'
      ]
    },
    {
      title: '5. Member Rights',
      content: [
        'Members may access, update, or request deletion of their personal information by contacting us.',
        'Members may unsubscribe from communications at any time.'
      ]
    },
    {
      title: '6. Cookies & Tracking',
      content: [
        'Our website may use cookies for analytics and improving services.',
        'Users can disable cookies in their browser settings.'
      ]
    },
    {
      title: '7. Policy Updates',
      content: [
        'We may update this Privacy Policy from time to time. Changes will be effective upon posting on the website.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const ContactSection = () => (
    <div 
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
     
    >
      <h3 
        className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3"
        
        transition={{ delay: 0.2 }}
      >
        <div className="w-8 h-8 bg-[#29688A] rounded-lg flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        Contact Us
      </h3>
      
      <div className="space-y-6">
        <div 
          className="flex items-start gap-4"
         
        >
          <div className="w-10 h-10 bg-[#29688A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#29688A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Email</p>
            {contactInfo.email.map((email, index) => (
              <p key={index} className="text-gray-800 hover:text-[#29688A] transition-colors cursor-pointer">
                {email}
              </p>
            ))}
          </div>
        </div>

        <div 
          className="flex items-start gap-4"
         
        >
          <div className="w-10 h-10 bg-[#29688A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-[#29688A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Phone</p>
            <p className="text-gray-800">{contactInfo.phone}</p>
          </div>
        </div>

        <div 
          className="flex items-start gap-4"
         
        >
          <div className="w-10 h-10 bg-[#29688A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#29688A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Address</p>
            <p className="text-gray-800 leading-relaxed">{contactInfo.address}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            SME Marketplace
          </h1>
          <div className="w-24 h-1 bg-[#29688A] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Header */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
             
            >
              <div 
                className="flex items-center gap-4 mb-6"
               
              >
                <div className="w-12 h-12 bg-[#29688A] rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Privacy Policy
                </h2>
              </div>

              <p 
                className="text-lg text-gray-600 leading-relaxed"
               
              >
                SME Marketplace ("we", "our", "us") respects your privacy and is committed to protecting your personal information.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                 
                
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#29688A]/20">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <p
                        key={itemIndex}
                        className="text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <ContactSection />

            {/* Contact Us Section for Privacy */}
           
          </div>
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export default PrivacyPolicy;