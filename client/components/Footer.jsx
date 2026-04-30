import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Description */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-gray-700">
                <img
                  src="/logo.jpg"
                  alt="CollegeDekho"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tracking-tighter">COLLEGE</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  DEKHO
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Simplifying college discovery across India with accurate rankings, 
              exam information, and course details.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">PLATFORM</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/rankings" className="hover:text-white transition-colors">Rankings</Link></li>
              <li><Link to="/exams" className="hover:text-white transition-colors">Exams</Link></li>
              <li><Link to="/colleges" className="hover:text-white transition-colors">Colleges</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">COMPANY</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">LEGAL</h4>
            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>

            {/* Minimal Newsletter */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Stay updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-sm px-4 py-2.5 rounded-l-2xl outline-none flex-1 placeholder-gray-500"
                />
                <button className="bg-white hover:bg-gray-100 text-black px-5 text-sm font-medium rounded-r-2xl transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 CollegeDekho. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Made with ❤️ for students in India</p>
        </div>
      </div>
    </footer>
  );
}