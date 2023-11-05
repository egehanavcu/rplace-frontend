export default function ColorBox({
  index,
  color,
  hoveredColor,
  setHoveredColor,
}) {
  const hexToRgb = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
  };

  return (
    <div
      id={`color-${index}`}
      className="flex-1 w-16 h-8 transition-colors cursor-pointer border"
      style={{
        backgroundColor:
          color === hoveredColor
            ? `rgba(${hexToRgb(color.toString(16))}, 0.3)`
            : `#${color.toString(16)}`,
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
