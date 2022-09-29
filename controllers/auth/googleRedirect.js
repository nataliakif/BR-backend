const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  FRONTEND_URL,
} = process.env;

const { User } = require("../../models/user");

const { Session } = require("../../models/sessionModel");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);

  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  // const validateUserData = userData.data.email;
  // if (!validateUserData) {
  //   throw RequestError(
  //     403,
  //     "You should register from front-end first (not postman)"
  //   );
  // }
  const { email, name } = userData.data;
  const user = await User.findOne({ email });
  if (!user) {
    await User.create({
      name,
      email,
      verify: true,
      verificationToken: " ",
    });
  }
  const userNew = await User.findOne({ email });
  const newSession = await Session.create({
    uid: userNew._id,
  });
  // const { access_token } = tokenData.data;

  const payload = {
    uid: userNew._id,
    sid: newSession._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "30d",
  });

  return res.redirect(
    `${FRONTEND_URL}?accessToken=${token}$name=${name}&email=${email}&refreshToken=${refreshToken}&sid=${newSession._id}`
  );
};
module.exports = googleRedirect;
