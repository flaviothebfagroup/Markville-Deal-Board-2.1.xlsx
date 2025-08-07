async function loadChannels() {
  const res = await fetch("channels.json");
  const channels = await res.json();
  const list = document.getElementById("channel-list");

  channels.forEach(channel => {
    const btn = document.createElement("div");
    btn.className = "channel-button";
    btn.innerHTML = `<img src="${channel.logo}" alt="${channel.name}" /> <span>${channel.name}</span>`;
    btn.onclick = () => playStream(channel.stream);
    list.appendChild(btn);
  });

  // Auto-play first channel
  if (channels.length > 0) {
    playStream(channels[0].stream);
  }
}

function playStream(url) {
  const video = document.getElementById("player");
  video.src = url;
  video.load();
  video.play().catch((err) => {
    console.warn("Autoplay failed:", err);
  });
}

loadChannels();
