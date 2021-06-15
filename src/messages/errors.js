export const isRequired = (field = "This field") => {
  return `${field} is required`;
};

export const isNotValid = (field = "This field") => {
  return `${field} is not valid`;
};

export const shouldBeAtLeast = (field = "This field", nChars) => {
  return `${field} should be at least ${nChars}`;
};
export const shouldBeMatch = (field = "This field") => {
  return `${field}s should be match`;
};
