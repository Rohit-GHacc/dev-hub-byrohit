import Cropper from "react-easy-crop";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Crop = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const file = state?.file;
  const index = state?.index;

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // ✅ FIX: set image AFTER file is available
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  }, [file]);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const getCroppedImg = async () => {
    if (!croppedAreaPixels || !imageSrc) return;

    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      alert("Please adjust crop first");
      return;
    }

    const blob = await getCroppedImg();

    const file = new File([blob], `image0${index}`, {
      type: "image/jpeg",
    });

    navigate("/app/profile", {
      state: { croppedImage: file,index, files: state.files},
    });
  };

  // ✅ safety fallback
  if (!file) {
    return (
      <div className="h-screen flex items-center justify-center">
        No image selected
      </div>
    );
  }

  if (!imageSrc) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading image...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <div className="relative w-full max-w-md h-80">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        className="w-64 mt-4"
      />

      <button
        onClick={handleSave}
        disabled={!croppedAreaPixels}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        Save
      </button>
    </div>
  );
};

export default Crop;
