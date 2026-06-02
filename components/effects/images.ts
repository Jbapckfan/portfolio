/** Grayscale Picsum helper — pairs with the sulfur accent, stays off-brand
 *  from the no-purple rule. IDs below are all known-good Picsum entries. */
export const IMG = (id: number, w = 1200, h = 800) =>
  `https://picsum.photos/id/${id}/${w}/${h}?grayscale`;

export const IDS = [1015, 1016, 1018, 1024, 1036, 1039, 1047, 1057, 1059, 1062];
