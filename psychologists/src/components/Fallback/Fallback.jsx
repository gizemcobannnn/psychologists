import { RingLoader } from "react-spinners";

export default function Fallback() {
  // Yükleme durumunu ve renk ayarını burada belirleyebilirsin
  const color = "#36d7b7";
  const loading = true;
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // ekranın tamamında ortalamak için
      }}
    >
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
