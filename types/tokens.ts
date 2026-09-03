/**
 * Design-token type helpers.
 * Import these when you need typed access to colour or spacing scales.
 */

export type ColourScale =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export type BrandPalette = 'charcoal' | 'sand' | 'cream' | 'ember' | 'sage';

export type SemanticColour =
  | 'background'
  | 'foreground'
  | 'surface'
  | 'surface-raised'
  | 'surface-sunken'
  | 'border'
  | 'border-strong'
  | 'muted'
  | 'accent'
  | 'accent-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'primary-hover'
  | 'success'
  | 'success-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'ring';

export type FontSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type Shadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';
