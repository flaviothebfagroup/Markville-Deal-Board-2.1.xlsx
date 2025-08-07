async function loadChannels() {
  const res = await fetch("channels.json");
  const channels = await res.json();
  const list = document.getElementById("channel-list");
  const player = document.getElementById("videoPlayer");

  channels.forEach((channel, index) => {
    const btn = document.createElement("div");
    btn.className = "channel-button";
    btn.innerHTML = `
      <img src="${channel.logo}" alt="${channel.name}" />
      <span>${channel.name}</span>
    `;
    btn.onclick = () => {
      player.src = channel.stream;
      player.load();
      player.play().catch(console.warn);
    };
    list.appendChild(btn);

    // Auto-play first channel
    if (index === 0) {
      player.src = channel.stream;
    }
  });
}

loadChannels();
