import { ParticleBackground } from "../atoms/ParticleBackground";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-slate-900 text-slate-400 border-t border-slate-800 overflow-hidden">
      <ParticleBackground className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Column 1: About / Branding */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-white">
              Auto<span className="text-blue-500">Rent</span>
            </h3>
            <p className="text-xs leading-relaxed">
              Your reliable travel partner. We offer modern and safe cars for
              any occasion at competitive prices.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <FaFacebook size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & FAQ */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li>
                <a
                  href="/fleet"
                  className="hover:text-blue-400 transition-colors"
                >
                  Our Fleet
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-blue-400 transition-colors font-medium"
                >
                  FAQ (Frequently Asked Questions)
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rental Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <a
                  href="tel:+48123456789"
                  className="flex w-fit items-center gap-2.5 hover:text-blue-400 transition-colors"
                >
                  <FaPhoneAlt className="text-blue-500 shrink-0" />
                  <span>+48 123 456 789</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kontakt@autorent.pl"
                  className="flex w-fit items-center gap-2.5 hover:text-blue-400 transition-colors"
                >
                  <FaEnvelope className="text-blue-500 shrink-0" />
                  <span>kontakt@autorent.pl</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-blue-500 shrink-0 mt-0.5" />
                <span>
                  15/2 Example St.,
                  <br />
                  00-950 Warsaw
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-xs">
              Subscribe to our newsletter to receive updates on discounts and
              new fleet additions.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 mt-1"
            >
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-1.5 text-xs rounded border border-slate-700 bg-slate-800/90 text-white outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-1.5 rounded transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom line: Copyright & Author */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p>© {currentYear} AutoRent. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Created with passion by{" "}
            <span className="font-semibold text-white">Dawid Rumiński</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
