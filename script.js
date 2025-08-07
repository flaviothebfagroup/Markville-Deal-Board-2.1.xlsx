async function loadChannels() {
  const res = await fetch("channels.json");
  const channels = await res.json();
  const list = document.getElementById("channel-list");
  const video = document.getElementById("videoPlayer");

  let hls = null;

  function playStream(url) {
    if (hls) {
      hls.destroy();
      hls = null;
    }

    if (Hls.isSupported() && url.endsWith('.m3u8')) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(console.warn);
      });
    } else {
      video.src = url;
      video.play().catch(console.warn);
    }
  }

  channels.forEach((channel, index) => {
    const btn = document.createElement("div");
    btn.className = "channel-button";
    btn.innerHTML = `
      <img src="${channel.logo}" alt="${channel.name}" />
      <span>${channel.name}</span>
    `;
    btn.onclick = () => playStream(channel.stream);
    list.appendChild(btn);

    // Auto-play first channel on load
    if (index === 0) {
      playStream(channel.stream);
    }
  });
}

loadChannels();
