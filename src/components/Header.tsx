import breadCrumpSeparator from "@/assets/breadcrumb-separator.svg";
import { usePageData } from "@/router/layout/PageData";
import { Link } from "react-router";

function Header({ className }: { className?: string }) {
  const { pageTitle, pageBreadcrumbs, href } = usePageData();

  const separator = <img className="size-4" src={breadCrumpSeparator} alt="" />;

  return (
    <div className={className}>
      <ol
        className="flex items-center gap-4 text-xl font-medium"
        aria-label="Breadcrumb"
      >
        <li>
          <Link
            className="hover:text-muted-foreground focus:text-muted-foreground dark:focus:text-muted-foreground flex items-center gap-4 focus:outline-none"
            to="/"
          >
            Projects
            {separator}
          </Link>
        </li>
        {pageBreadcrumbs &&
          pageBreadcrumbs.map((item, index) => (
            <li key={`${item.path}${index}`}>
              {item.path ? (
                <Link
                  className="hover:text-muted-foreground focus:text-muted-foreground dark:focus:text-muted-foreground flex items-center gap-4 focus:outline-none"
                  to={item.path}
                >
                  {item.title}
                  {separator}
                </Link>
              ) : (
                <p className="text-muted-foreground flex items-center gap-4">
                  {item.title}
                  {separator}
                </p>
              )}
            </li>
          ))}
        <li>
          {href ? (
            <Link to={href} className="text-muted-foreground">
              {pageTitle}
            </Link>
          ) : (
            <p className="text-muted-foreground">{pageTitle}</p>
          )}
        </li>
      </ol>
    </div>
  );
}

export default Header;
