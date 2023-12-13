import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 h-[7vh]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://devtalks.com/" className="hover:underline">
            DevTalks™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
