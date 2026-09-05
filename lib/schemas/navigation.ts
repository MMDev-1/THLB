import { z } from 'zod';

export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const MegaMenuColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(NavLinkSchema),
});

export const NavItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  megaMenu: z.array(MegaMenuColumnSchema).optional(),
  children: z.array(NavLinkSchema).optional(),
});

export const NavigationDataSchema = z.object({
  main: z.array(NavItemSchema),
  footer: z.array(
    z.object({
      title: z.string().min(1),
      links: z.array(NavLinkSchema),
    }),
  ),
});
