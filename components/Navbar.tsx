'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiSearch, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { getTranslation } from '@/lib/i18n';
import { authHelpers } from '@/lib/supabase';
import { localStorageApi } from '@/lib/localStorage';

export default function Navbar() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Load language preference
    const savedLang = localStorageApi.getLanguage();
    setLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;

    // Get current user
    authHelpers.getCurrentUser().then(setUser);

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorageApi.setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    window.location.reload(); // Reload to apply language
  };

  const handleSignOut = async () => {
    await authHelpers.signOut();
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navLinks = [
    { href: '/', label: getTranslation(language, 'home') },
    { href: '/movies', label: getTranslation(language, 'movies') },
    { href: '/series', label: getTranslation(language, 'series') },
    { href: '/my-list', label: getTranslation(language, 'myList') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-tareq-darker/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="/logo.png"
              alt="Tareq Cinema"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold gradient-text hidden sm:block">
              {language === 'ar' ? 'طارق سينما' : 'Tareq Cinema'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-tareq-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={getTranslation(language, 'search')}
                  className="bg-tareq-gray text-white px-4 py-2 rounded-full w-48 focus:outline-none focus:ring-2 focus:ring-tareq-gold"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium bg-tareq-gold/10 text-tareq-gold rounded-full hover:bg-tareq-gold/20 transition-colors"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Profile"
                >
                  <FiUser size={20} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-tareq-red transition-colors"
                  aria-label="Sign Out"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium bg-tareq-gold text-black rounded-full hover:bg-tareq-gold-light transition-colors"
              >
                {getTranslation(language, 'login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href
                    ? 'text-tareq-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
