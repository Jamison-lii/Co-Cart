const handleSubmit = async (e) => {
  e.preventDefault();
  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }
  setError("");

  const formDataToSend = new FormData();
  formDataToSend.append("email", formData.email);
  formDataToSend.append("password", formData.password);

  if (!isLogin) {
    formDataToSend.append("name", formData.name);
    formDataToSend.append("password_confirmation", formData.password_confirmation);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("address", formData.address);

    if (formData.profile_pic) {
      formDataToSend.append("profile_pic", formData.profile_pic);
    }
  }

  const url = isLogin
    ? "https://rrn24.techchantier.com/buy_together/public/api/login"
    : "https://rrn24.techchantier.com/buy_together/public/api/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formDataToSend,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.data.user)); // Store user safely
      localStorage.setItem("token", data.data.token);
      toast.success("Success");
      navigate("/"); // Redirect to Home Page after successful login or register
    } else {
      setError(data.message || "Login failed");
      toast.error("Failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setError("Something went wrong. Try again.");
  }
};