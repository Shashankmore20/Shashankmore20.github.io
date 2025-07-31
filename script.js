document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('toggleMode');
  const currentMode = localStorage.getItem('theme') || 'light';
  document.body.classList.add(currentMode + '-mode');

  modeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', !isDark);
    document.body.classList.toggle('light-mode', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
});
