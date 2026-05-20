import React from 'react';
import { Share2, MessageCircle, Facebook, Linkedin, Link as LinkIcon, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, description, className = "" }) => {
  const [copied, setCopied] = React.useState(false);
  const shareData = {
    title,
    text: description || title,
    url,
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyLink();
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: 'hover:bg-green-500'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-sky-500'
    }
  ];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mr-2">Compartir:</span>
      
      <button
        onClick={handleNativeShare}
        className="glass p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all group"
        title="Compartir"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`glass p-3 rounded-xl transition-all ${social.color} hover:text-white`}
          title={`Compartir en ${social.name}`}
        >
          {social.icon}
        </a>
      ))}

      <button
        onClick={handleCopyLink}
        className={`glass p-3 rounded-xl transition-all relative ${copied ? 'border-blue-500 text-blue-500' : 'hover:border-white'}`}
        title="Copiar enlace"
      >
        <LinkIcon className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] px-2 py-1 rounded-lg animate-bounce">
            Copiado!
          </span>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
