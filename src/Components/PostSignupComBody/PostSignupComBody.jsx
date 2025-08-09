import React from 'react'
import axios from 'axios';
import "./PostSignupComBody.css"

const PostSignupComBody = () => {
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName.trim() || !email.trim()) {
      return alert("Company name and email are required.");
    }

    const formData = new FormData();
    formData.append("companyName", companyName.trim());
    formData.append("email", email.trim());
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("description", description);
    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/post-signup-com/add-info",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(res.data.message);
        window.location.href = "http://localhost:5173/HomeCom";
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Failed to add company information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='postSignupComBody'>
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit} className='postSignupForm'>
        <div className="pictureSec">
          <input
            name='companyLogo'
            type='file'
            onChange={handleFileChange}
          />
          <hr />
        </div>
        <div className="inputSec">
          <input
            type="text"
            placeholder='Company Name'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input type="text" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder='District' value={district} onChange={(e) => setDistrict(e.target.value)} />
        </div>
        <div className="textBoxSec">
          <textarea cols={60} rows={10} placeholder='Company Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <button type="submit" disabled={loading}>{loading ? "Loading..." : "Get Started"}</button>
        </div>
      </form>
    </div>
  )
}
export default PostSignupComBody;