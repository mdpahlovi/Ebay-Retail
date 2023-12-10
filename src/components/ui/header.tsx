export default function Header({ title, children }: { title: string; children?: React.ReactNode }) {
    return (
        <div className="bg-header bg-overly">
            <div className="container space-y-4 py-24">
                <h1 className="text-white">{title}</h1>
                {children}
            </div>
        </div>
    );
}
