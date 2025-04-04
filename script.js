document.addEventListener("DOMContentLoaded", () => {
    feather.replace();
  
    let allVideos = []; // Para armazenar os vídeos carregados
  
    fetch("videos.json")
      .then((res) => res.json())
      .then((videos) => {
        allVideos = videos; // Guarda os vídeos na variável global
        renderVideos(allVideos); // Exibe os vídeos na tela
      });
  
    function renderVideos(videos) {
      const container = document.getElementById("videos");
      container.innerHTML = ""; // Limpa os vídeos anteriores
  
      videos.forEach((video) => {
        const card = document.createElement("div");
        card.classList.add("video-card");
        card.innerHTML = `
          <img class="thumb" src="${video.thumb}" alt="Thumb" />
          <div class="video-info">
            <img class="avatar" src="${video.avatar}" alt="Avatar" />
            <div class="meta">
              <h4>${video.titulo}</h4>
              <p>${video.canal}</p>
              <p>${video.views} • ${video.data}</p>
            </div>
          </div>
        `;
        card.addEventListener("click", () => {
          localStorage.setItem("videoAtual", JSON.stringify(video));
          window.location.href = "video.html";
        });
        container.appendChild(card);
      });
    }
  
    // Função para buscar vídeos
    document.querySelector(".search-bar input").addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredVideos = allVideos.filter((video) =>
        video.titulo.toLowerCase().includes(searchTerm) || video.canal.toLowerCase().includes(searchTerm)
      );
      renderVideos(filteredVideos); // Atualiza a tela com os vídeos filtrados
    });
  });