// Configuration: Map entity name to its specific port
const SERVICE_CONFIG = {
  donantes:     { port: 8081, id: 'donantesCounts' },
  beneficiarios: { port: 8082, id: 'beneficiariosCounts' },
  centros:       { port: 8083, id: 'centrosCounts' },
  donaciones:    { port: 8084, id: 'donacionesCounts' }
};

/**
 * Generic fetcher that handles any entity
 */
async function loadMetric(key) {
  const config = SERVICE_CONFIG[key];
  const countElement = document.getElementById(config.id);
  
  if (!countElement) return;

  try {
    const url = `http://localhost:${config.port}/api/${key}/count`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    
    // We expect {"count": number}
    const val = data.count !== undefined ? data.count : 0;
    
    countElement.textContent = val.toLocaleString('es-CL');
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    countElement.textContent = "—";
  }
}

// Execution
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(SERVICE_CONFIG).forEach(key => loadMetric(key));
});