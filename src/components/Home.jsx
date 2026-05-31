import React from 'react'
import { FaLock, FaShieldAlt, FaBolt, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTheme } from '../context_api/ThemeContext'

function Home() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-[#e8f5ee]'}`}
            style={isDark ? {
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            } : {
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.09) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}
        >

            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
                <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {"<"}Pass<span className="text-green-500">OP</span>{"/>"}
                </h1>
                <p className={`text-base mb-8 max-w-xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your personal password manager — store, manage and access all your passwords securely in one place.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/manager"
                        className="px-7 py-2.5 text-sm font-semibold rounded-full bg-green-400 hover:bg-green-500 active:scale-95 transition-all shadow-md"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div id="features" className="max-w-4xl mx-auto px-6 py-10">
                <h2 className={`text-center text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    Why PassOP?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {[
                        { icon: <FaLock className="text-green-500 text-xl" />, title: 'Secure Storage', text: 'All your passwords are stored locally on your device. No cloud, no leaks.' },
                        { icon: <FaShieldAlt className="text-green-500 text-xl" />, title: 'Privacy First', text: 'We never collect or share your data. Your passwords stay yours, always.' },
                        { icon: <FaBolt className="text-green-500 text-xl" />, title: 'Fast & Simple', text: 'Clean UI, instant access. Add, edit, copy and delete passwords in seconds.' },
                    ].map((item, i) => (
                        <div key={i} className={`rounded-2xl border shadow-sm p-6 text-center transition-colors duration-300 ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-green-200'}`}>
                            <div className="flex justify-center mb-3">
                                <div className={`p-3 rounded-full ${isDark ? 'bg-green-900/40' : 'bg-green-100'}`}>
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className={`font-bold mb-2 text-base ${isDark ? 'text-white' : 'text-gray-700'}`}>{item.title}</h3>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.text}</p>
                        </div>
                    ))}

                </div>
            </div>

            {/* CTA Banner */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <div className={`rounded-2xl px-8 py-8 text-center transition-colors duration-300 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#0f172a]'}`}>
                    <h2 className="text-xl font-bold mb-2 text-white">
                        Ready to manage your passwords?
                    </h2>
                    <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        No sign up needed. Just open the app and start saving.
                    </p>
                    <Link
                        to="/manager"
                        className="inline-block px-8 py-2.5 text-sm font-semibold rounded-full bg-green-400 hover:bg-green-500 active:scale-95 transition-all shadow-md text-black"
                    >
                        Open Manager →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className={`text-center py-6 text-sm flex justify-center items-center gap-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                <Link to='https://github.com/Vahidsk18/' target="_blank"><FaGithub className="text-sm" /></Link>
                <span>Made with ❤️ — ©Vsk {new Date().getFullYear()}</span>
            </footer>

        </div>
    )
}

export default Home