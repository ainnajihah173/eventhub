import { Calendar } from "lucide-react";

export default function OrganizerView({ stats, events = [] }: any) {
    const isEmpty = !Array.isArray(events) || events.length === 0;

    if (isEmpty) {
        return (
            <div className="bg-white border border-dashed border-gray-200 rounded-[2.5rem] p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No events found</h3>
                <p className="text-gray-400 text-sm">Check back later for exciting upcoming events!</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(events) && events.map((event: any) => (
                <div key={event.id}>{/* Your event card code */}</div>
            ))}
        </div>
    );
}