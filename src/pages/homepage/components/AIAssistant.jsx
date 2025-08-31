import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Halo! Saya AI Assistant OrganiFlow. Saya siap membantu Anda dengan informasi tentang organisasi kami. Ada yang bisa saya bantu?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    {
      id: 1,
      text: "Bagaimana cara menjadi anggota?",
      icon: "UserPlus"
    },
    {
      id: 2,
      text: "Apa saja layanan yang tersedia?",
      icon: "List"
    },
    {
      id: 3,
      text: "Bagaimana cara mengakses dokumen?",
      icon: "FileText"
    },
    {
      id: 4,
      text: "Siapa yang bisa saya hubungi?",
      icon: "Phone"
    }
  ];

  const botResponses = {
    "bagaimana cara menjadi anggota": `Untuk menjadi anggota OrganiFlow, Anda dapat mengikuti langkah-langkah berikut:\n\n1. Kunjungi halaman Portal Anggota\n2. Isi formulir pendaftaran online\n3. Upload dokumen yang diperlukan\n4. Tunggu verifikasi dari tim kami (1-3 hari kerja)\n5. Dapatkan akses ke sistem setelah disetujui\n\nApakah ada yang ingin Anda tanyakan lebih lanjut tentang proses pendaftaran?`,
    
    "apa saja layanan yang tersedia": `OrganiFlow menyediakan berbagai layanan digital:\n\n🏢 **Untuk Organisasi:**\n• Manajemen dokumen digital\n• Sistem keanggotaan terintegrasi\n• Dashboard analytics\n• Pelaporan otomatis\n\n👥 **Untuk Anggota:**\n• Portal anggota personal\n• Akses dokumen internal\n• Komunikasi real-time\n• Tracking status keanggotaan\n\n🌐 **Untuk Publik:**\n• Informasi organisasi\n• Dokumen transparan\n• Kontak dan kerjasama\n\nLayanan mana yang ingin Anda ketahui lebih detail?`,
    
    "bagaimana cara mengakses dokumen": `Akses dokumen di OrganiFlow sangat mudah:\n\n📂 **Dokumen Publik:**\n• Buka halaman Transparansi & Laporan\n• Pilih kategori dokumen\n• Download langsung tanpa login\n\n🔐 **Dokumen Internal (Anggota):**\n• Login ke Portal Anggota\n• Masuk ke menu Dokumen\n• Gunakan fitur pencarian atau filter\n• Download sesuai level akses Anda\n\n💡 **Tips:** Gunakan fitur pencarian dengan kata kunci untuk menemukan dokumen lebih cepat!\n\nAda dokumen spesifik yang Anda cari?`,
    
    "siapa yang bisa saya hubungi": `Anda dapat menghubungi tim OrganiFlow melalui berbagai cara:\n\n📧 **Email:**\n• info@organiflow.id (Informasi umum)\n• admin@organiflow.id (Administrasi)\n• support@organiflow.id (Dukungan teknis)\n\n📞 **Telepon:**\n• (021) 1234-5678 (Senin-Jumat, 08:00-17:00)\n\n💬 **Live Chat:**\n• Tersedia 24/7 melalui AI Assistant ini\n• Untuk masalah kompleks, akan diteruskan ke tim manusia\n\n🏢 **Kantor:**\n• Jl. Organisasi Modern No. 123, Jakarta\n• Buka Senin-Jumat, 08:00-17:00\n\nAda yang bisa saya bantu lebih lanjut?`,
    
    "default": "Terima kasih atas pertanyaan Anda! Saya akan mencoba membantu sebaik mungkin. Jika pertanyaan Anda memerlukan penanganan khusus, saya akan menghubungkan Anda dengan tim manusia kami.\n\nSilakan pilih salah satu pertanyaan umum di bawah atau ketik pertanyaan spesifik Anda."
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText = null) => {
    const text = messageText || inputMessage?.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(text?.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && message?.includes(key)) {
        return response;
      }
    }
    return botResponses?.default;
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`w-16 h-16 rounded-full shadow-brand-lg flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' :'bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-brand-lg hover:scale-105'
          }`}
        >
          <Icon 
            name={isOpen ? "X" : "MessageCircle"} 
            size={24} 
            color="white" 
          />
        </button>

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        )}
      </div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-border rounded-2xl shadow-brand-lg z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-sm text-white/80">Online • Siap membantu</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message?.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message?.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages?.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">Pertanyaan yang sering diajukan:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions?.map((question) => (
                    <button
                      key={question?.id}
                      onClick={() => handleQuickQuestion(question?.text)}
                      className="flex items-center space-x-2 p-3 bg-muted hover:bg-muted/80 rounded-lg text-left text-sm transition-colors"
                    >
                      <Icon name={question?.icon} size={16} className="text-primary flex-shrink-0" />
                      <span>{question?.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage?.trim() || isTyping}
                iconName="Send"
              />
            </div>
            
            <div className="flex items-center justify-center mt-2">
              <p className="text-xs text-muted-foreground">
                Didukung oleh AI • Respons dalam Bahasa Indonesia
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;