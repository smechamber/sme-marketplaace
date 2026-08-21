import { RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

const RefundReturnPolicy = () => {
  const contactInfo = {
    email: ['secretariat@smechamber.com', 'director@smechamber.com'],
    phone: '+ 91 – 22 – 6951 1111',
    address: 'Samruddhi Venture Park, Office No. 1, 3rd Floor, Krantiveer Lakhuji Salve Marg, adjoining Hotel Tunga Paradise, next to Akruti Centre, Andheri East, Mumbai, Maharashtra 400093'
  };

  const sections = [
    {
      title: '1. Membership Fees',
      content: [
        'All membership fees paid on SME Marketplace are non-refundable once the payment is successfully processed.',
        'Memberships are non-transferable and cannot be exchanged.'
      ]
    },
    {
      title: '2. Cancellation',
      content: [
        'Members may cancel their subscription at any time by contacting our support team.',
        'Cancellation will stop future billing (if applicable), but no refunds will be issued for the current membership term.'
      ]
    },
    {
      title: '3. Failed or Duplicate Payments',
      content: [
        'In case of failed, excess, or duplicate payments, refunds will be processed back to the original payment method within 7–10 business days after verification.'
      ]
    },
    {
      title: '4. Dispute Resolution',
      content: [
        'For payment-related queries, members should first contact our support team.',
        'Razorpay or other payment partners may also assist in resolving disputes as per their policies.'
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
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
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
          
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            SME Marketplace
          </h1>
          <div className="w-24 h-1 bg-[#29688A] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="space-y-8"
            
          >
            {/* Page Header */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div 
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-12 bg-[#29688A] rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Refund & Return Policy
                </h2>
              </div>
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

            {/* Contact Us Section for Refund */}
          
          </div>
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export default RefundReturnPolicy;