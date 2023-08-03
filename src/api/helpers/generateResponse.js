module.exports = (success, data = null, message = null) => {
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
