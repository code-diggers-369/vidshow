const express = require("express");
const cors = require("cors");
// img to video convert
var videoshow = require("videoshow");
// file system and static path
const path = require("path");
const fs = require("fs");
// image upload
var multer = require("multer");
// for upload img
var storageImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

var uploadImg = multer({ storage: storageImg });

// for upload audio
var storageAudio = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "audio/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".mp3");
  },
});
var uploadAudio = multer({ storage: storageAudio });

// ffmpeg path set
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
//
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// make object of express
const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/video", async (req, res, next) => {
  try {
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

    var id = `${Date.now()}-${Date.now()}-${Date.now()}`;

    await videoshow(images, videoOptions)
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

        res.download(path.join(__dirname, "video", `${id}.mp4`), (err) => {
          if (err) {
            console.log(err);
            res.json({ msg: "Something Want Wrong" });
          }

          console.log("Created");
          fs.unlinkSync(path.join(__dirname, "video", `${id}.mp4`));
        });
      });
  } catch (err) {
    res.json({ msg: "Error Occurs" });
  }
});

app.post("/upload/img", uploadImg.array("img", 5), (req, res, next) => {
  try {
    res.json({ msg: "Uploaded Done" });
  } catch (err) {
    res.json({ msg: err });
  }
});
