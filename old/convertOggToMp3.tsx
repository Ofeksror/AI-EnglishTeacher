/*
// Import the 'ffmpeg.wasm' library
import * as ffmpeg from '@ffmpeg/ffmpeg';

const ffmpegInstance = ffmpeg.createFFmpeg({ log: true });

async function convertOggToMp3(oggBlob: Blob): Promise<Blob> {
  // Initialize the FFmpeg instance
  await ffmpegInstance.load();

  // Write the Ogg blob to the FFmpeg instance's virtual file system
  const oggFilename = 'input.ogg';
  const oggArrayBuffer = await oggBlob.arrayBuffer();
  const oggUint8Array = new Uint8Array(oggArrayBuffer);
  await ffmpegInstance.FS('writeFile', oggFilename, oggUint8Array);

  // Run the FFmpeg command to convert the Ogg file to an MP3 file
  const mp3Filename = 'output.mp3';
  await ffmpegInstance.run('-i', oggFilename, '-acodec', 'libmp3lame', mp3Filename);

  // Read the MP3 file from the virtual file system as a blob
  const mp3Buffer = await ffmpegInstance.FS('readFile', mp3Filename);
  const mp3Blob = new Blob([mp3Buffer], { type: 'audio/mp3' });

  // Return the MP3 blob
  return mp3Blob;
}
*/

async function convertOggToMp3(oggBlob: Blob): Promise<Blob> {
  // Create a FormData object to send the Ogg file to the server
  const formData = new FormData();
  formData.append('file', oggBlob);

  // Send the Ogg file to the server and wait for the conversion to complete
  const response = await fetch('/convert', {
    method: 'POST',
    body: formData
  });
  const mp3Blob = await response.blob();

  // Return the MP3 blob
  return mp3Blob;
}

export default convertOggToMp3;