export interface SolutionProduct {
  id: string;
  name: string;
  description: string;
  amazonUrl: string;
  image: string;
  category: string;
}

export interface SolutionCategory {
  id: string;
  title: string;
  description: string;
  products: SolutionProduct[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    id: "vivienda",
    title: "Para tu vivienda",
    description: "Sistemas fáciles de instalar para proteger tu hogar día a día. Cámaras inteligentes, sensores de puertas y videoporteros para que nunca pierdas el control.",
    products: [
      {
        id: "v1",
        name: "TP-Link Tapo C200",
        description: "La cámara de interior más vendida. Giro 360°, visión nocturna y detección de llanto de bebé. Ideal para vigilar salones o entradas desde el móvil.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+C200",
        image: "https://m.media-amazon.com/images/I/81mzC7O5VpL._AC_SX679_.jpg",
        category: "Cámara Interior"
      },
      {
        id: "v2",
        name: "Ring Video Doorbell (Wired)",
        description: "Mira quién llama antes de abrir. Resolución HD, comunicación bidireccional y alertas de movimiento en tiempo real.",
        amazonUrl: "https://www.amazon.es/s?k=Ring+Video+Doorbell",
        image: "https://m.media-amazon.com/images/I/51LYJlS+mDL._SY741_.jpg",
        category: "Videoportero"
      },
      {
        id: "v3",
        name: "Sensores Meross WiFi",
        description: "Recibe alertas si te dejas una ventana abierta o si alguien abre la puerta principal. Sin necesidad de centralita adicional.",
        amazonUrl: "https://www.amazon.es/s?k=Meross+sensores+puerta",
        image: "https://m.media-amazon.com/images/I/51kx9M0oeTL._AC_SX679_.jpg",
        category: "Sensores"
      },
      {
        id: "v4",
        name: "Eufy Security SoloCam S220",
        description: "Cámara exterior con placa solar integrada. Olvídate de cargar baterías. No tiene cuotas mensuales y ofrece una imagen impecable.",
        amazonUrl: "https://www.amazon.es/s?k=eufy+SoloCam+S220",
        image: "https://m.media-amazon.com/images/I/515ghdL4kpL._AC_SX679_.jpg",
        category: "Cámara Exterior"
      },
      {
        id: "v5",
        name: "Philips Hue Bridge + Bombilla",
        description: "La mejor disuasión: simula presencia programando tus luces desde cualquier lugar. El sistema más estable y profesional del mercado.",
        amazonUrl: "https://www.amazon.es/s?k=Philips+Hue+Bridge",
        image: "https://m.media-amazon.com/images/I/61VNJ0D9gCL._AC_SX679_.jpg",
        category: "Simulación"
      },
      {
        id: "v6",
        name: "Echo Show 8 (3.ª gen)",
        description: "El centro de control perfecto. Mira tus cámaras con un comando de voz: 'Alexa, enséñame la entrada'. Calidad de pantalla superior.",
        amazonUrl: "https://www.amazon.es/s?k=Echo+Show+8",
        image: "https://m.media-amazon.com/images/I/51GogcbvNjL._AC_SY741_.jpg",
        category: "Control"
      }
    ]
  },
  {
    id: "negocios",
    title: "Para negocios",
    description: "Equipos robustos para vigilancia 24/7. CCTV profesional, control de accesos y gestión remota para locales comerciales y oficinas.",
    products: [
      {
        id: "n1",
        name: "Reolink 4K PoE System",
        description: "Sistema completo con 4 cámaras 4K y grabador NVR de 2TB. Instalación profesional mediante cable de red (PoE) para máxima estabilidad.",
        amazonUrl: "https://www.amazon.es/s?k=Reolink+4K+PoE+System",
        image: "https://m.media-amazon.com/images/I/71X8uX+vCXL._AC_SL1500_.jpg",
        category: "CCTV Pack"
      },
      {
        id: "n2",
        name: "TP-Link Omada ER605",
        description: "Router VPN profesional para asegurar que el acceso a tus cámaras sea privado y no pueda ser hackeado desde el exterior.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Omada+ER605",
        image: "https://m.media-amazon.com/images/I/51-mYf6-S4L._AC_SL1500_.jpg",
        category: "Networking"
      },
      {
        id: "n3",
        name: "Hikvision IP 8MP",
        description: "La marca líder en seguridad profesional. Cámara tipo torreta con excelente visión nocturna y resistencia extrema a la intemperie.",
        amazonUrl: "https://www.amazon.es/s?k=Hikvision+8MP+IP+Camera",
        image: "https://m.media-amazon.com/images/I/51n2G8k-3OL._AC_SL1500_.jpg",
        category: "Cámara Pro"
      },
      {
        id: "n4",
        name: "Annke NVR Record 8CH",
        description: "Grabador de vídeo en red para hasta 8 cámaras. Soporta cámaras de terceros (ONVIF) y ofrece una gestión de grabaciones muy fluida.",
        amazonUrl: "https://www.amazon.es/s?k=Annke+NVR+8CH",
        image: "https://m.media-amazon.com/images/I/61N+4Wn-A+L._AC_SL1500_.jpg",
        category: "Grabación"
      },
      {
        id: "n5",
        name: "Zmodo Wireless System",
        description: "Si no puedes cablear tu local, este sistema inalámbrico de 4 cámaras es la opción más estable para distancias cortas.",
        amazonUrl: "https://www.amazon.es/s?k=Zmodo+Security+Camera+System",
        image: "https://m.media-amazon.com/images/I/61-+I1V-QpL._AC_SL1500_.jpg",
        category: "Inalámbrico Pro"
      },
      {
        id: "n6",
        name: "WD Purple 4TB HDD",
        description: "Disco duro diseñado específicamente para videovigilancia. Soporta escritura constante 24/7 sin fallos. Imprescindible para tu NVR.",
        amazonUrl: "https://www.amazon.es/s?k=WD+Purple+4TB",
        image: "https://m.media-amazon.com/images/I/81shY8Y-XTL._AC_SL1500_.jpg",
        category: "Almacenamiento"
      }
    ]
  },
  {
    id: "residencias",
    title: "Segundas residencias",
    description: "Protección anti-okupas y aviso inmediato. Sistemas con respaldo de batería y cámaras que funcionan sin necesidad de WiFi permanente.",
    products: [
      {
        id: "r1",
        name: "Reolink Go Plus 4G",
        description: "Funciona con tarjeta SIM. No necesita WiFi ni cables. Perfecta para naves o fincas aisladas donde no hay internet.",
        amazonUrl: "https://www.amazon.es/s?k=Reolink+Go+Plus+4G",
        image: "https://m.media-amazon.com/images/I/61T2H1T2-WL._AC_SL1500_.jpg",
        category: "Cámara 4G"
      },
      {
        id: "r2",
        name: "Eufy SoloCam S340 Solar",
        description: "Doble lente con zoom óptico y giro 360°. Al alimentarse por sol, es ideal para casas que pasan meses cerradas.",
        amazonUrl: "https://www.amazon.es/s?k=eufy+SoloCam+S340",
        image: "https://m.media-amazon.com/images/I/51fG9G-4SML._AC_SL1500_.jpg",
        category: "Solar 360°"
      },
      {
        id: "r3",
        name: "X-Sense Wi-Fi Smoke Detector",
        description: "No solo te protege de intrusos. Recibe avisos de humo o fuego en tu móvil si algo ocurre en tu segunda vivienda.",
        amazonUrl: "https://www.amazon.es/s?k=X-Sense+Wi-Fi+Smoke+Detector",
        image: "https://m.media-amazon.com/images/I/61z-R1z-y1L._AC_SL1200_.jpg",
        category: "Seguridad Incendio"
      },
      {
        id: "r4",
        name: "SwitchBot Lock Smart",
        description: "Instala una cerradura inteligente para dar acceso a familiares o técnicos de forma remota sin tener que viajar.",
        amazonUrl: "https://www.amazon.es/s?k=SwitchBot+Lock",
        image: "https://m.media-amazon.com/images/I/51F-N1-A-SL._AC_SL1500_.jpg",
        category: "Control Acceso"
      },
      {
        id: "r5",
        name: "TP-Link Tapo C520WS",
        description: "Cámara exterior muy robusta. Su excelente visión nocturna a color permite identificar rostros incluso en oscuridad total.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+C520WS",
        image: "https://m.media-amazon.com/images/I/51r-F1r-R2L._AC_SL1500_.jpg",
        category: "Cámara Exterior"
      },
      {
        id: "r6",
        name: "Sensores Tapo T110",
        description: "Sensores inteligentes para colocar en ventanas traseras o persianas. Recibe aviso crítico si alguien las fuerza.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+T110",
        image: "https://m.media-amazon.com/images/I/41-N1N-R1+L._AC_SL1500_.jpg",
        category: "Sensores Ventana"
      }
    ]
  }
];