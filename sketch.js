let items = [];
let angle = 0;
let radius = 400;
let autoplay = true;
let rotSpeed = 0.6;
let zoomFactor = 1;
let bgColor = "#000000";

let dragging = false;
let lastX = 0;

let mediaRecorder, recordedChunks = [];

function setup() {
  const c = createCanvas(windowWidth - 300, windowHeight, WEBGL);
  c.parent("canvasWrap");
  angleMode(DEGREES);
  noStroke();

  // Inputs
  document.getElementById("fileInput").addEventListener("change", handleFiles);
  document.getElementById("autoplay").addEventListener("change", e => autoplay = e.target.checked);
  document.getElementById("speed").addEventListener("input", e => rotSpeed = parseFloat(e.target.value));
  document.getElementById("zoom").addEventListener("input", e => zoomFactor = parseFloat(e.target.value));
  document.getElementById("bgColor").addEventListener("input", e => bgColor = e.target.value);
  
  document.getElementById("startRec").addEventListener("click", startRecording);
  document.getElementById("stopRec").addEventListener("click", stopRecording);

  // Drag
  let canvasEl = document.querySelector("canvas");
  canvasEl.addEventListener("pointerdown", e => { dragging = true; lastX = e.clientX; });
  window.addEventListener("pointerup", () => dragging = false);
  window.addEventListener("pointermove", e => { if(dragging) angle += (e.clientX - lastX) * 0.3; lastX = e.clientX; });
  window.addEventListener("wheel", e => { zoomFactor = constrain(zoomFactor - e.deltaY * 0.001, 0.6, 2); });
}

function draw() {
  background(bgColor);

  push();
  scale(zoomFactor);
  rotateX(-10);
  if (autoplay && !dragging) angle += rotSpeed;

  let n = items.length;
  if (n === 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Importe des images ou vidéos pour lancer le carrousel", 0, 0);
    pop();
    return;
  }

  for (let i = 0; i < n; i++) {
    let a = angle + i * (360 / n);
    let x = cos(a) * radius;
    let z = sin(a) * radius;
    push();
    translate(x, 0, z);
    rotateY(-a - 90);

    let w = 300, h = 200;
    texture(items[i].texture);
    plane(w, h);
    pop();
  }
  pop();
}

function handleFiles(e) {
  const files = e.target.files;
  for (const f of files) {
    const url = URL.createObjectURL(f);
    if (f.type.startsWith("image/")) {
      loadImage(url, img => items.push({ texture: img }));
    } else if (f.type.startsWith("video/")) {
      let vid = createVideo([url]);
      vid.hide();
      vid.loop();
      items.push({ texture: vid });
    }
  }
}

function startRecording() {
  const canvas = document.querySelector("canvas");
  const stream = canvas.captureStream(30);
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  mediaRecorder.ondataavailable = e => e.data.size > 0 && recordedChunks.push(e.data);
  mediaRecorder.onstop = exportVideo;
  mediaRecorder.start();
  document.getElementById("startRec").disabled = true;
  document.getElementById("stopRec").disabled = false;
}

function stopRecording() {
  mediaRecorder.stop();
  document.getElementById("startRec").disabled = false;
  document.getElementById("stopRec").disabled = true;
}

function exportVideo() {
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "carousel_capture.webm";
  a.click();
  URL.revokeObjectURL(url);
}
