exports.handleSuccess = (res, data) => {
    res.status(200).json({ success: true, data });
  };
  
  exports.handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  };
  