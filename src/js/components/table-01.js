async function populateDonacionesTable() {
  const tableBody = document.getElementById('donacionesTableBody');
  
  try {
    // FIX: Point directly to the microservice port (8084)
    const response = await fetch('http://localhost:8084/api/donaciones');
    
    if (!response.ok) throw new Error('Failed to fetch donations');
    
    const data = await response.json();

    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="py-3 text-gray-800 text-theme-sm dark:text-white/90 font-medium">${item.articulo}</td>
        <td class="py-3 text-gray-500 text-theme-sm dark:text-gray-400">${item.cantidad}</td>
        <td class="py-3 text-gray-500 text-theme-sm dark:text-gray-400">${item.donanteId}</td>
        <td class="py-3 text-gray-500 text-theme-sm dark:text-gray-400">${item.centroAcopioId}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error populating table:", error);
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-red-500">Error loading data (Service may be down)</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateDonacionesTable();
});