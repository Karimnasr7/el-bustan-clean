// src/components/ContactSection.tsx
import { motion } from "framer-motion"; 
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState, useEffect } from "react";

// Interface for the contact data structure
interface ContactInfo {
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  formspree_form_id: string;
}

export function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/site-content');
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!contactInfo) return;

    setStatus('loading');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      alert('يرجى ملء حقول الاسم والبريد الإلكتروني والرسالة.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      alert('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${contactInfo.formspree_form_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' }); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  if (loading || !contactInfo) {
    return (
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#146EF5]"></div>
          <p className="text-white mt-4">جاري تحميل معلومات التواصل...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-white" style={{ textShadow: "0 0 30px rgba(0, 188, 212, 0.6)" }}>
            تواصل معنا
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            نحن هنا لخدمتك. تواصل معنا واحصل على استشارة مجانية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl md:text-3xl text-white mb-8">معلومات التواصل</h3>

              <motion.a href={`tel:${contactInfo.contact_phone}`} className="flex items-center gap-4 mb-6 group cursor-pointer" whileHover={{ x: 5 }}>
                <motion.div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div><p className="text-sm text-gray-400">اتصل بنا</p><p className="text-lg sm:text-xl text-white group-hover:text-cyan-400 transition-colors" dir="ltr">{contactInfo.contact_phone}</p></div>
              </motion.a>
              <motion.a href={`mailto:${contactInfo.contact_email}`} className="flex items-center gap-4 mb-6 group cursor-pointer" whileHover={{ x: 5 }}>
                <motion.div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div><p className="text-sm text-gray-400">راسلنا</p><p className="text-lg sm:text-xl text-white group-hover:text-green-400 transition-colors">{contactInfo.contact_email}</p></div>
              </motion.a>
              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div><p className="text-sm text-gray-400">موقعنا</p><p className="text-lg sm:text-xl text-white group-hover:text-orange-400 transition-colors">{contactInfo.contact_address}</p></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 space-y-6" onSubmit={handleSubmit}>
              <h3 className="text-2xl md:text-3xl text-white mb-6">أرسل رسالة</h3>

              {/* Name */}
              <div className="relative">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="الاسم الكامل" className={`w-full bg-gray-900/50 border ${focusedField === "name" ? "border-cyan-400" : "border-gray-700"} rounded-lg px-4 py-3 sm:py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300`} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} required />
                {focusedField === "name" && (<motion.div className="absolute inset-0 rounded-lg bg-cyan-400/10 pointer-events-none" layoutId="inputGlow" />)}
              </div>

              {/* Email */}
              <div className="relative">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" className={`w-full bg-gray-900/50 border ${focusedField === "email" ? "border-cyan-400" : "border-gray-700"} rounded-lg px-4 py-3 sm:py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300`} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} required />
                {focusedField === "email" && (<motion.div className="absolute inset-0 rounded-lg bg-cyan-400/10 pointer-events-none" layoutId="inputGlow" />)}
              </div>

              {/* Phone */}
              <div className="relative">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="رقم الهاتف" className={`w-full bg-gray-900/50 border ${focusedField === "phone" ? "border-cyan-400" : "border-gray-700"} rounded-lg px-4 py-3 sm:py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300`} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} />
                {focusedField === "phone" && (<motion.div className="absolute inset-0 rounded-lg bg-cyan-400/10 pointer-events-none" layoutId="inputGlow" />)}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="رسالتك" className={`w-full bg-gray-900/50 border ${focusedField === "message" ? "border-cyan-400" : "border-gray-700"} rounded-lg px-4 py-3 sm:py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none`} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} required />
                {focusedField === "message" && (<motion.div className="absolute inset-0 rounded-lg bg-cyan-400/10 pointer-events-none" layoutId="inputGlow" />)}
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button type="submit" disabled={status === 'loading'} className="relative w-full py-3 sm:py-4 overflow-hidden group" whileHover={status !== 'loading' ? { scale: 1.02 } : {}} whileTap={status !== 'loading' ? { scale: 0.98 } : {}}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur-lg" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
                <span className="relative z-10 flex items-center justify-center gap-3 text-white text-base sm:text-lg">
                  {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}