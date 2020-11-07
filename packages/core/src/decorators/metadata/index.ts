import { MetadataArgsStore } from '../../interfaces/metadata-args-store';

/**
 * Gets metadata args store.
 * Metadata args store follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStore(): MetadataArgsStore {
  if (!(global as any).routeControllerMetadataStore)
    (global as any).routeControllerMetadataStore = new MetadataArgsStore();

  return (global as any).routeControllerMetadataStore;
}
