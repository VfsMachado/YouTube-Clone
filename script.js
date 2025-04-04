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
  
    // Renderiza vídeos na tela
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
  
    // Dark Mode Toggle (adicione um botão no header)
    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerHTML = '<i data-feather="moon"></i>';
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      feather.replace();
    });
    document.querySelector(".header-right").prepend(darkModeToggle);
  });
  function renderVideos(videos) {
    const container = document.getElementById('videos');
    container.innerHTML = videos.map(video => `
      <div class="video-card">
        <img src="${video.thumb}" class="video-thumbnail">
        <div class="video-info">
          <img src="${video.avatar}" class="channel-avatar">
          <div class="video-details">
            <h4>${video.titulo}</h4>
            <p>${video.canal}</p>
            <p>${video.views} • ${video.data}</p>
          </div>
        </div>
      </div>
    `).join('');
  }
  