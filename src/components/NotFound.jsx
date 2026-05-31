// NotFound.jsx — place in your pages/ or components/ folder
// Then use: <Route path='*' element={<NotFound />} />

import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage: 'radial-gradient(circle, #c8e6d4 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundColor: '#e8f5ee'
            }}
        >
            <div className="text-center select-none">

                {/* Big 404 */}
                <h1 className="text-[9rem] sm:text-[12rem] font-black leading-none text-green-200 tracking-tighter">
                    404
                </h1>

                {/* Lock icon */}
                <div className="flex justify-center -mt-8 mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center shadow-lg shadow-green-300">
                        <span className="text-3xl">🔒</span>
                    </div>
                </div>

                {/* Brand */}
                <p className="text-2xl font-bold text-gray-800 mb-1">
                    {"<"}Pass<span className="text-green-500">OP</span>{"/>"}
                </p>

                {/* Message */}
                <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                    Oops! This page doesn't exist.
                </p>

                {/* Back home button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-green-400 hover:bg-green-500 active:scale-95 text-sm font-semibold text-white shadow-md transition-all duration-200"
                >
                    ← Back to Home
                </Link>

            </div>
        </div>
    )
}

export default NotFound;