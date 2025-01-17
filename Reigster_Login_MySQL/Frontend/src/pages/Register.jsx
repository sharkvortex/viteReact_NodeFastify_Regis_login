import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  // Title
  const pageTitle = "Register";
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // Toggle Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Object Form
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Error Message
  const [errors, setErrors] = useState({});

  // Onchange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      agreeToTerms: e.target.checked,
    });
  };

  // Loading
  const [loading, setLoading] = useState(false);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.firstname)
      validationErrors.firstname = "First name is required";
    if (!formData.lastname) validationErrors.lastname = "Last name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms)
      validationErrors.agreeToTerms = "You must agree to the terms";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      toast.error("Please fill in all required fields and correct the errors.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/register", formData);

      if (response.status === 201) {
        toast.success("Registration Successfully");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });

        setTimeout(() => {
          document.location.href = "/login";
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";
      console.error("Error:", error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-slate-800">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm text-center text-slate-400">
            Sign up now to get started
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="John"
                className="w-full text-sm px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full text-sm px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full text-sm px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full text-sm px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full text-sm px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-200 placeholder:text-slate-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800/50 text-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
            />
            <label className="ml-2 text-sm text-slate-400">
              I agree to the{" "}
              <Link
                to="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                tabIndex={-1}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                tabIndex={-1}
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
          )}

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
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>

    </div>
  );
}
