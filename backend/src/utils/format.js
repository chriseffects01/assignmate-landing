export const formatValidation = errors => {
  if (!errors || errors.issues) {
    return 'Validation failed, Invalid User input';
  }

  if (Array.isArray(errors.issues)) {
    return errors.issues.map(i => i.message).join(',');
  }
  return JSON.stringify(errors);
};
