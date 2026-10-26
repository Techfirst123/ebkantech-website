import { Link } from "react-router-dom";

/** Slim top bar for the inner pages (category and product pages). */
export default function TopBar() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/">
          <img className="mark" src="/ebkan-tech-logo.png" alt="Ebkan Tech logo" />
          <span className="brand-text">
            Ebkan Tech <small>/ industry ERP</small>
          </span>
        </Link>
        <nav className="cp-nav">
          <Link to="/products/saurya-2x">Saurya2x</Link>
          <Link to="/#products">Products</Link>
          <Link to="/#scope">All services</Link>
          <Link to="/#contact" className="btn">
            Book a demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
