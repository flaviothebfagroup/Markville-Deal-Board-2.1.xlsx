async function loadChannels() {
  const res = await fetch('channels.json');
  const channels = await res.json();
  const list = document.getElementById('channel-list');

  channels.forEach(channel => {
    const button = document.createElement('button');
    button.innerHTML = `<img src="${channel.logo}" width="50"> ${channel.name}`;
    button.onclick = () => playStream(channel.stream);
    list.appendChild(button);
  });
}

let hls;
function playStream(url) {
  const video = document.getElementById('player');
  if (hls) {
    hls.destroy();
  }
  hls = new Hls();
  hls.loadSource(url);
  hls.attachMedia(video);
  video.play();
}

loadChannels();
