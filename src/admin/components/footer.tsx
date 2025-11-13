function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Company Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-bold text-white">Pixsy Admin Panel</h2>
          <p className="text-sm text-gray-400">
            Manage your platform efficiently and securely.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="/dashboard" className="hover:text-white transition">
            Dashboard
          </a>
          <a href="/users" className="hover:text-white transition">
            Users
          </a>
          <a href="/settings" className="hover:text-white transition">
            Settings
          </a>
          <a href="/support" className="hover:text-white transition">
            Support
          </a>
        </div>

        {/* Right Section - Socials (optional) */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-gray-700 mt-4 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pixsy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
