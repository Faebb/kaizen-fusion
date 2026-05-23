// Default slug used for the public customer ordering flow.
// In a fully multi-tenant URL setup this would be derived from a route param
// (e.g. /r/$slug/menu). Kept centralized so it can be swapped in one place.
export const DEFAULT_PUBLIC_SLUG = "kaizen-fusion";

export const useCurrentSlug = (): string => DEFAULT_PUBLIC_SLUG;
