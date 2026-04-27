import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onBack: () => void;
}

const ShippingDetails: React.FC<Props> = ({ onBack }) => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-shilajit-brown hover:text-gold-accent transition-colors font-bold text-sm tracking-wider uppercase"
        >
          <span className="mr-2">←</span> {language === 'en' ? 'Back' : 'Kembali'}
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-stone-100">
          <h1 className="text-3xl md:text-5xl font-bold text-shilajit-brown mb-8 serif">
            {language === 'en' ? 'Shipping Details' : 'Informasi Pengiriman'}
          </h1>
          
          <div className="space-y-6 text-stone-600 leading-relaxed max-w-prose">
            {language === 'en' ? (
              <>
                <p>We are committed to delivering your Anzil Himalayan Shilajit quickly and safely. Please read our shipping guidelines below.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Processing Time</h3>
                <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Shipping Rates & Delivery Estimates</h3>
                <p>Shipping charges for your order will be calculated and displayed at checkout depending on the courier chosen (JNE, J&T, Sicepat, etc.) if ordering through our marketplace partners. Delivery times typically range from 2-5 days depending on your location in Indonesia.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Same-Day Delivery</h3>
                <p>For certain areas, GoSend or GrabExpress may be available. Please contact us via WhatsApp to arrange same-day delivery services.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Order Tracking</h3>
                <p>Once your order has shipped, you will receive a tracking number from the respective marketplace or directly from our team if you ordered manually.</p>
              </>
            ) : (
              <>
                <p>Kami berkomitmen untuk mengantarkan Anzil Himalayan Shilajit pesanan Anda dengan cepat dan aman. Harap baca panduan pengiriman kami di bawah ini.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Waktu Pemrosesan</h3>
                <p>Semua pesanan diproses dalam waktu 1-2 hari kerja. Pesanan tidak dikirim atau diantarkan pada akhir pekan atau hari libur. Jika kami mengalami volume pesanan yang tinggi, pengiriman mungkin tertunda beberapa hari.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Tarif Pengiriman & Estimasi Waktu</h3>
                <p>Biaya pengiriman pesanan Anda akan dihitung dan ditampilkan saat checkout tergantung pada kurir yang dipilih (JNE, J&T, Sicepat, dll) jika memesan melalui mitra marketplace kami. Waktu pengiriman biasanya berkisar antara 2-5 hari tergantung pada lokasi Anda di Indonesia.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Pengiriman Same-Day</h3>
                <p>Untuk area tertentu, GoSend atau GrabExpress mungkin tersedia. Silakan hubungi kami melalui WhatsApp untuk mengatur layanan pengiriman di hari yang sama.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Pelacakan Pesanan</h3>
                <p>Setelah pesanan Anda dikirim, Anda akan menerima nomor pelacakan dari masing-masing marketplace atau langsung dari tim kami jika Anda memesan secara manual.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
