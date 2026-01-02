export default function InContentAd() {
    return (
        <div className="w-full py-8">
            <div className="container mx-auto px-4">
                <div
                    id="in-content-ad"
                    className="max-w-2xl mx-auto min-h-[250px] bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-sm"
                >
                    {/* Google AdSense code will be inserted here */}
                    <span className="opacity-50">Advertisement</span>
                </div>
            </div>
        </div>
    );
}
