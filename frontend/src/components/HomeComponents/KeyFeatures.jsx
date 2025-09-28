import React from "react";

export default function KeyFeatures() {
  const features = [
    {
      id: 1,
      title: "Automatic Power Switching",
      description:
        "Seamless transition between power sources with intelligent failure detection",
      icon: "⚡",
    },
    {
      id: 2,
      title: "Remote Monitoring & Control",
      description:
        "IoT-enabled system with cloud-based monitoring via Mobile App",
      icon: "☁️",
    },
    {
      id: 3,
      title: "Real-time Data Logging",
      description:
        "Comprehensive logging of power transitions and system performance",
      icon: "📈",
    },
    {
      id: 4,
      title: "Energy Efficiency",
      description: "Smart algorithms to optimize generator runtime",
      icon: "🍃",
    },
    {
      id: 5,
      title: "Protection Systems",
      description:
        "Advanced protection against overload and electrical anomalies",
      icon: "🛡️",
    },
    {
      id: 6,
      title: "Smart Notifications",
      description: "Instant alerts for power failures and maintenance updates",
      icon: "🔔",
    },
  ];

  return (
    <div className="py-12 bg-[#020b12] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Key <span className="text-cyan-400">Features</span> of our products
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-400 mb-10">
        Discover the powerful features designed to keep your systems efficient,
        secure, and easy to manage.
      </p>

      {features.length === 0 ? (
        <p className="text-center text-gray-400">
          No features available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {features.map((f) => (
            <div
              key={f.id}
              className="bg-[#041421] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:bg-gradient-to-b hover:from-[#042c3a] hover:to-[#041421]"
            >
              <div className="bg-cyan-400 text-black rounded-full p-4 mb-4 flex items-center justify-center text-2xl">
                {f.icon}
              </div>
              <h2 className="font-bold text-lg mb-2">{f.title}</h2>
              <p className="text-gray-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
