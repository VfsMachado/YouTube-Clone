document.addEventListener("DOMContentLoaded", () => {
    feather.replace();
  
    fetch("videos.json")
      .then((res) => res.json())
      .then((videos) => {
        const container = document.getElementById("videos");
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
            console.log("Clicou!");
            localStorage.setItem("videoAtual", JSON.stringify(video));
            window.location.href = "video.html";
          });
          container.appendChild(card);
        });
      });
  });
  