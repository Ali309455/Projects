pp.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userwithemail = await User.findOne({ email: email, password: password });
  if (!userwithemail) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  else if(userwithemail.password !== password){
    res.status(404).json({ success: false, message: "Incorrect password" });
    return;
  }
  const jwtToken = jwt.sign({email:userwithemail.email},process.env.JWT_SECRET);

  res.status(200).json({ success: true, message: "Login successful" , token: jwtToken});
});