export const truncateLongText = (txt, lens) => {
  const length = lens ?? 17;
  const textToTruncate = txt?.toString();

  return {
    truncatedText:
      textToTruncate?.length <= length ? textToTruncate : textToTruncate?.slice(0, length) + '...',
    originalText: textToTruncate,
    isTruncated: textToTruncate?.length > length,
  };
};

export const capitalizeTextFormat = str => {
  return str?.charAt(0).toUpperCase() + str?.toLowerCase().slice(1);
};
