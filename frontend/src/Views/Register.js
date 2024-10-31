import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for the confirm password
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // setError('');

        // if (password !== confirmPassword) {
        //     setError("Passwords do not match."); // Set error if passwords don't match
        //     return; // Prevent form submission
        // }

        // const userData = { userName, password, fullname, email, phoneNumber, birthday };

        // try {
        //     const response = await axios.post(register, userData);
        //     console.log('Registration successful:', response.data);
        //     navigate('/verify', { state: { email: email } });
        // } catch (error) {
        //     setError(error.response?.data.error || "An unexpected error occurred."); // Set error message from response
        // }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex justify-center items-center">
            <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md transition-transform ${isFocused ? 'transform scale-105' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">Đăng ký tài khoản</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {/* Loop through input fields */}
                    {[
                        { label: 'Tài khoản', type: 'text', value: userName, setValue: setUserName },
                        { label: 'Họ tên', type: 'text', value: fullname, setValue: setFullName },
                        { label: 'Email', type: 'email', value: email, setValue: setEmail },
                        { label: 'Số điện thoại', type: 'tel', value: phoneNumber, setValue: setPhoneNumber },
                        { label: 'Ngày sinh', type: 'date', value: birthday, setValue: setBirthday, id: 'birthday' },
                        { label: 'Mật khẩu', type: passwordShown ? 'text' : 'password', value: password, setValue: setPassword, isPassword: true },
                        { label: 'Nhập lại mật khẩu', type: passwordShown ? 'text' : 'password', value: confirmPassword, setValue: setConfirmPassword, isPassword: true },
                    ].map((input, index) => (
                        <div key={index} className="mt-6">
                            <label className="block text-gray-700">{input.label}</label>
                            <div className="relative">
                                <input
                                    id={input.id}
                                    value={input.value}
                                    onChange={(e) => input.setValue(e.target.value)}
                                    required
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2"
                                    type={input.type}
                                />
                                {input.isPassword && (
                                    <FontAwesomeIcon
                                        icon={passwordShown ? FaEyeSlash : FaEye}
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-2 text-teal-500 cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="mt-10 flex justify-center">
                        <button className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 w-full">
                            Tạo tài khoản
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
