// Map services to their specific ports
const SERVICES = {
  donantes: 'http://localhost:8081/api',
  donaciones: 'http://localhost:8082/api',
  centros: 'http://localhost:8083/api',
  beneficiarios: 'http://localhost:8084/api'
};

async function fetchCount(serviceKey, endpoint, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return null;

  try {
    const url = `${SERVICES[serviceKey]}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    
    // Now it handles both {count: 10} and raw numbers
    const count = data.count !== undefined ? data.count : data;

    el.textContent = count.toLocaleString('es-CL');
    return count;
  } catch (error) {
    console.error(`Error in ${serviceKey}:`, error);
    el ? el.textContent = '—' : null;
    return null;
  }
}

// Now call them with the correct service key
async function refreshMetrics() {
  await Promise.all([
    fetchCount('donantes', '/donantes/count', 'donantesCount'),
    fetchCount('donaciones', '/donaciones/count', 'donacionesCount'),
    fetchCount('centros', '/centros-acopio/count', 'centrosAcopioCount'),
    fetchCount('beneficiarios', '/beneficiarios/count', 'beneficiariosCount')
  ]);
}