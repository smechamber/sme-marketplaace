"use client"

import Link from "next/link"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-[#1a365d] via-[#29688A] to-[#1e4a61] relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>
      
      {/* Decorative Floating Elements */}
      <div className="absolute top-16 right-16 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-24 left-16 w-32 h-32 bg-blue-300/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
      
      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Company Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
                <Image 
                  src="/footerlogo.png" 
                  alt="Company Logo" 
                  height={520} 
                  width={520}
                  className="h-22 w-auto"
                />
            </Link>
            
            <div className="space-y-4">
              <p className="text-blue-100/90 text-base leading-relaxed max-w-sm">
                Your trusted B2B marketplace connecting businesses worldwide. Discover opportunities, 
                build partnerships, and grow your business with innovative solutions.
              </p>
              
              {/* Social Media Links */}
              <div className="space-y-3">
                <h4 className="text-cyan-200 font-medium text-sm uppercase tracking-wide">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/smechamber/" },
                    { icon: Twitter, label: "Twitter", href: "https://twitter.com/smechamber" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/sme-chamber-of-india" },
                    { icon: Youtube, label: "Youtbe", href: "https://www.youtube.com/channel/UCviAxNg24ssgZTmkVQ6V6Bg" }
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="group p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-cyan-200 font-semibold text-lg border-b border-cyan-300/30 pb-2">
                Quick Links
              </h3>
              <nav className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Products", href: "/products" },
                  { name: "Companies", href: "/companies" },
                  { name: "Categories", href: "/category" }
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-blue-100/80 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm group"
                  >
                    <span className="group-hover:text-cyan-200">{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* B2B Services */}
            <div className="space-y-6">
              <h3 className="text-cyan-200 font-semibold text-lg border-b border-cyan-300/30 pb-2">
                B2B Services
              </h3>
              <nav className="space-y-4">
                {[
                  { name: "Post Requirements", href: "/dashboard/requirements/add" },
                  { name: "Browse Requirements", href: "/browse-requirements" },
                  { name: "Become a Supplier", href: "/register" },
                  { name: "Dashboard", href: "/dashboard" }
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-blue-100/80 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm group"
                  >
                    <span className="group-hover:text-cyan-200">{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Policies */}
            <div className="space-y-6">
              <h3 className="text-cyan-200 font-semibold text-lg border-b border-cyan-300/30 pb-2">
                Legal
              </h3>
              <nav className="space-y-4">
                {[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Conditions", href: "/terms-and-conditions" },
                  { name: "Refund & Return", href: "/refund-return-policy" },
                  { name: "Shipping Policy", href: "/shipping-policy" }

                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-blue-100/80 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm group"
                  >
                    <span className="group-hover:text-cyan-200">{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-cyan-200 font-semibold text-lg border-b border-cyan-300/30 pb-2">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <MapPin className="h-5 w-5 text-cyan-300 mt-0.5 flex-shrink-0" />
                    <div className="text-blue-100/80 text-sm leading-relaxed">
                      <div className="font-medium text-white mb-1">Address</div>
                      Andheri East, Mumbai, Maharashtra 400093
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <a
                    href="tel:+91 22 6951 1111"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <div>
                      <div className="text-white font-medium text-sm">Phone</div>
                      <div className="text-blue-100/80 text-sm">+91 22 6951 1111</div>
                    </div>
                  </a>
                </div>
                
                <div className="group">
                  <a
                    href="mailto:contact@marketplace.com"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <div>
                      <div className="text-white font-medium text-sm">Email</div>
                      <div className="text-blue-100/80 text-sm">secretariat@smechamber.com | director@smechamber.com
</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-blue-100/70 text-sm">
              © {currentYear} MySME Marketplace. All rights reserved.
            </div>
            {/* <div className="flex items-center space-x-6 text-sm">
              <Link href="/sitemap" className="text-blue-100/70 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/support" className="text-blue-100/70 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/careers" className="text-blue-100/70 hover:text-white transition-colors">
                Careers
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}