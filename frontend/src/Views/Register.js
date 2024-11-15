import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const nav = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    // Mày Chỉ Cần Sửa Cái Hàm Này Lại Là Được
    const handlelogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/loginUser", {
                account: user,
                password: pass
            });

            console.log('Response:', res.data); // In ra phản hồi từ máy chủ

            // Kiểm tra nếu đăng nhập thành công
            if (res.status === 200) {
                message.success('Login Success');
                nav('/');
            } else {
                message.error('Login failed');
            }
        } catch (error) {
            console.log('Error caught:', error);
            if (error.response) {
                console.log('Response data:', error.response.data);
                message.error(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else {
                message.error('Login failed');
            }
        }
    };
    const handleRegister = async () => {

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNV9zaW1wbGVfM2RfaWxsdXN0cmF0aW9uX29mX2FfcmVjb3Zlcnlfcm9vbV93aV80ZjhkNDIwNC02N2I4LTQwMDQtYTBlNy05YjljMjIyMzE2ZGVfMS5qcGc.jpg" alt=""
                    className="w-full h-full object-cover filter blur-sm brightness-30" />
            </div>
            <div className="relative bg-white flex flex-col justify-center w-[30%] py-3 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
                        Sign up
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 max-w">
                        Or if you have account <span onClick={() => { nav('/login') }} className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                            Login
                        </span>
                    </p>
                </div>

                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    UserName
                                </label>
                                <div className="mt-1">
                                    <input value={user} onChange={(a) => setUser(a.target.value)} id="account" name="account" type="text" autoComplete="account" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input value={user} onChange={(a) => setUser(a.target.value)} id="account" name="account" type="text" autoComplete="account" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    UserName, Email or Phone
                                </label>
                                <div className="mt-1">
                                    <input value={user} onChange={(a) => setUser(a.target.value)} id="account" name="account" type="text" autoComplete="account" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    UserName, Email or Phone
                                </label>
                                <div className="mt-1">
                                    <input value={user} onChange={(a) => setUser(a.target.value)} id="account" name="account" type="text" autoComplete="account" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input value={pass} onChange={(b) => setPass(b.target.value)} id="password" name="password" type="password" autoComplete="current-password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input value={pass} onChange={(b) => setPass(b.target.value)} id="password" name="password" type="password" autoComplete="current-password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Confirm Password" />
                                </div>
                            </div>
                            <button onClick={handleRegister}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
