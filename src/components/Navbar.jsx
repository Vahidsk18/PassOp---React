import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../context_api/ThemeContext'
import { Link } from 'react-router-dom'

function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <nav className="bg-[#0f172a] text-white h-16 flex items-center justify-between px-10 shadow-md">
            <Link to='/'><h1 className="text-xl font-bold">
                {"<"}<span className="text-green-400">PassOP</span>{"/>"}
            </h1></Link>

            <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300
                ${isDark
                        ? 'border border-green-400 text-green-400'
                        : 'border border-green-300 text-green-300 hover:bg-green-400/20 hover:border-green-400 hover:text-green-400'
                    }`}
            >
                <span className={`text-lg block transition-all duration-500 ${isDark ? 'rotate-[360deg]' : 'rotate-0'}`}>
                    {isDark ? <MdLightMode /> : <MdDarkMode />}
                </span>
                <span className="text-xs font-medium">
                    {isDark ? 'Light' : 'Dark'}
                </span>
            </button>

        </nav>
    );
}

export default Navbar;