import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaPlusSquare, FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import { showSuccess, showError, showInfo, showWarn } from '../utils/toast';
import { useTheme } from '../context_api/ThemeContext';

function Manager() {

    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [showPassword, setShowPassword] = useState(false);
    const [visibleRows, setVisibleRows] = useState({})
    const [passwordArray, setPasswordArray] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    const [form, setForm] = useState({
        website: '',
        name: '',
        password: ''
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function savePassword() {
        if (!form.website || !form.name || !form.password) return alert("Enter Information");

        let updatedArray;
        if (editIndex !== null) {
            updatedArray = [...passwordArray]
            updatedArray[editIndex] = form
            setEditIndex(null)
            showInfo("Edited Successfully")
        } else {
            updatedArray = [...passwordArray, form]
            showSuccess('Password saved successfully!')
        }

        setPasswordArray(updatedArray)
        localStorage.setItem('passwords', JSON.stringify(updatedArray))
        setForm({ website: '', name: '', password: '' })
    }

    useEffect(() => {
        let pass = localStorage.getItem('passwords')
        if (pass) setPasswordArray(JSON.parse(pass))
    }, [])

    function copyFun(password) {
        window.navigator.clipboard.writeText(password);
        showInfo('Copied to clipboard!');
    }

    function editFun(edit, index) {
        setForm({ website: edit.website, name: edit.name, password: edit.password })
        setEditIndex(index)
    }

    function delFun(index) {
        const updatedarray = passwordArray.filter((_, i) => i !== index)
        setPasswordArray(updatedarray)
        localStorage.setItem('passwords', JSON.stringify(updatedarray));
        showWarn('Password deleted!');
    }

    const toggleRowPassword = (i) => {
        setVisibleRows(prev => ({ ...prev, [i]: !prev[i] }));
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-[#e8f5ee]'}`}
            style={{ backgroundImage: 'radial-gradient(circle, #c8e6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto pt-10 px-4">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {"<"}Pass<span className="text-green-500">OP</span>{"/>"}
                    </h1>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your own Password Manager</p>
                </div>

                {/* URL Input */}
                <input
                    type="text"
                    placeholder="Enter website URL"
                    name='website'
                    value={form.website}
                    onChange={handleChange}
                    className={`w-full h-10 rounded-full border px-5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition-all mb-4
                        ${isDark ? 'bg-[#1e293b] border-gray-600 text-white placeholder-gray-500' : 'bg-white border-green-300 text-gray-700'}`}
                />

                {/* Username + Password Row */}
                <div className="flex gap-3 mb-5">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        className={`flex-1 h-10 rounded-full border px-5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition-all
                            ${isDark ? 'bg-[#1e293b] border-gray-600 text-white placeholder-gray-500' : 'bg-white border-green-300 text-gray-700'}`}
                    />
                    <div className="relative w-48">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            className={`w-full h-10 rounded-full border px-5 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-400 transition-all
                                ${isDark ? 'bg-[#1e293b] border-gray-600 text-white placeholder-gray-500' : 'bg-white border-green-300 text-gray-700'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword
                                ? <FaEyeSlash className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                : <FaEye className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            }
                        </button>
                    </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-center">
                    <button onClick={savePassword} className="flex items-center gap-2 px-7 py-2 text-sm font-semibold rounded-full bg-green-400 hover:bg-green-500 active:scale-95 transition-all shadow-md">
                        <FaPlusSquare className="text-base animate-bounce" />
                        {editIndex !== null ? 'Edit Password' : 'Add Password'}
                    </button>
                </div>

            </div>

            <br /><br />

            {passwordArray.length === 0 ? (
                <div className="flex justify-center mt-8">
                    <div className={`flex items-center gap-3 px-8 py-4 rounded-3xl shadow-sm border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-400' : 'bg-white border-green-200 text-gray-500'}`}>
                        <span className="text-xl">📭</span>
                        <span className="text-base font-medium">No Passwords Saved Yet</span>
                    </div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto px-4 pb-10">
                    <div className={`rounded-3xl shadow-md overflow-hidden border ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-green-200'}`}>
                        <h2 className={`text-center text-lg font-bold py-4 border-b ${isDark ? 'bg-[#162032] border-gray-700 text-white' : 'bg-green-50 border-green-100 text-gray-700'}`}>
                            Your Saved Passwords
                        </h2>

                        <table className="w-full text-sm table-fixed">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left font-semibold">Website</th>
                                    <th className="py-3 px-6 text-left font-semibold">Username</th>
                                    <th className="py-3 px-6 text-left font-semibold">Password</th>
                                    <th className="py-3 px-6 text-center font-semibold w-28">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((p, i) => (
                                    <tr key={i} className={`border-t ${isDark
                                        ? `border-gray-700 ${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#162032]'}`
                                        : `border-green-100 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50'}`}`}>

                                        <td className={`py-4 px-6 break-all ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{p.website}</td>
                                        <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{p.name}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {visibleRows[i] ? p.password : "••••••••••"}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleRowPassword(i)}
                                                    className="text-gray-400 hover:text-green-500 transition-colors"
                                                >
                                                    {visibleRows[i] ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-4">
                                                <FaCopy onClick={() => copyFun(p.password)} className="text-green-500 cursor-pointer hover:text-green-400" title="Copy" />
                                                <FaEdit onClick={() => editFun(p, i)} className="text-blue-500 cursor-pointer hover:text-blue-400" title="Edit" />
                                                <FaTrash onClick={() => delFun(i)} className="text-red-500 cursor-pointer hover:text-red-400" title="Delete" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Manager