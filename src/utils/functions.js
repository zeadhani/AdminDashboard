export const checkCount = (items) => {
  let result = { check: false, index: null };
  for (var i = 0; i < items.length; i++) {
    if (items[i].count === "" || items[i].count === null) {
      result.check = true;
      result.index = i;
      break;
    }
  }
  return result;
};

export const sendAttr = (item) => {
  let attr = {};
  item.ProductAttributesValues.map((single) => {
    attr[single.attribute.name] = single.value;
  });
  return attr;
};
export const handleTitleClick = (navigate, des) => {
  navigate("/" + des);
};
