import React from "react";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import VideoJS from "./VideoJS";
import videojs from "video.js";

const VideoPreview = ({
	lessonId = "5fdf7858-745a-4916-a2b2-f11b0b170c36",
	indexFile = "index.m3u8",
}) => {
	const params = useParams();
	console.log(params);
	const videoURL = `http://localhost:8000/uploads/courses/${lessonId}/${indexFile}`;
	// const [videoURL, setVideoURL] = useState("");
	const [loading, setLoading] = useState(videoURL == "" ? true : false);
	const playerRef = useRef(null);
	const videoJsOptions = {
		autoplay: false,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: videoURL,
				type: "application/x-mpegURL",
			},
		],
	};
	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on("waiting", () => {
			videojs.log("player is waiting");
		});

		player.on("dispose", () => {
			videojs.log("player will dispose");
		});
	};
	if (loading) {
		return <div className="loader"></div>;
	}
	return (
		<>
			<div>
				<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
			</div>
		</>
	);
};

export default VideoPreview;
