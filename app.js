const input = document.getElementById('videoUrl');
const fetchBtn = document.getElementById('fetchBtn');
const statusBox = document.getElementById('status');
const result = document.getElementById('result');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const fileName = document.getElementById('fileName');
const fileType = document.getElementById('fileType');

document.getElementById('year').textContent = new Date().getFullYear();

function message(text, ok = false) {
  statusBox.textContent = text;
  statusBox.className = ok ? 'status ok' : 'status';
}

function validHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
}

function resetResult() {
  preview.onerror = null;
  preview.onloadedmetadata = null;
  preview.removeAttribute('src');
  preview.load();
  result.classList.add('hidden');
}

function startFetch() {
  const url = validHttpUrl(input.value.trim());
  resetResult();
  message('');

  if (!url) {
    message('Enter a valid http:// or https:// URL.');
    input.focus();
    return;
  }

  fetchBtn.disabled = true;
  fetchBtn.textContent = 'Checking video…';
  preview.src = url.href;

  preview.onloadedmetadata = () => {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = 'Find video <span>→</span>';

    const lastPart = url.pathname.split('/').filter(Boolean).pop() || 'video';
    let name = lastPart;
    try { name = decodeURIComponent(lastPart); } catch { /* Keep original text. */ }
    if (!/\.(mp4|webm|ogg|mov|m4v)$/i.test(name)) name += '.mp4';

    fileName.textContent = name;
    fileType.textContent = preview.videoWidth && preview.videoHeight
      ? preview.videoWidth + ' × ' + preview.videoHeight + ' · Direct video'
      : 'Direct video file';

    downloadBtn.href = url.href;
    downloadBtn.setAttribute('download', name);
    result.classList.remove('hidden');
    message('Playable video detected. Download availability depends on the host.', true);
  };

  preview.onerror = () => {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = 'Find video <span>→</span>';
    resetResult();
    message('No playable direct video was detected. This may be a webpage link, an expired URL, or a host-restricted stream.');
  };
}

fetchBtn.addEventListener('click', startFetch);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') startFetch();
});
