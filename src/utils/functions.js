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
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
export const handleImageUpload = (e, setimageFile, setimageFileerror) => {
  setimageFileerror("");
  setimageFile(null);
  const file = e.target.files[0];

  if (!SUPPORTED_FORMATS.find((type) => type === file.type)) {
    setimageFileerror("Not Supported file type");
    return;
  }
  setimageFile(file);
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
