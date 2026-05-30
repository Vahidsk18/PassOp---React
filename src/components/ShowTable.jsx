import { FaEye, FaTrash, FaEdit, FaCopy } from "react-icons/fa";

const fakeData = [
    { id: 1, url: 'https://github.com', username: 'john_doe', password: '••••••••' },

];

function ShowTable() {
    return (
        <div className="min-h-screen bg-[#e8f5ee]" style={{ backgroundImage: 'radial-gradient(circle, #c8e6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

            {/* Table */}
            <div className="max-w-3xl mx-auto pt-10 px-4">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-200">
                    <h2 className="text-center text-base font-bold py-3 border-b border-green-100 text-gray-700">
                        Your Passwords
                    </h2>
                    <table className="w-full text-sm">
                        <thead className="bg-green-400 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left font-semibold">Site</th>
                                <th className="py-2 px-4 text-left font-semibold">Username</th>
                                <th className="py-2 px-4 text-left font-semibold">Password</th>
                                <th className="py-2 px-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fakeData.map((p, i) => (
                                <tr key={p.id} className={`border-t border-green-100 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50'}`}>

                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-1">
                                            <span className="truncate max-w-[140px] text-green-700">{p.url}</span>
                                            <FaCopy className="text-xs text-gray-400" />
                                        </div>
                                    </td>

                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-1">
                                            <span className="truncate max-w-[130px]">{p.username}</span>
                                            <FaCopy className="text-xs text-gray-400" />
                                        </div>
                                    </td>

                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono tracking-wider">{p.password}</span>
                                            <FaEye className="text-xs text-gray-400" />
                                            <FaCopy className="text-xs text-gray-400" />
                                        </div>
                                    </td>

                                    <td className="py-2 px-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <FaEdit className="text-blue-400" />
                                            <FaTrash className="text-red-400" />
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default ShowTable;