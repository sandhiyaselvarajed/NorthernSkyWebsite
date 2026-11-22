import { picture } from "./images";

/** Responsive image. `sizes` tells the browser how wide it will be shown. */
export default function Img({ name, alt, sizes = "100vw", className, eager = false, preferWidth }) {
  const { src, srcSet } = picture(name, preferWidth);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={eager ? "high" : undefined}
    />
  );
}
