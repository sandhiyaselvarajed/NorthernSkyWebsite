// Top band for inner pages: title on the left, a real site photo fading in on the right.
import Img from "../lib/Img";

export default function PageHeader({ eyebrow, title, lead, image }) {
  return (
    <header className={`page-head ${image ? "page-head--photo" : ""}`}>
      {image && (
        <div className="page-head-photo" aria-hidden="true">
          <Img name={image} alt="" eager sizes="(max-width: 760px) 100vw, 60vw" preferWidth={1600} />
        </div>
      )}
      <div className="container page-head-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}
