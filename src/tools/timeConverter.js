// ISOLocalTimeConverter converts UTC unix timestamp to ISO formatted local time to minutes.
// ISO format time example : 2022-12-20T07:29:26.973Z
// ISOLocalTimeConverter return example: 2022-12-20T07:29
export const ISOLocalTimeConverter = (unixTimestamp) => {
  const localTimestamp = unixLocalTimeConverter(unixTimestamp);
  return new Date(localTimestamp).toISOString().slice(0, -8);
};

// unixTimeConverter converts ISO formatted local time to local unix timestamp.
export const unixTimeConverter = (ISOTimestamp) => {
  const unixTimestamp = new Date(ISOTimestamp).getTime();
  return unixLocalTimeConverter(unixTimestamp);
};

// unixLocalTimeConverter converts UTC unix timestamp to local unix timestamp.
export const unixLocalTimeConverter = (unixTimestamp) => {
  const localTimeOffset = new Date().getTimezoneOffset() * 60000;
  const localTimestamp = unixTimestamp - localTimeOffset;
  return localTimestamp;
};
