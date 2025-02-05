# ChunkFlix

This app is only to learn about how the video fetches from the frontend at each time line similar to youtube
where the video comes in segments not loaded fully to save the network usage and fetches the required frames
if all frames are loaded then no other request will send to the backend for segments.

## Tech Stack

- VideoPlayer : videojs
- Backend : Express
- Frontend : Vite with React

## Tools

Postman - API handling and Checking responses

## Topics Learned

1. **HLS FORMAT**

   - protocol developed by apple to easily stream on web using chunks of media data transfer
   - If the transfer speed is slow in mobile then stream will be low quality other wise it will adjust it self to the best quality if the speed is good only if the file is converted into different quality formats like (1080p, 720p, 360p)

2. **FILE conversion in Segments**

   - Using FFMPEG tool or package available for linux, win and mac.
   - Powerful tool to convert any video format to other format or Can convert any video to different frames with different extensions

3. **VideoJS**

   - Used to display the index.i3u8 file to render in chunks of segements[00*].ts files
   - Video player which can display any static video file or i3u8 extension to display HLS format file in chunks served from backend statically.

4. **Multer**

   - nodejs application to handle **multipart/form-data** types of information send in a request.
   - Used to store the files coming from the request to the server on specified folder.
   - [Multer Docs](https://www.geeksforgeeks.org/multer-npm/)

---

### Features To Implement in Future

- [ ] Login / Signup dashboard
- [ ] User Profile
- [ ] Uploading Video Files with Video Details
- [ ] Live Streaming Using MPEG DASH or HLS Protocol
