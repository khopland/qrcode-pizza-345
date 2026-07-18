import {createImageUrlBuilder} from '@sanity/image-url';
import {sanityConfig} from './config';
import type {MenuImage, SanityImageSource} from './types';

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId || 'your-project-id',
  dataset: sanityConfig.dataset,
});

export function getSanityImageDimensions(source: SanityImageSource) {
  const dimensions = source.asset?.metadata?.dimensions;
  if (!dimensions) return undefined;
  const crop = source.crop || {top: 0, bottom: 0, left: 0, right: 0};
  return {
    width: Math.max(1, Math.round(dimensions.width * (1 - crop.left - crop.right))),
    height: Math.max(1, Math.round(dimensions.height * (1 - crop.top - crop.bottom))),
  };
}

export function getSanityImageProps(item: MenuImage) {
  if (!item.image?.asset?._id) return undefined;
  const dimensions = getSanityImageDimensions(item.image);
  if (!dimensions) return undefined;
  return {
    src: builder.image(item.image).width(dimensions.width).fit('max').url(),
    width: dimensions.width,
    height: dimensions.height,
    lqip: item.image.asset.metadata?.lqip,
  };
}
