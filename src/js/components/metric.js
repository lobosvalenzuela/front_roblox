/**
 * Configuration: Map entity name to its specific port and HTML ID
 */
const SERVICE_CONFIG = {
  donantes:      { port: 8081, id: 'donantesCount' },
  beneficiarios: { port: 8082, id: 'beneficiariosCount' },
  centros:       { port: 8083, id: 'centrosAcopioCount' },
  donaciones:    { port: 8084, id: 'donacionesCount' }
};

/**
 * Generic fetcher that handles any entity
 */
async function loadMetric(key) {
  const config = SERVICE_CONFIG[key];
  const countElement = document.getElementById(config.id);
  
  // Guard clause: stop if the element doesn't exist on the current page
  if (!countElement) {
    console.warn(`Element not found for ID: ${config.id}`);
    return;
  }
  
  try {
    // FIX: Construct absolute URL using the microservice port
    const url = `http://localhost:${config.port}/api/${key}/count`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // Default to 0 if count is missing
    const val = data.count !== undefined ? data.count : 0;
    
    // Update the UI
    countElement.textContent = val.toLocaleString('es-CL');
    
  } catch (error) {
    console.error(`Error loading ${key} from port ${config.port}:`, error);
    // Visual indicator of error
    countElement.textContent = "—";
  }
}

/**
 * Execution: Fetch all metrics once the DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(SERVICE_CONFIG).forEach(key => loadMetric(key));
});