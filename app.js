const input = document.getElementById('videoUrl');
const fetchBtn = document.getElementById('fetchBtn');
const statusBox = document.getElementById('status');
const result = document.getElementById('result');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const fileName = document.getElementById('fileName');
const fileType = document.getElementById('fileType');
const supportedExtensions = /\\.(mp4|webm|ogg|mov|m4v)$/i;

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
    message('Please enter a valid http:// or https:// video URL.');
    input.focus();
    return;
  }

  // Check the actual URL path, not query parameters that may contain ".mp4".
  if (!supportedExtensions.test(url.pathname)) {
    message('This is a webpage link, not a direct video file. Paste a direct .mp4, .webm, .ogg, .mov or .m4v link.');
    return;
  }

  fetchBtn.disabled = true;
  fetchBtn.textContent = 'Checking…';
  preview.src = url.href;

  preview.onloadedmetadata = () => {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = 'Find video <span>→</span>';

    const rawName = url.pathname.split('/').pop() || 'video-file';
    let name = rawName;
    try { name = decodeURIComponent(rawName); } catch { /* Keep the encoded name. */ }

    fileName.textContent = name;
    fileType.textContent = preview.videoWidth && preview.videoHeight
      ? preview.videoWidth + ' × ' + preview.videoHeight + ' · Video file'
      : 'Video file';

    downloadBtn.href = url.href;
    downloadBtn.setAttribute('download', name);
    result.classList.remove('hidden');
    message('Video loaded. Preview it, then download if you have permission.', true);
  };

  preview.onerror = () => {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = 'Find video <span>→</span>';
    resetResult();
    message('The video could not be opened. The host may block browser playback, require authorization, or the link may have expired.');
  };
}

fetchBtn.addEventListener('click', startFetch);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') startFetch();
});
