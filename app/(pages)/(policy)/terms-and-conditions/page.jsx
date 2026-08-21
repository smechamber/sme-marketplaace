import { FileText, Mail, Phone, MapPin } from 'lucide-react';

const TermsAndConditions = () => {
  const contactInfo = {
    email: ['secretariat@smechamber.com', 'director@smechamber.com'],
    phone: '+ 91 – 22 – 6951 1111',
    address: 'Samruddhi Venture Park, Office No. 1, 3rd Floor, Krantiveer Lakhuji Salve Marg, adjoining Hotel Tunga Paradise, next to Akruti Centre, Andheri East, Mumbai, Maharashtra 400093'
  };

  const sections = [
    {
      title: '1. Membership & Eligibility',
      content: [
        'Membership is open to individuals, SMEs, and organizations who complete the registration process and pay the applicable membership fee.',
        'By registering, you confirm that all information provided is true, accurate, and complete.'
      ]
    },
    {
      title: '2. Services Provided',
      content: [
        'SME Marketplace provides an online platform for networking, visibility, and business opportunities for members.',
        'We reserve the right to add, modify, or discontinue services at any time without prior notice.'
      ]
    },
    {
      title: '3. Payment & Billing',
      content: [
        'Membership fees are payable in advance and are non-transferable.',
        'Payments are processed securely through Razorpay or other authorized payment gateways.'
      ]
    },
    {
      title: '4. Member Obligations',
      content: [
        'Members must not misuse the platform for fraudulent, unlawful, or harmful activities.',
        'Members are responsible for maintaining the confidentiality of their account details.'
      ]
    },
    {
      title: '5. Intellectual Property',
      content: [
        'All content, logos, trademarks, and materials on the platform are owned by SME Marketplace and protected under applicable laws.',
        'Members may not reproduce, distribute, or modify any content without prior written consent.'
      ]
    },
    {
      title: '6. Limitation of Liability',
      content: [
        'SME Marketplace is not liable for any direct, indirect, incidental, or consequential damages arising from the use of the platform.',
        'We do not guarantee specific business outcomes from membership.'
      ]
    },
    {
      title: '7. Termination',
      content: [
        'We reserve the right to suspend or terminate accounts that violate these Terms.',
        'Members may cancel their membership anytime; however, fees already paid are non-refundable (see Refund Policy).'
      ]
    },
    {
      title: '8. Governing Law & Jurisdiction',
      content: [
        'These Terms shall be governed by and construed in accordance with the laws of India.',
        'Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.'
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
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Terms & Conditions
                </h2>
              </div>

              <p 
                className="text-lg text-gray-600 leading-relaxed"
              
              >
                Welcome to SME Marketplace ("Platform", "we", "our", "us"). By registering, accessing, or using our website and services, you ("Member", "you", "your") agree to comply with and be bound by these Terms and Conditions.
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

            {/* Contact Us Section for Terms */}
           
          </div>
        </div>

        {/* Footer */}
       
      </div>
    </div>
  );
};

export default TermsAndConditions;