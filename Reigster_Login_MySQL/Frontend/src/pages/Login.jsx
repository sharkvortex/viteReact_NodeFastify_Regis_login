import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";

export default function Login() {
  // Title
  const pageTitle = "Login";
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // Toggle Password
  const [showPassword, setShowPassword] = useState(false);
  
  // FormData
  const [formData , setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  })
  
  // Onchange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset Error
    setErrors((prevErrors) => ({
    ...prevErrors,
    [e.target.name]: undefined,
  }));
  };

  // Remember checked
  const handleRemember = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  // Error Message
  const [errors, setErrors] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  // Form Submit
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username)
      validationErrors.username = "Username is required";
    if (!formData.password) 
      validationErrors.password = "Password is required";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields and correct the errors.");
      return; 
    }

    try{
      setLoading(true);
      const response = await axios.post('/api/login' , formData);

      if(response.status === 200){
        toast.success("Login Success !...");

        setTimeout(() => {
          document.location.href='/'
        }, 2500);
        setFormData({
          username: '',
          password: '',
          rememberMe: false 
        });
      }else{
        toast.error(response.data.message || 'Something went wrong. Try again later.');
      }
    }catch(error){
      const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
      console.error("Error:", error);
      toast.error(errorMessage);
      
    }finally{
      setLoading(false);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/50  rounded-2xl shadow-xl p-8 border border-slate-800">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-sm text-center text-slate-400">
            Login to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username or Email"
                className="w-full  px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500"
                onChange={handleChange}
                value={formData.username}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500 pr-12"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleRemember}
                className="checkbox w-4 h-4 rounded  text-blue-500 "
              />
              <span className="text-sm text-slate-300">Remember me</span>
            </label>
            <Link
              to="#"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
           {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-8">
          Don&#39;t have an account?
          <Link
            to="/register"
            className="text-blue-400 mx-2 hover:text-blue-300 transition-colors font-medium"
          >
            Create account
          </Link>
        </p>
      </div>
      
    </div>
  );
}

