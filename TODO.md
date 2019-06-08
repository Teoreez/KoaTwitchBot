var videoElement = document.getElementById('id_of_the_video_element_here');
videoElement.pause();
videoElement.removeAttribute('src'); // empty source
videoElement.load();

https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element