import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una app real aquí se enviaría a una API
    console.log('Formulario enviado:', formData);
    setIsSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-4">Hablemos</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna duda sobre seguridad o quieres consultarme algún proyecto? Respondemos normalmente en 24-48 horas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-left mb-16 font-display">
          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Email directo</div>
              <div className="text-white">contact@tisaseguridad.shop</div>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Ubicación</div>
              <div className="text-white">España (Nacional)</div>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Respuesta</div>
              <div className="text-white">24-48 horas</div>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5 max-w-2xl mx-auto text-left relative overflow-hidden"
        >
          {isSent && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-neutral-950/90 z-20 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado con éxito!</h3>
              <p className="text-neutral-400">Te responderemos lo antes posible.</p>
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tu Nombre</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                  placeholder="Ej: David García"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tu Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                  placeholder="nombre@gmail.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tu Consulta</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all resize-none"
                placeholder="Dime en qué puedo ayudarte..."
              />
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed italic">
              Al enviar este formulario aceptas nuestra política de privacidad. Tus datos se tratarán únicamente para responder a tu mensaje.
            </p>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              Enviar mensaje
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
