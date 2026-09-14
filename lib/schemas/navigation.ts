import { z } from 'zod';

export const AnnouncementSchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
  bgColor: z.string().min(1),
});

export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const MegaMenuColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(NavLinkSchema),
});

export const MegaMenuPromoSchema = z.object({
  image: z.string().min(1),
  title: z.string().min(1),
  href: z.string().min(1),
  badge: z.string().min(1).optional(),
});

export const MegaMenuDataSchema = z.object({
  columns: z.array(MegaMenuColumnSchema),
  promos: z.array(MegaMenuPromoSchema).optional(),
});

export const NavItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  megaMenu: MegaMenuDataSchema.optional(),
  children: z.array(NavLinkSchema).optional(),
});

export const NavigationDataSchema = z.object({
  announcements: z.array(AnnouncementSchema),
  main: z.array(NavItemSchema),
  footer: z.array(
    z.object({
      title: z.string().min(1),
      links: z.array(NavLinkSchema),
    }),
  ),
});
