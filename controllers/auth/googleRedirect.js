const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } =
  process.env;
const { User } = require("../../models/user");

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

  const { email, name, id } = userData.data;
  // const { access_token } = tokenData.data;
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const user = await User.findOne({ email });
  if (!user) {
    await User.create({
      name,
      email,
      token,
    });
  }
  await User.findOneAndUpdate({ email }, { token });
  return res
    .status(200)
    .json({
      status: "success",
      code: 200,
      data: {
        email,
        token,
      },
    })
    .redirect(`${BASE_URL}?accessToken=${token}`);
};
module.exports = googleRedirect;
