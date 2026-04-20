document.addEventListener("DOMContentLoaded", () => {
    
    
    const progresoActual = 25; 

    actualizarInterfazProgreso(progresoActual);
});

function actualizarInterfazProgreso(valor) {
    // Asegurar que el valor esté entre 0 y 100
    const porcentaje = Math.min(100, Math.max(0, valor));
    
    // 1. Actualizar la Barra de Progreso Principal
    const barFill = document.getElementById('progressFill');
    const percentText = document.getElementById('percentText');
    
    // JS aplica el ancho, CSS se encarga de la animación suave
    barFill.style.width = porcentaje + '%';
    percentText.textContent = porcentaje + '%';

    // 2. Actualizar el Estado de las Fases
    // Definimos los umbrales de porcentaje para cada fase
    const fases = [
        { id: 'phase1', umbral: 25 }, // Se completa al 25%
        { id: 'phase2', umbral: 50 }, // Se completa al 50%
        { id: 'phase3', umbral: 75 }, // Se completa al 75%
        { id: 'phase4', umbral: 100 } // Se completa al 100%
    ];

    fases.forEach((fase, index) => {
        const card = document.getElementById(fase.id);
        const label = card.querySelector('.phase-status-label');
        
        // Limpiar estados previos
        card.classList.remove('active', 'completed');

        if (porcentaje >= fase.umbral) {
            // Fase Completada
            card.classList.add('completed');
            label.textContent = "Completada";
        } else if (index === 0 && porcentaje < fases[0].umbral || (index > 0 && porcentaje >= fases[index-1].umbral && porcentaje < fase.umbral)) {
            // Fase Actual (En curso)
            card.classList.add('active');
            label.textContent = "En Curso";
        } else {
            // Fase Pendiente
            label.textContent = "Pendiente";
        }
    });
}