import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onBack: () => void;
}

const ReturnPolicy: React.FC<Props> = ({ onBack }) => {
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
            {language === 'en' ? 'Return Policy' : 'Kebijakan Pengembalian'}
          </h1>
          
          <div className="space-y-6 text-stone-600 leading-relaxed max-w-prose">
            {language === 'en' ? (
              <>
                <p>We want you to be completely satisfied with your purchase. Due to the nature of our product (supplement), we have specific guidelines for returns to ensure safety and quality for all customers.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Eligibility for Returns</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Items must be returned within 14 days of delivery.</li>
                  <li>The product must be unused, in its original packaging, and with the safety seal intact.</li>
                  <li>Proof of purchase (order number or receipt) is required.</li>
                </ul>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Non-Returnable Items</h3>
                <p>For health and safety reasons, we cannot accept returns on opened products or products where the safety seal has been broken.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Process</h3>
                <p>To initiate a return, please contact our customer service team via WhatsApp. Please provide your order details and reason for the return. We will guide you through the next steps.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Refunds</h3>
                <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed, and a credit will automatically be applied to your original method of payment within a certain amount of days.</p>
              </>
            ) : (
              <>
                <p>Kami ingin Anda sepenuhnya puas dengan pembelian Anda. Karena sifat produk kami (suplemen), kami memiliki panduan khusus untuk pengembalian guna memastikan keamanan dan kualitas bagi semua pelanggan.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Syarat Pengembalian</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Barang harus dikembalikan dalam waktu 14 hari setelah pengiriman.</li>
                  <li>Produk harus belum digunakan, dalam kemasan aslinya, dan dengan segel keamanan yang utuh.</li>
                  <li>Bukti pembelian (nomor pesanan atau resi) diperlukan.</li>
                </ul>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Barang yang Tidak Dapat Dikembalikan</h3>
                <p>Karena alasan kesehatan dan keselamatan, kami tidak dapat menerima pengembalian pada produk yang telah dibuka atau produk di mana segel keamanannya telah rusak.</p>

                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Proses Pengembalian</h3>
                <p>Untuk memulai pengembalian, silakan hubungi tim layanan pelanggan kami melalui WhatsApp. Harap berikan detail pesanan Anda dan alasan pengembalian. Kami akan memandu Anda melalui langkah selanjutnya.</p>
                
                <h3 className="text-xl font-bold text-shilajit-brown mt-8 mb-4 serif">Pengembalian Dana</h3>
                <p>Setelah pengembalian Anda diterima dan diperiksa, kami akan memberi tahu Anda tentang persetujuan atau penolakan pengembalian dana Anda. Jika disetujui, pengembalian dana akan diproses, dan kredit akan secara otomatis diterapkan pada metode pembayaran asli Anda dalam jangka waktu beberapa hari.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
