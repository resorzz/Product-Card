// Importamos las imágenes locales (Matched with your actual filenames)
import pspImg from '../assets/pspImg.jpg';
import kpxImg from '../assets/kpxImg.png';
import delidImg from '../assets/delidImg.png';
import liquidImg from '../assets/liquidImg.png';
import gpuImg from '../assets/gpuImg.png';
import caseImg from '../assets/caseImg.png';
import ssdImg from '../assets/ssdImg.png';
import cpuImg from '../assets/cpuImg.png';
import coolCPUImg from '../assets/coolCPUImg.png';

export const products = [
  {
    id: 1,
    name: "Sony PSP 3004",
    price: 60.00,
    description: "La leyenda portátil. Pantalla LCD mejorada y micrófono incorporado. Perfecta para emulación.",
    img: pspImg, 
    stock: 1
  },
  {
    id: 2,
    name: "KPx Thermal Paste",
    price: 39.99,
    description: "Pasta térmica de alto rendimiento para overclocking extremo. Diseñada por Kingpin Cooling.",
    img: kpxImg,
    stock: 10
  },
  {
    id: 3,
    name: "Thermal Grizzly Delid-Die-Mate",
    price: 49.90,
    description: "Herramienta segura para hacer delid a procesadores Intel y bajar temperaturas drásticamente.",
    img: delidImg,
    stock: 5
  },
  {
    id: 4,
    name: "Conductonaut Extreme Liquid Metal",
    price: 18.50,
    description: "Metal líquido para una transferencia de calor inigualable. ¡Cuidado, es conductor eléctrico!",
    img: liquidImg,
    stock: 15
  },
  {
    id: 5,
    name: "Yeston x GravaStar AMD RADEON RX 9070 XT",
    price: 769.00,
    description: "Tarjeta gráfica de alto rendimiento con 16GB GDDR6. Diseño exclusivo Mercury Nova OC.",
    img: gpuImg,
    stock: 2
  },
  {
    id: 6,
    name: "Corsair 5000D Airflow",
    price: 174.90,
    description: "Chasis mid-tower optimizado para alto flujo de aire. Gestión de cables excepcional.",
    img: caseImg,
    stock: 8
  },
  {
    id: 7,
    name: "WD Black SN770 2TB",
    price: 139.00,
    description: "SSD NVMe PCIe 4.0. Velocidades de vértigo para cargar mapas de Battlefield al instante.",
    img: ssdImg,
    stock: 20
  },
  {
    id: 8,
    name: "Intel Core i7-13700K",
    price: 415.00,
    description: "16 núcleos (8P + 8E). La bestia para gaming y productividad. Desbloqueado para OC.",
    img: cpuImg,
    stock: 4
  },
  {
    id: 9,
    name: "Artic Cooler Liquid Freezer II 360 ARGB",
    price: 80.00,
    description: "Sistema de refrigeración líquida de 360mm con iluminación ARGB. Ideal para CPUs de alto rendimiento.",
    img: coolCPUImg,
    stock: 6 
  }
];