const toHexWithLeadingZeros = (number) => {
  let hexString = number.toString(16);
  while (hexString.length < 6) {
    hexString = "0" + hexString;
  }
  return hexString;
};

export default function ColorBox({
  index,
  color,
  hoveredColor,
  setHoveredColor,
}) {
  return (
    <div
      id={`color-${index}`}
      className="flex-1 w-16 h-8 transition-opacity cursor-pointer border"
      style={{
        backgroundColor: `#${toHexWithLeadingZeros(color)}`,
        opacity: color === hoveredColor ? 0.3 : 1,
      }}
      onMouseEnter={() => {
        setHoveredColor(color);
      }}
      onMouseLeave={() => {
        setHoveredColor(null);
      }}
    ></div>
  );
}
