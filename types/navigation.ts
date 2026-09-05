/**
 * Navigation & mega-menu types.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** If present, this nav item opens a mega-menu dropdown */
  megaMenu?: MegaMenuColumn[];
  /** Simple sub-links (used for mobile nav when no megaMenu) */
  children?: NavLink[];
}

export interface Navigation {
  /** Primary header links */
  main: NavItem[];
  /** Footer column groups */
  footer: { title: string; links: NavLink[] }[];
}
