module.exports = (success, message = null, data = null) => {
  if (success) {
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      message: message,
    };
  }
};
