import React from 'react';
import { User, Mail, Calendar, MoreVertical } from 'lucide-react';

const UserList = ({ users, loading, error }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-text-dim">Retrieving user records...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl text-center">
                <p className="text-red-400 font-bold">{error}</p>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="p-12 border border-dashed border-white/10 rounded-2xl text-center flex flex-col items-center">
                <div className="bg-white/5 p-4 rounded-full mb-4">
                    <User size={32} className="text-text-dim" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No Users Found</h3>
                <p className="text-text-dim max-w-sm mx-auto">This tenant currently has no users. Import a CSV via the Data Plane to provision accounts.</p>
            </div>
        );
    }

    return (
        <div className="glass-card overflow-hidden border-white/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-xs uppercase font-black tracking-widest text-text-dim/60">User Identity</th>
                            <th className="p-6 text-xs uppercase font-black tracking-widest text-text-dim/60">Contact</th>
                            <th className="p-6 text-xs uppercase font-black tracking-widest text-text-dim/60">Role</th>
                            <th className="p-6 text-xs uppercase font-black tracking-widest text-text-dim/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user._id || user.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary font-bold ring-1 ring-white/5">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{user.name || 'Unknown User'}</p>
                                            <p className="text-xs text-text-dim font-mono mt-0.5 opacity-60">ID: {user._id || user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2 text-text-dim text-sm">
                                        <Mail size={14} className="opacity-50" />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-white/5 text-white border border-white/5">
                                        {user.role || 'Member'}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-text-dim transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-white/5 bg-white/[0.02] text-xs text-text-dim text-center font-mono">
                Showing {users.length} records in isolated storage
            </div>
        </div>
    );
};

export default UserList;
