
export default function GrainOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[40] opacity-[0.03] overflow-hidden">
            <div
                className="absolute inset-[-200%] w-[400%] h-[400%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain"
            />
        </div>
    );
}
