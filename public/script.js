var video = document.getElementById("video");
var isMuted = true;
var isRecording = false;
var mediaRecorder;
var recordedChunks = [];

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(function (stream) {
    video.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
  })
  .catch(function (error) {
    console.error('Error accessing media devices:', error);
  });

// function toggleMute() {
//   if (isMuted) {
//     video.muted = false;
//     document.querySelector('.mute-button').textContent = 'Mute';
//     isMuted = false;
//   } else {
//     video.muted = true;
//     document.querySelector('.mute-button').textContent = 'Unmute';
//     isMuted = true;
//   }
// }

function toggleMute() {
  if (isMuted) {
    video.muted = false;
    document.querySelector('.circle').innerHTML = '<i class="material-icons" style="font-size:36px; color: white;">volume_off</i>';
    isMuted = false;
  } else {
    video.muted = true;
    document.querySelector('.circle').innerHTML = '<i class="material-icons" style="font-size:36px; color: white;">volume_up</i>';
    isMuted = true;
  }
}

// function toggleRecord() {
//   if (isRecording) {
//     mediaRecorder.stop();
//     document.querySelector('.record-button').textContent = 'Record';
//     isRecording = false;
//   } else {
//     recordedChunks = [];
//     mediaRecorder.start();
//     document.querySelector('.record-button').textContent = 'Stop';
//     isRecording = true;
//   }
// }

// function handleDataAvailable(event) {
//   if (event.data.size > 0) {
//     recordedChunks.push(event.data);
//   }
  
//   if (!isRecording) {
//     saveRecording();
//   }
// }

// function saveRecording() {
//   var blob = new Blob(recordedChunks, { type: 'video/webm' });
//   var url = URL.createObjectURL(blob);

//   var a = document.createElement('a');
//   a.href = url;
//   a.style.display = 'none';
//   a.download = 'recording.mp4';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

function toggleRecord() {
  if (isRecording) {
    mediaRecorder.stop();
    document.querySelector('.circle').innerHTML = '<i class="material-icons" style="font-size:36px; color: white;">videocam</i>';
    isRecording = false;
  } else {
    startRecording();
    document.querySelector('.circle').innerHTML = '<i class="material-icons" style="font-size:36px; color: red;">stop</i>';
    isRecording = true;
  }
}

function startRecording() {
  recordedChunks = [];
  var options = { mimeType: 'video/webm' };
  try {
    mediaRecorder = new MediaRecorder(video.srcObject, options);
  } catch (error) {
    console.error('Error creating MediaRecorder:', error);
    return;
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }

  if (!isRecording) {
    saveRecording();
  }
}

function saveRecording() {
  var blob = new Blob(recordedChunks, { type: 'video/mp4' });
  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.href = url;
  a.style.display = 'none';
  a.download = 'recording.mp4';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
