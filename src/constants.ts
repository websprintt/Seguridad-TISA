
export const ENCODED_PHONE = 'KzM0IDc0MiAwOTAgOTkx'; // +34 742 090 991
export const ENCODED_EMAIL = 'Y29ycC50aXNhQGdtYWlsLmNvbQ=='; // corp.tisa@gmail.com

export const handleSecureInteraction = (type: 'mailto' | 'whatsapp', encodedValue: string, message?: string) => {
  const value = atob(encodedValue);
  let url = '';
  
  if (type === 'mailto') {
    url = `mailto:${value}`;
  }
  
  if (type === 'whatsapp') {
    const cleanPhone = value.replace(/\s/g, '').replace('+', '');
    const encodedMsg = message ? encodeURIComponent(message) : '';
    url = `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
  }
  
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
