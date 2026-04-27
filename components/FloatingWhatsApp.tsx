import React from 'react';

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phoneNumber }) => {
  // Clean phone number (remove any non-numeric characters like + or spaces)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Anzil, I'm interested in your Shilajit products!")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 h-16 w-16 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* Subtle pulse ring behind the button */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75 duration-[3000ms]"></span>

      <svg
        className="w-8 h-8 relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.53c.961.547 1.916.946 3.22.947h.002c3.18 0 5.766-2.586 5.767-5.766 0-3.18-2.586-5.77-5.77-5.77zm3.367 8.24c-.149.42-.76.772-1.049.815-.29.043-.647.075-1.049-.056-.254-.082-.579-.199-1.012-.387-1.85-.805-3.044-2.69-3.136-2.812-.092-.122-.746-.992-.746-1.87 0-.878.458-1.31.621-1.492.164-.182.358-.228.477-.228.119 0 .239.001.343.006.108.005.253-.041.396.3.149.356.508 1.239.553 1.331.045.091.075.197.015.318-.06.121-.09.197-.18.303-.09.106-.188.236-.269.319-.09.091-.184.19-.079.371.106.182.471.777 1.012 1.258.697.621 1.284.815 1.466.906.182.091.289.076.396-.046.106-.122.457-.531.579-.714.122-.182.244-.152.41-.091.164.061 1.044.492 1.226.583.182.091.303.137.346.213.045.076.045.441-.104.86z"/>
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
