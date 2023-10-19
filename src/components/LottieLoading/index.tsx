import React from "react";
import Lottie from "lottie-react";
import lottieLoading from "../../assets/lottie_loading.json";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

export function LottieLoad() {
  const lottieOptions = {
    animationData: lottieLoading,
    loop: true,
    autoplay: true,
  };

  return (
    <div style={containerStyle}>
      <Lottie style={{ width: 200, height: 200 }} {...lottieOptions} />
    </div>
  );
}
