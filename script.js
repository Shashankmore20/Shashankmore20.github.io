document.addEventListener('DOMContentLoaded', () => {
  const toggleMode = document.getElementById('toggleMode');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const resumeViewer = document.getElementById('resume-viewer');
  const closeResume = document.getElementById('close-resume');

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(currentTheme + '-mode');

  toggleMode.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', !isDark);
    document.body.classList.toggle('light-mode', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  closeResume.addEventListener('click', () => {
    resumeViewer.classList.add('hidden');
  });
});

function openResume(event) {
  event.preventDefault();
  document.getElementById('resume-viewer').classList.remove('hidden');
}