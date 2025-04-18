document.addEventListener("DOMContentLoaded", () => {
    feather.replace();
  
    // Variáveis globais
    let allVideos = [];
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
  
    // Carrega vídeos do JSON
    fetch("videos.json")
      .then(res => res.json())
      .then(videos => {
        allVideos = videos;
        renderVideos(allVideos);
      });
  
    // Renderiza vídeos
    function renderVideos(videos) {
      const container = document.getElementById("videos");
      container.innerHTML = "";
      videos.forEach(video => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
          <img src="${video.thumb}" alt="${video.titulo}" class="video-thumbnail">
          <div class="video-info">
            <img src="${video.avatar}" alt="${video.canal}" class="channel-avatar">
            <div>
              <h4>${video.titulo}</h4>
              <p>${video.canal}</p>
              <p>${video.views} • ${video.data}</p>
            </div>
          </div>
        `;
        card.addEventListener("click", () => {
          localStorage.setItem("currentVideo", JSON.stringify(video));
          window.location.href = "video.html";
        });
        container.appendChild(card);
      });
    }
  
    // Sidebar toggle
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  
    // Busca de vídeos
    document.getElementById("searchInput").addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = allVideos.filter(video =>
        video.titulo.toLowerCase().includes(term) ||
        video.canal.toLowerCase().includes(term)
      );
      renderVideos(filtered);
    });
  
    // Botão de Dark Mode
    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerHTML = '<i data-feather="moon"></i>';
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      feather.replace();
    });
    document.querySelector(".header-right").prepend(darkModeToggle);
  });
  // No seu script.js
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');

// Busca os dados do vídeo com base no ID
fetch(`/api/videos/${videoId}`)
  .then(response => response.json())
  .then(video => {
    document.querySelector('.video-title').textContent = video.title;
    // Preencha os outros campos...
  });