/**
 * Public API surface — re-export everything consumers need.
 *
 * To swap to a real backend later, replace the implementations in each
 * module file; the function signatures stay the same so no component
 * changes are required.
 */

export {
  type CollectionFilters,
  type CollectionQuery,
  getCollection,
  getCollections,
  type PaginatedProducts,
  type SortKey,
} from './collections';
export { getAnnouncements, getNavigation } from './navigation';
export {
  getBlogPost,
  getBlogPosts,
  getPage,
  getPages,
} from './pages';
export { getProduct, getProducts, searchProducts } from './products';
export { getReviews, type PaginatedReviews } from './reviews';
