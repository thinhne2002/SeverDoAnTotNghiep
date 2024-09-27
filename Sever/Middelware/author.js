function authorize(roles = []) {
    if (typeof roles === 'string') {
      roles = [roles];
    }
    return (req, res, next) => {
      const user = req.user;  // Dữ liệu user được gán sau khi đăng nhập thành công
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    };
  }
  