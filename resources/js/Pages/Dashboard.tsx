import DashboardLayout from '@/Layouts/DashboardLayout';
import AdminView from './Partials/AdminView';
import OrganizerView from './Partials/OrganizerView';
import AttendeeView from './Partials/AttendeeView';
import { usePage, Head } from '@inertiajs/react';

export default function Dashboard(props: any) {
    const page = usePage().props as any;
    const { auth } = page;
    const role = auth?.user?.role ?? auth?.role ?? null;

    const stats = page.stats ?? {};
    const recent_events = page.recent_events ?? [];
    const upcoming_events = page.upcoming_events ?? [];

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="animate-in fade-in duration-700">
                {role === 'admin' && <AdminView stats={stats} />}

                {role === 'organizer' && (
                    <OrganizerView stats={stats} events={recent_events} />
                )}

                {role === 'user' && (
                    <AttendeeView events={upcoming_events} />
                )}

                {/* Fallback if role is undefined */}
                {!['admin', 'organizer', 'user'].includes(role) && (
                    <div className="p-10 bg-white rounded-3xl text-center shadow-sm border border-gray-100">
                        <p className="text-gray-500">Initializing your profile...</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}