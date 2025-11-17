
export function inicializarTabs() {

  // 2. Selectores (los movemos adentro)
  const tabButtons = document.querySelectorAll('.tab-button');
  const contentSections = document.querySelectorAll('.content-section');

  // 3. "IF GUARD"
  // Si no hay botones, no estamos en la página de "info" (o donde estén las tabs)
  if (tabButtons.length === 0) {
    return; // No hacer nada
  }

  // 4. El resto de tu código (funciones y listeners)
  
  function switchTab(tabName) {
    contentSections.forEach(section => {
      section.classList.add('hidden');
    });
    tabButtons.forEach(button => {
      button.classList.remove('active', 'bg-blue-800/50', 'text-white');
      button.classList.add('bg-gray-100', 'text-gray-700');
    });
    const targetSection = document.getElementById(tabName + '-content');
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    const activeButton = document.querySelector('[data-tab="' + tabName + '"]');
    if (activeButton) {
      activeButton.classList.add('active', 'bg-blue-800/50', 'text-white');
      activeButton.classList.remove('bg-gray-100', 'text-gray-700');
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
  switchTab('talles');

}