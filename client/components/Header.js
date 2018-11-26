import Link from "next/link";
import { withRouter } from "next/router";

const Header = ({ router: { pathname } }) => (
  <header>
    <Link prefetch href="/">
      <a className={pathname === "/" ? "is-active" : ""}>ACME Reservations</a>
    </Link>
    {false && (
      <Link prefetch href="/page2">
        <a className={pathname === "/page2" ? "is-active" : ""}>Page 2</a>
      </Link>
    )}
    {false && (
      <Link prefetch href="/page3">
        <a className={pathname === "/page3" ? "is-active" : ""}>Page 3</a>
      </Link>
    )}
    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
);

export default withRouter(Header);
