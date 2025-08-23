import { type FC, useEffect, useState } from "react";
import { useCenterOnHorizontalScroll } from "@/hooks/useCenterOnHorizontalScroll.ts";

const NAV_ITEMS: ReadonlyArray<{ href: `#${string}`; label: string }> = [
  { href: "#text_field_examples", label: "Text" },
  { href: "#select_field_examples", label: "Select" },
  { href: "#upload_multiple_files_examples", label: "MultipleFiles" },
  { href: "#date_field_examples", label: "Date" },
  { href: "#range_field_examples", label: "Range" },
  { href: "#checkbox_field_examples", label: "Checkbox" },
  { href: "#radio_field_examples", label: "Radio" },
  { href: "#switch_field_examples", label: "Switch" },
  { href: "#upload_area_examples", label: "UploadArea" },
  { href: "#header_examples", label: "Header" },
  { href: "#badge_examples", label: "Badge" },
  { href: "#button_examples", label: "Button" },
  { href: "#loader_examples", label: "Loader" },
] as const;

export const ComponentsNavItemsList: FC<{
  disableActive?: boolean;
}> = ({ disableActive = true }) => {
  const centerOnClick = useCenterOnHorizontalScroll();
  const [activeHash, setActiveHash] = useState<string>(
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash
      : (NAV_ITEMS[0]?.href ?? ""),
  );

  useEffect(() => {
    if (!disableActive) return;
    const onHashChange = () => setActiveHash(window.location.hash || NAV_ITEMS[0]?.href || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [disableActive]);

  return (
    <>
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive = activeHash === href;
        if (disableActive && isActive) {
          return (
            <span
              key={href}
              aria-current="page"
              className="examples-nav__item examples-nav__item--active"
            >
              {label}
            </span>
          );
        }

        return (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              setActiveHash(href);
              centerOnClick(e);
            }}
            className="examples-nav__item"
          >
            {label}
          </a>
        );
      })}
    </>
  );
};
