export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-nebula opacity-60 blur-2xl"></div>

      <div
        className="absolute inset-0 bg-stars animate-starsFloat opacity-80"
        style={{ backgroundSize: "300px 300px" }}
      ></div>

      <div
        className="
          absolute inset-0 bg-grid
          opacity-20
          [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_70%,transparent)]
        "
      ></div>
    </div>
  );
}
