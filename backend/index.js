// packages
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { randomUUID } = require("crypto");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// file imports

// declaration
const app = express();
const PORT = process.env.PORT || 8000;
const tmpFilePath = `${__dirname}/uploads`;
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tmpFilePath);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

// middlewares
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(`uploads`));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // watch it
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// app config
app.post("/upload", upload.single("video"), async (req, res) => {
	try {
		const videoFile = req.file;
		const outputDIR = `${__dirname}/uploads/.chunks/`;

		// const outputDIR = ".chunks/";
		// :Pending
		// const fileName = `${randomUUID()}.${req.files.}`;

		if (!videoFile) {
			throw new Error({
				message: "File Not Received!",
			});
		}

		const lessonId = randomUUID();
		const outputPath = `./uploads/courses/${lessonId}`;
		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath, { recursive: true });
		}
		const videoPath = videoFile.path;
		const hlsPath = `${outputPath}/index.m3u8`;
		const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 5 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

		let videoURL = "";
		const execFfmpegCommand = await new Promise((res, rej) => {
			try {
				exec(ffmpegCommand, (err, stdout, stderr) => {
					if (err) {
						throw new Error(err);
					}
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
					videoURL = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
					res({
						videoURL,
					});
				});
			} catch (err) {
				rej(err);
			}
		}).catch((err) => {
			console.log("Error Executing FFMPEG command ", err.message);
		});

		return res.json({
			message: "File received",
			success: true,
			videoDetails: videoFile,
			lessonId,
			videoURL: execFfmpegCommand.videoURL,
		});
	} catch (err) {
		return res.json({
			message: err.message || "something wrong in /upload",
			success: false,
			error: err,
		});
	}
});

app.get("/", (req, res) => {
	console.log("Request  is success");
	return res.json({
		message: "Success ",
		success: true,
		uuid: randomUUID(),
		path: __dirname,
	});
});

app.listen(PORT, () => {
	console.log("Server Running on " + PORT);
});
