import {defineQuery} from 'groq';

const menuProjection = `{
  _id,
  _type,
  routeKey,
  title,
  enabled,
  unavailableMessage,
  images[]{
    _key,
    altText,
    caption,
    image{
      _type,
      crop,
      hotspot,
      asset->{
        _id,
        metadata{lqip, dimensions{width, height, aspectRatio}}
      }
    }
  }
}`;

export const MENU_BY_KEY_QUERY = defineQuery(
  `*[_type == "menuPage" && routeKey == $routeKey][0]${menuProjection}`,
);

export const ALL_MENUS_QUERY = defineQuery(
  `*[_type == "menuPage" && routeKey in ["carta", "bebidas", "daily", "holiday"]]${menuProjection}`,
);
