import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaPlusSquare, FaTrash, FaEdit, FaCopy, FaGithub } from "react-icons/fa";
import { showSuccess, showError, showInfo, showWarn } from '../utils/toast';
import { useTheme } from '../context_api/ThemeContext';
import { Link } from 'react-router-dom';


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
        if (!form.website || !form.name || !form.password) return showWarn("Enter Information");

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
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080C17]' : 'bg-[#e8f5ee]'}`}
            style={isDark ? {
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            } : {
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}>

            {/* ── Page body grows to push footer down ── */}
            <div className="flex-1">

                {/* Main Content */}
                <div className="max-w-3xl mx-auto pt-10 px-4">

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {"<"}Pass<span className="text-green-500">OP</span>{"/>"}
                        </h1>
                        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Your own Password Manager</p>
                    </div>

                    {/* URL Input */}
                    <input
                        type="text"
                        placeholder="Enter website URL"
                        name='website'
                        value={form.website}
                        onChange={handleChange}
                        className={`w-full h-10 rounded-full border px-5 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all mb-4
                    ${isDark ? 'bg-[#0e1422] border-[#2a3350] text-gray-200 placeholder-gray-600' : 'bg-white border-green-300 text-gray-700'}`}
                    />

                    {/* Username + Password Row */}
                    <div className="flex gap-3 mb-5">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            className={`flex-1 h-10 rounded-full border px-5 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all
                        ${isDark ? 'bg-[#0e1422] border-[#2a3350] text-gray-200 placeholder-gray-600' : 'bg-white border-green-300 text-gray-700'}`}
                        />
                        <div className="relative w-48">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full h-10 rounded-full border px-5 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all
                            ${isDark ? 'bg-[#0e1422] border-[#2a3350] text-gray-200 placeholder-gray-600' : 'bg-white border-green-300 text-gray-700'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword
                                    ? <FaEyeSlash className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`} />
                                    : <FaEye className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center">
                        <button onClick={savePassword} className="flex items-center gap-2 px-7 py-2 text-sm font-semibold rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-md text-white">
                            <FaPlusSquare className="text-base animate-bounce" />
                            {editIndex !== null ? 'Edit Password' : 'Save Password'}
                        </button>
                    </div>

                </div>

                {/* ── Password Table / Empty State ── */}
                <div className="mt-10">
                    {passwordArray.length === 0 ? (
                        <div className="flex justify-center">
                            <div className={`flex items-center gap-3 px-8 py-4 rounded-3xl shadow-sm border ${isDark ? 'bg-[#0e1422] border-[#2a3350] text-gray-500' : 'bg-white border-green-200 text-gray-500'}`}>
                                <span className="text-xl">📭</span>
                                <span className="text-base font-medium">No Passwords Saved Yet</span>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto px-4 pb-10">
                            <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                Your Passwords
                            </h2>

                            <div className={`w-full overflow-x-auto rounded-xl shadow-md border ${isDark ? 'border-[#2a3350]' : 'border-green-200'}`}>
                                <table className="min-w-full text-sm border-collapse">

                                    <thead>
                                        <tr className={isDark ? 'bg-[#0f1e35] text-green-400' : 'bg-[#2e7d4f] text-white'}>
                                            <th className="py-3 px-5 text-center font-semibold tracking-wide whitespace-nowrap">Site</th>
                                            <th className="py-3 px-5 text-center font-semibold tracking-wide whitespace-nowrap">Username</th>
                                            <th className="py-3 px-5 text-center font-semibold tracking-wide whitespace-nowrap">Password</th>
                                            <th className="py-3 px-5 text-center font-semibold tracking-wide whitespace-nowrap w-28">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {passwordArray.map((p, i) => (
                                            <tr
                                                key={i}
                                                className={`border-t transition-colors duration-150 ${isDark
                                                    ? `border-[#1e2a40] ${i % 2 === 0 ? 'bg-[#0b0f1c]' : 'bg-[#0e1422]'} hover:bg-[#131929]`
                                                    : `border-green-100 ${i % 2 === 0 ? 'bg-[#f0faf4]' : 'bg-[#e6f5ec]'} hover:bg-[#d4edda]`
                                                    }`}
                                            >
                                                {/* Site */}
                                                <td className={`py-3 px-5 text-center ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                                    <div className="flex items-center justify-center gap-1.5 min-w-0">
                                                        <a
                                                            href={p.website.startsWith("http://") || p.website.startsWith("https://") ? p.website : `https://${p.website}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`hover:underline transition-colors ${isDark ? 'hover:text-green-400' : 'hover:text-green-600'}`}
                                                        >
                                                            <span className="underline truncate max-w-[160px] sm:max-w-xs md:max-w-sm block">
                                                                {p.website}
                                                            </span>
                                                        </a>
                                                        <FaCopy
                                                            onClick={() => copyFun(p.website)}
                                                            className={`shrink-0 cursor-pointer transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
                                                            title="Copy site"
                                                            size={12}
                                                        />
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                <td className={`py-3 px-5 text-center ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <span>{p.name}</span>
                                                        <FaCopy
                                                            onClick={() => copyFun(p.name)}
                                                            className={`shrink-0 cursor-pointer transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
                                                            title="Copy username"
                                                            size={12}
                                                        />
                                                    </div>
                                                </td>

                                                {/* Password */}
                                                <td className={`py-3 px-5 text-center ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <span className="font-mono">
                                                            {visibleRows[i] ? p.password : "*".repeat(p.password.length)}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleRowPassword(i)}
                                                            className={`transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
                                                            title={visibleRows[i] ? "Hide" : "Show"}
                                                        >
                                                            {visibleRows[i] ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                                                        </button>
                                                        <FaCopy
                                                            onClick={() => copyFun(p.password)}
                                                            className={`shrink-0 cursor-pointer transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
                                                            title="Copy password"
                                                            size={12}
                                                        />
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3 px-5 text-center">
                                                    <div className="flex items-center justify-center gap-4">
                                                        <FaEdit
                                                            onClick={() => editFun(p, i)}
                                                            className={`cursor-pointer transition-colors ${isDark ? 'text-green-500 hover:text-green-300' : 'text-green-600 hover:text-green-400'}`}
                                                            title="Edit"
                                                        />
                                                        <FaTrash
                                                            onClick={() => delFun(i)}
                                                            className="text-red-500 cursor-pointer hover:text-red-400 transition-colors"
                                                            title="Delete"
                                                        />
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

            </div>{/* end flex-1 */}

            {/* ── Footer always at bottom ── */}
            <footer className={`text-center py-6 text-sm flex justify-center items-center gap-2 transition-colors duration-300 ${isDark ? 'text-gray-600' : 'text-gray-600'}`}>
                <a href="https://github.com/Vahidsk18/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className={`text-base transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-900'}`} />
                </a>
                <span>Made with ❤️ — ©Vsk {new Date().getFullYear()}</span>
            </footer>

        </div>
    );
}

export default Manager