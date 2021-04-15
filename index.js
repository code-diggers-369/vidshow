const express = require("express");
const app = express();
var videoshow = require("videoshow");
const path = require("path");
const fs = require("fs");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

if (!fs.existsSync("video")) {
  fs.mkdirSync("video");
  console.log("Folder Is Created");
}
if (!fs.existsSync("audio")) {
  fs.mkdirSync("audio");
  console.log("Folder Is Created");
}
if (!fs.existsSync("img")) {
  fs.mkdirSync("img");
  console.log("Folder Is Created");
}

app.listen("1212", () => console.log("Server Is Connected On 1212"));

app.get("/video", (req, res, next) => {
  var images = [
    {
      path: "./img/1.jpg",
      caption: "Pretty smile is better than pretty eyes",
    },
    {
      path: "./img/2.jpg",
      caption: "Women are a beautiful miracle in life",
    },
    {
      path: "./img/3.jpg",
      caption: "Nothing will work unless you do",
    },
  ];

  var videoOptions = {
    fps: 25,
    loop: 5, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "640x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
  };

  var id = "123123";

  videoshow(images, videoOptions)
    .audio(path.join(__dirname, "audio", "audio.mp3"))
    .save(path.join(__dirname, "video", `${id}.mp4`))
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err);
      console.error("ffmpeg stderr:", stderr);

      res.json({ msg: "Something Want Wrong" });
    })
    .on("end", function (output) {
      console.error("Video created in:", output);

      res.redirect(`/download?id=${id}`);
    });
});

app.get("/download", (req, res, next) => {
  var { id } = req.query;
  res.download(path.join(__dirname, "video", `${id}.mp4`));
});
