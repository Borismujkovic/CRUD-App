export const truncateString = (title: string): string => {
  if (title.length > 15) {
    return `${title.slice(0, 15)}...`;
  }

  return title;
};
