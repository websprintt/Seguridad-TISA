export interface SolutionProduct {
  id: string;
  name: string;
  description: string;
  advantages?: string[];
  whyRecommend?: string;
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
        name: "TP-Link Tapo C335",
        description: "Protege tu hogar con resolución 2K y privacidad absoluta. Cuenta con un obturador físico que esconde mecánicamente la lente cuando estás en casa.",
        advantages: [
          "Privacidad física real: La lente se oculta físicamente dentro de la carcasa cuando la desactivas.",
          "Calidad 2K QHD: Imágenes el doble de nítidas que el estándar tradicional de 1080p.",
          "Inteligencia Artificial Avanzada: Distingue entre personas, mascotas, vehículos y sonidos anómalos (como la rotura de un cristal) para evitar alertas falsas."
        ],
        whyRecommend: "Porque la seguridad en el hogar no debe comprometer tu privacidad. Es la cámara interior más inteligente del mercado actual, con un precio imbatible y una calidad de imagen nocturna impecable.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+C335",
        image: "/img/products/tapo-c335.jpg",
        category: "Cámara Interior"
      },
      {
        id: "v2",
        name: "Eufy Video Doorbell E340",
        description: "Videoportero inteligente de doble lente: vigilas las visitas de frente y controlas de forma específica los paquetes dejados en el suelo.",
        advantages: [
          "Sin suscripciones mensuales: Guarda todos los vídeos de forma local y segura en tu propia casa sin pagar cuotas.",
          "Doble visión (Dual Cam): Controla tanto la cara de los visitantes como el suelo de tu entrada para evitar robos de paquetes.",
          "Batería o cableado: Máxima versatilidad para instalarlo en cinco minutos en cualquier tipo de fachada."
        ],
        whyRecommend: "Es la opción más eficiente y moderna para el control de accesos. Elimina por completo los costes ocultos de otras marcas y ofrece una cobertura de seguridad en la puerta principal que ningún videoportero de una sola lente puede igualar.",
        amazonUrl: "https://www.amazon.es/s?k=Eufy+Video+Doorbell+E340",
        image: "/img/products/eufy-doorbell.jpg",
        category: "Videoportero"
      },
      {
        id: "v3",
        name: "Kit Tapo T110 + Hub H100",
        description: "Sensores ultracompactos para puertas o ventanas que te avisan al instante en el móvil y activan la sirena del hub local ante cualquier intrusión.",
        advantages: [
          "Notificaciones instantáneas: Alertas en milisegundos gracias a su protocolo de conexión de alta velocidad.",
          "Batería de ultra-larga duración: Olvídate de cambiar las pilas; su tecnología eficiente dura hasta 2 años.",
          "Hub con sirena integrada: El puente de conexión actúa también como una alarma sonora que se activa si detecta un intruso."
        ],
        whyRecommend: "A diferencia de los sensores WiFi tradicionales que agotan las pilas en meses y sufren retrasos, este sistema es profesional, ultra-rápido y sirve como una alarma doméstica escalable y sin cuotas.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+T110+Hub+H100",
        image: "/img/products/tapo-hub-h100.jpg",
        category: "Sensores"
      },
      {
        id: "v4",
        name: "Eufy Security SoloCam S340",
        description: "Cámara exterior con placa solar integrada y rotación 360°. Olvídate de recargar la batería de forma manual gracias a la energía del sol.",
        advantages: [
          "Energía infinita: El sol se encarga de recargarla; no tendrás que desmontarla nunca para cargar la batería.",
          "Doble lente con Zoom 8x: Combina un gran angular con un teleobjetivo para ver matrículas o rostros a gran distancia con total claridad.",
          "Seguimiento automatizado 360°: Detecta el movimiento y rota sola para rastrear al objetivo por todo el jardín o fachada."
        ],
        whyRecommend: "Es el producto estrella para el exterior del hogar. Reúne resolución 3K, almacenamiento local gratuito, rotación total y autosuficiencia energética en un solo dispositivo. No existe una alternativa más moderna y eficiente.",
        amazonUrl: "https://www.amazon.es/s?k=eufy+SoloCam+S340",
        image: "/img/products/eufy-solocam.jpg",
        category: "Cámara Exterior"
      },
      {
        id: "v5",
        name: "TP-Link Tapo L535E",
        description: "Previene incidentes simulando tu presencia. Programa rutinas inteligentes que encienden y apagan las luces de forma aleatoria cuando sales.",
        advantages: [
          "Estándar Universal Matter: Máxima estabilidad y compatibilidad nativa con Alexa, Google Home y Apple Home sin configuraciones raras.",
          "Modo Ausencia Avanzado: Configuración inteligente para que las luces se enciendan y apaguen de forma aleatoria, simulando una actividad humana real y natural.",
          "Extra de Brillo (1055 Lúmenes): Al ser más potentes que las bombillas estándar, la luz se nota perfectamente desde la calle incluso con las persianas semi-bajadas."
        ],
        whyRecommend: "La simulación de presencia es la forma más barata y efectiva de disuadir a los ladrones. Este modelo específico de Tapo ofrece la máxima fiabilidad tecnológica actual, es muy brillante y cuesta una fracción del precio de los sistemas antiguos que requerían comprar costosas centralitas aparte.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+L535E",
        image: "/img/products/tapo-l535e.jpg",
        category: "Simulación"
      },
      {
        id: "v6",
        name: "Amazon Echo Hub",
        description: "Pantalla táctil de pared de 8 pulgadas para controlar cámaras, alarmas y sensores cómodamente desde la entrada de tu hogar.",
        advantages: [
          "Panel de seguridad dedicado: Interfaz limpia y optimizada para controlar cámaras y alarmas sin menús complicados de entretenimiento.",
          "Conectividad Total Integrada: Incluye un concentrador compatible con Zigbee, Thread y Matter para enlazar todos los dispositivos de tu hogar directamente.",
          "Control por voz y táctil: Mira tus cámaras diciendo 'Alexa, enséñame el patio' o tocando la pantalla con los widgets directos del panel de control."
        ],
        whyRecommend: "Porque un hogar seguro necesita un cuadro de mandos centralizado. A diferencia de los altavoces Echo Show comunes que están pensados para el entretenimiento (música, fotos, recetas), el Echo Hub está diseñado exclusivamente para la domótica y la seguridad, ofreciendo la experiencia estética y funcional de una alarma profesional pero con total libertad y modernidad.",
        amazonUrl: "https://www.amazon.es/s?k=Amazon+Echo+Hub",
        image: "/img/products/echo-hub.jpg",
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
        name: "Reolink RLK8-800B4",
        description: "Kit profesional de videovigilancia con grabador NVR y 4 cámaras 4K alimentadas por cable de red (PoE). Incorpora algoritmos avanzados para filtrar falsas alarmas.",
        advantages: [
          "Resolución Ultra HD 4K: Nitidez absoluta para identificar rostros, billetes o matrículas sospechosas.",
          "Instalación PoE Estable: Olvídate de interferencias WiFi; la conexión por cable garantiza vídeo fluido 24/7.",
          "Inteligencia en Red: El NVR de 2TB gestiona las grabaciones de forma local y segura, permitiendo el acceso remoto encriptado desde el móvil del propietario."
        ],
        whyRecommend: "Considero que la estabilidad en un negocio no es negociable. El cableado PoE te garantiza que ninguna frecuencia WiFi inhibida dejará a tu local a ciegas. Su IA de detección humana es la más precisa en este rango de precio, ahorrándote la pesadilla de despertarte de madrugada por falsas alarmas provocadas por sombras o insectos.",
        amazonUrl: "https://www.amazon.es/s?k=Reolink+RLK8-800B4",
        image: "/img/products/reolink-nvr.jpg",
        category: "CCTV Pack"
      },
      {
        id: "n2",
        name: "TP-Link Omada ER605 V2",
        description: "Router profesional que crea un túnel VPN seguro para aislar tu sistema de videovigilancia de la red general y proteger la privacidad de tu negocio.",
        advantages: [
          "Ciberseguridad Avanzada: Cortafuegos (Firewall) integrado y soporte para múltiples protocolos VPN seguros (IPsec/OpenVPN).",
          "Balanceo de Carga (Multi-WAN): Permite conectar dos líneas de internet diferentes para que, si una se cae, el negocio y las cámaras sigan online.",
          "Integración Omada: Gestión centralizada en la nube si el negocio crece y añade más puntos de acceso o interruptores."
        ],
        whyRecommend: "Sé por mis experiencias que de nada sirve blindar la puerta de tu local si dejas la puerta digital abierta. Este router crea un muro de ciberseguridad que impide que pirateen tus cámaras desde internet. Además, su capacidad de gestionar dos líneas de internet a la vez es mi recomendación definitiva para que tu negocio nunca se quede desconectado ni pierda la vigilancia online.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Omada+ER605+V2",
        image: "/img/products/tapo-router.jpg",
        category: "Networking"
      },
      {
        id: "n3",
        name: "Hikvision Pro Series AcuSense DS-2CD2186G2-I",
        description: "Cámara domo 4K antivandálica con tecnología AcuSense. Su motor de IA clasifica humanos y vehículos, reduciendo las falsas alarmas en un 99%.",
        advantages: [
          "Tecnología AcuSense: Permite realizar búsquedas rápidas en las grabaciones filtrando solo 'cuando pasó una persona', ahorrando horas de revisión de vídeo.",
          "Protección antivandálica (IK10): Soporta golpes directos e intentos de sabotaje en el negocio.",
          "Visión Nocturna DarkFighter: Captura imágenes nítidas en condiciones de oscuridad casi total donde otras cámaras solo ven negro."
        ],
        whyRecommend: "Esta cámara de Hikvision es, según mi opinión, de las mejores cuando se busca una protección perimetral estricta y profesional. Su analítica de vídeo con IA es extraordinaria: en lugar de hacerte perder horas buscando en las grabaciones qué ha pasado, mi criterio para recomendarla es su capacidad de filtrar los vídeos al instante mostrando solo los momentos donde detecta intrusos reales. Es la cámara que necesitas para proteger tus activos más valiosos.",
        amazonUrl: "https://www.amazon.es/s?k=Hikvision+DS-2CD2186G2-I",
        image: "/img/products/hikvision-cam.jpg",
        category: "Cámara Pro"
      },
      {
        id: "n4",
        name: "Reolink RLC-810A",
        description: "Cámara de alta definición con software integrado de conteo de personas y control de aforo para analizar el flujo de clientes en tiempo real.",
        advantages: [
          "Conteo Inteligente: Genera estadísticas de cuántas personas entran y salen de tu local comercial a lo largo del día.",
          "Alertas de Aglomeración: Capaz de enviar una notificación si se supera el aforo permitido en una zona crítica.",
          "Audio Bidireccional: Micrófono integrado de alta fidelidad para escuchar lo que ocurre en la zona de cajas o atención al cliente."
        ],
        whyRecommend: "Este modelo no solo protege, sino que aportar valor a la gestión de tu negocio. Recomiendo su instalación en la entrada principal de locales porque cumple una doble función perfecta: vigila el acceso con la máxima resolución y, simultáneamente, te proporciona métricas exactas de aforo y afluencia de clientes para ayudarte a tomar mejores decisiones comerciales.",
        amazonUrl: "https://www.amazon.es/s?k=Reolink+RLC-810A",
        image: "/img/products/hikvision-cam.jpg",
        category: "Grabación"
      },
      {
        id: "n5",
        name: "Eufy Security Cam 3C - Kit de 2 Cámaras",
        description: "Sistema de cámaras 100% inalámbrico con resolución 4K nativa y central inteligente local, ideal para locales de alquiler sin opción a cableado u obras.",
        advantages: [
          "Resolución 4K Inalámbrica: Máxima calidad del mercado sin necesidad de cables de vídeo.",
          "IA BionicMind: La central reconoce las caras de los empleados para no enviar alertas al dueño cuando ellos abren el negocio.",
          "Batería de larga duración: Hasta 180 días de autonomía con una sola carga."
        ],
        whyRecommend: "Si tu local es de alquiler o la normativa de tu oficina te impide hacer obras para pasar cables, esta es la única opción inalámbrica que me atrevo a recomendarte como profesional. La elijo porque su señal encriptada es sumamente estable frente a interferencias y porque su resolución 4K real te asegura el nivel de detalle que vas a necesitar ante cualquier reclamación o incidente legal en tu empresa.",
        amazonUrl: "https://www.amazon.es/s?k=eufy+Security+Cam+3C",
        image: "/img/products/eufy-cam-3c.jpg",
        category: "Inalámbrico Pro"
      },
      {
        id: "n6",
        name: "WD Purple Pro 4TB",
        description: "Disco duro interno de alta capacidad optimizado para la escritura continua 24/7 y diseñado especialmente para soportar transmisiones de vídeo 4K e IA.",
        advantages: [
          "Tecnología AllFrame AI: Reduce la pérdida de fotogramas y mejora la reproducción del vídeo analítico de inteligencia artificial.",
          "Carga de trabajo Pro: Soporta hasta 360 TB al año, el triple que los discos duros estándar de videovigilancia.",
          "Resistencia térmica: Componentes preparados para soportar el calor constante dentro de los armarios de servidores de los negocios."
        ],
        whyRecommend: "Insisto firmemente en que no escatimes en el almacenamiento. Mi recomendación por la gama 'Purple Pro' se basa en la experiencia: un negocio exige cámaras de mucha resolución grabando 24/7 y procesando datos de inteligencia artificial a la vez. Este componente es el único que te garantiza que el día que necesites descargar una prueba crucial para un seguro o un juicio, el vídeo estará ahí, intacto y sin saltos de fotogramas.",
        amazonUrl: "https://www.amazon.es/s?k=WD+Purple+Pro+4TB",
        image: "/img/products/wd-purple.jpg",
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
        name: "Ajax StarterKit Cam",
        description: "El blindaje definitivo contra la ocupación ilegal. Se comunica por 4G y canales de internet tradicionales, con batería de respaldo por si cortan la luz.",
        advantages: [
          "Fotoverificación inmediata: Envía ráfagas de fotos al móvil en segundos para verificar intrusiones en tiempo real.",
          "Inmune a sabotajes y cortes: Te notifica al instante ante caídas de luz de la propiedad o intentos de inhibición de señal.",
          "Plena validez legal: Acelera el desalojo inmediato al aportar pruebas en flagrante delito que exige la policía para intervenir."
        ],
        whyRecommend: "Para una segunda residencia, una cámara WiFi común no basta, ya que los ocupas saben que basta con bajar el plomo de la luz para apagarla. Recomiendo el ecosistema de Ajax porque cumple de verdad con mi promesa de 'Anti-ocupación Real'. Te asegura el control total a distancia y te da la verificación visual instantánea que exige la policía para intervenir de inmediato, todo sin depender de la corriente eléctrica.",
        amazonUrl: "https://www.amazon.es/s?k=Ajax+StarterKit+Cam",
        image: "/img/products/ajax-starterkit.jpg",
        category: "Sistema Anti-Ocupación"
      },
      {
        id: "r2",
        name: "Reolink Go Ultra",
        description: "Vigilancia perimetral ininterrumpida 100% independiente con tarjeta SIM 4G LTE y panel solar, inmune a cortes eléctricos generales.",
        advantages: [
          "Resolución 4K Ultra HD: Nitidez extrema que te permite identificar rostros y detalles a gran distancia.",
          "Independencia Eléctrica total: El panel solar mantiene la batería cargada todo el año de forma pasiva.",
          "Detección Inteligente IA: Su motor integrado filtra movimientos de viento y animales, alertándote solo de personas."
        ],
        whyRecommend: "Mantengo el concepto de cámara 4G de tu lista, pero doy el salto a la versión Go Ultra 4K. Es mi elección experta para segundas residencias porque, al no depender del router de la casa ni de la red eléctrica, se convierte en tu vigilante perimetral más fiable. Aunque saboteen la electricidad de la vivienda, esta cámara te seguirá transmitiendo vídeo en directo en la máxima resolución del mercado.",
        amazonUrl: "https://www.amazon.es/s?k=Reolink+Go+Ultra",
        image: "/img/products/reolink-go.jpg",
        category: "Cámara 4G Autónoma"
      },
      {
        id: "r3",
        name: "Eufy Security SoloCam S340",
        description: "Diseño giratorio de doble lente (gran angular y teleobjetivo) que se alimenta de energía solar para eliminar puntos ciegos en las fachadas.",
        advantages: [
          "Rotación 360° con Seguimiento: Monitoriza grandes superficies de terreno y rastrea personas de forma automatizada.",
          "Zoom Híbrido de 8 aumentos: Permite acercar la imagen para capturar caras o matrículas nítidas sin pixelación.",
          "Almacenamiento Local Gratuito: Guarda clips históricos internamente en la HomeBase sin suscripciones adicionales."
        ],
        whyRecommend: "He seleccionado la SoloCam S340 como la cámara exterior principal porque soluciona el gran problema de las casas de vacaciones: los meses de ausencia. Al cargarse con el sol, mi criterio para recomendarla es que elimina el riesgo de quedarte a ciegas por un fallo de batería. Además, su doble lente te ofrece una capacidad de verificación visual rápida y de alta fidelidad que las cámaras tradicionales fijas no pueden igualar.",
        amazonUrl: "https://www.amazon.es/s?k=eufy+SoloCam+S340",
        image: "/img/products/eufy-solocam.jpg",
        category: "Solar con Rotación"
      },
      {
        id: "r4",
        name: "X-Sense XS01-WX",
        description: "Detector inteligente de humo que monitoriza el aire de manera continua y activa sirenas locales mientras notifica a los móviles de la familia.",
        advantages: [
          "Sensor fotoeléctrico avanzado: Minimiza falsas alarmas y detecta combustiones lentas extremadamente rápido.",
          "Años de batería continua: Asegura el funcionamiento continuo del sensor autónomo y previene descargas accidentales en tu ausencia.",
          "Alertas en red compartida: Enlaza múltiples smartphones para avisar a vecinos o familiares cercanos si estás de viaje."
        ],
        whyRecommend: "El vandalismo no es el único peligro cuando una casa pasa meses cerrada; un cortocircuito puede destruirla por completo. Recomiendo mantener este dispositivo de X-Sense porque su fiabilidad está más que contrastada. Es mi sugerencia imprescindible para garantizarte la tranquilidad total a distancia, permitiéndote reaccionar y llamar a los bomberos antes de que el fuego se propague.",
        amazonUrl: "https://www.amazon.es/s?k=X-Sense+XS01-WX",
        image: "/img/products/xsense_detector.jpg",
        category: "Seguridad Incendio"
      },
      {
        id: "r5",
        name: "Nuki Smart Lock Ultra",
        description: "Cerradura inteligente de alta seguridad para conceder accesos virtuales remotos a familiares o técnicos de confianza.",
        advantages: [
          "Gestión de llaves virtuales: Crea códigos de acceso con horarios definidos que caducan solos tras finalizar la visita.",
          "Motorización de alta velocidad: Bloqueo automatizado del cerrojo en el momento exacto en que se junta la puerta.",
          "Instalación interna invisible: Se monta sobre el bombín actual interior sin alterar el aspecto exterior de la vivienda."
        ],
        whyRecommend: "He sustituido la opción de SwitchBot por el nuevo estándar de Nuki porque en una segunda residencia necesitas la máxima fiabilidad mecánica. Recomiendo este modelo porque su sistema de encriptación es de nivel bancario y te permite solucionar imprevistos a distancia (como dejar pasar a un fontanero si hay una fuga) sin tener que conducir durante horas para abrir la puerta tú mismo.",
        amazonUrl: "https://www.amazon.es/s?k=Nuki+Smart+Lock+Ultra",
        image: "/img/products/nuki-smartlock.jpg",
        category: "Control de Acceso"
      },
      {
        id: "r6",
        name: "Sensores Tapo T110 + Hub H100",
        description: "Sensores inteligentes de contacto rápido para detectar aperturas forzadas en persianas o puertas traseras de forma ultra-rápida.",
        advantages: [
          "Conexión Sub-G de bajo consumo: Ofrece una autonomía de las baterías de más de un año sin desatender la vivienda.",
          "Detección en milisegundos: Notificación inmediata de intrusión al smartphone para ganar un tiempo perimetral valioso.",
          "Ecosistema expandible: El hub local activa sirenas sonoras disuasorias disuadiendo al sospechoso en el momento."
        ],
        whyRecommend: "Recomiendo colocar estos sensores en todos los puntos vulnerables de tu segunda residencia porque actúan como tu primera línea de defensa activa. Mi criterio técnico para elegirlos por encima de los sensores WiFi comunes es su velocidad: te avisarán al móvil de inmediato si alguien intenta manipular una persiana, permitiéndote abrir las cámaras de seguridad al instante para realizar una verificación rápida de la situación.",
        amazonUrl: "https://www.amazon.es/s?k=TP-Link+Tapo+T110+Hub+H100",
        image: "/img/products/tapo-t110.jpg",
        category: "Alerta Perimetral"
      }
    ]
  }
];