// import React, { useState, useCallback, useRef, useEffect } from "react";
// import ReactCrop from "react-image-crop";

// // css
// import "react-image-crop/dist/ReactCrop.css";
// import "./App.css";

// function generateDownload(canvas, crop) {
//   if (!crop || !canvas) {
//     return;
//   }

//   canvas.toBlob(
//     (blob) => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement("a");
//       anchor.download = "cropPreview.png";
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     "image/png",
//     1
//   );
// }

// function App() {
//   return (
//     <div className="App container-fluid ">
//       <h1 className="text-center mb-4">VidShow</h1>
//       <div className="center-div text-light">
//         <SelectImages />
//       </div>
//     </div>
//   );
// }

// function SelectImages() {
//   const [upImg, setUpImg] = useState();
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 12 / 9 });
//   const [completedCrop, setCompletedCrop] = useState(null);

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener("load", () => setUpImg(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const onLoad = useCallback((img) => {
//     imgRef.current = img;
//   }, []);

//   useEffect(() => {
//     if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
//       return;
//     }

//     const image = imgRef.current;
//     const canvas = previewCanvasRef.current;
//     const crop = completedCrop;

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext("2d");
//     const pixelRatio = window.devicePixelRatio;

//     canvas.width = crop.width * pixelRatio;
//     canvas.height = crop.height * pixelRatio;

//     ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//     ctx.imageSmoothingQuality = "high";

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
//   }, [completedCrop]);

//   return (
//     <div>
//       <div class="input-group">
//         <div class="form-control">
//           <input
//             type="file"
//             class="custom-file-input"
//             id="inputGroupFile01"
//             aria-describedby="inputGroupFileAddon01"
//             multiple
//             accept="image/*"
//             onChange={onSelectFile}
//           />
//           <label class="custom-file-label" for="inputGroupFile01">
//             Choose Files
//           </label>
//         </div>
//       </div>

//       <ReactCrop
//         src={upImg}
//         onImageLoaded={onLoad}
//         crop={crop}
//         onChange={(c) => setCrop(c)}
//         onComplete={(c) => setCompletedCrop(c)}
//       />
//       <div>
//         <canvas
//           ref={previewCanvasRef}
//           // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
//           style={{
//             width: Math.round(completedCrop?.width ?? 0),
//             height: Math.round(completedCrop?.height ?? 0),
//           }}
//         />
//       </div>

//       <button
//         type="button"
//         disabled={!completedCrop?.width || !completedCrop?.height}
//         onClick={() =>
//           generateDownload(previewCanvasRef.current, completedCrop)
//         }
//       >
//         Download cropped image
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import MultiImageInput from "react-multiple-image-input";

function App() {
  const crop = {
    unit: "%",
    aspect: 4 / 3,
    x: 130,
    y: 50,
    width: 200,
    height: 200,
  };

  const [images, setImages] = useState({});

  console.log(images);
  return (
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
      theme="light"
    />
  );
}

export default App;
