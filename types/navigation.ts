/**
 * Navigation & mega-menu types.
 */

export interface Announcement {
  text: string;
  href: string;
  bgColor: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface MegaMenuPromo {
  /** Placeholder path — real images will replace this later */
  image: string;
  title: string;
  href: string;
  badge?: string;
}

export interface MegaMenuData {
  columns: MegaMenuColumn[];
  promos?: MegaMenuPromo[];
}

export interface NavItem {
  label: string;
  href: string;
  /** If present, this nav item opens a mega-menu dropdown */
  megaMenu?: MegaMenuData;
  /** Simple sub-links (used for mobile nav when no megaMenu) */
  children?: NavLink[];
}

export interface Navigation {
  /** Rotating promo messages for the announcement bar */
  announcements: Announcement[];
  /** Primary header links */
  main: NavItem[];
  /** Footer column groups */
  footer: { title: string; links: NavLink[] }[];
}
