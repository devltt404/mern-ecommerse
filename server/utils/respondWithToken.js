export default ({ user, res }) => {
  const token = user.generateToken();
  res
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .status(200)
    .json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      cart: user.cart,
    });
};
