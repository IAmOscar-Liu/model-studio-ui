import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface PageLink {
  title: string;
  path?: string;
}

export interface PageDataContextModel {
  pageTitle?: string;
  setPageTitle: (_title: string) => void;
  pageDescription?: string;
  setPageDescription: (_description: string) => void;
  pageBreadcrumbs?: Array<PageLink>;
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void;
  href?: string;
  setHref: (_href: string) => void;
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setHref: (_href) => {},
});

export function PageDataProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [pageDescription, setPageDescription] = useState<string>("");
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([]);
  const [href, setHref] = useState<string>("");

  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    href,
    setHref,
  };
  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
}

export function usePageData() {
  return useContext(PageDataContext);
}

// type Props = {
//   description?: string;
//   title?: ReactNode;
//   breadcrumbs?: Array<PageLink>;
// };

export function PageTitle({
  title,
  children,
  description,
  breadcrumbs,
  href,
}: {
  description?: string;
  title?: string;
  breadcrumbs?: Array<PageLink>;
  children?: ReactNode;
  href?: string;
}) {
  const { setPageTitle, setPageDescription, setPageBreadcrumbs, setHref } =
    usePageData();
  useEffect(() => {
    if (title) {
      setPageTitle(title.toString());
    }
    if (children) {
      setPageTitle(children.toString());
    }
    if (href) {
      setHref(href);
    }
    return () => {
      setPageTitle("");
      setHref("");
    };
  }, [children]);

  useEffect(() => {
    if (description) {
      setPageDescription(description);
    }
    return () => {
      setPageDescription("");
    };
  }, [description]);

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs);
    }
    return () => {
      setPageBreadcrumbs([]);
    };
  }, [breadcrumbs]);

  return <></>;
}

export function PageDescription({ children }: { children: ReactNode }) {
  const { setPageDescription } = usePageData();
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString());
    }
    return () => {
      setPageDescription("");
    };
  }, [children]);
  return <></>;
}
