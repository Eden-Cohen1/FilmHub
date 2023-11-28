export const shortenNumber = (number) => {
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (number >= billion) {
    return (number / billion).toFixed(1) + "B";
  } else if (number >= million) {
    return (number / million).toFixed(1) + "M";
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};

export const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
};

export const sliceHeadline = (headline) => {
  const newHead = headline.split(":");
  if (headline?.length < 30 || newHead.length === 1) {
    return headline;
  }
  return newHead[0];
};
