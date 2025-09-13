import React from "react";

export default function PrivacyPolicy() {
  // --- policy content (adapted/paraphrased from the original source) ---
  const policy = {
    title: "Privacy Policy",
    intro:
      "We are committed to protecting your privacy and securing your personal information. This policy explains what we collect, how we use it, and how we protect it when you use our services.",
    sections: [
      {
        id: "collect",
        heading: "Information We Collect",
        content: [
          "Personal Information:",
          "• Phone Number – required for account creation and authentication.",
          "• Name – used to personalize your experience.",
          "• 6-digit PIN – used for secure login and account access.",
          "",
          "Device Information:",
          "• IP address, device model and operating system.",
          "",
          "Usage Data:",
          "• Logs of app interactions used for performance monitoring and security."
        ],
      },
      {
        id: "use",
        heading: "How We Use Your Information",
        content: [
          "We use the information we collect to:",
          "• Create and manage user accounts securely.",
          "• Authenticate and verify user identity using the 6-digit PIN.",
          "• Personalize and improve your experience.",
          "• Analyze app performance and improve security.",
          "• Send important device-related notifications and alerts."
        ],
      },
      {
        id: "permissions",
        heading: "Permissions We Use & Why",
        content: [
          "Location Permissions (ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION):",
          "• Used to provide weather details and location-based automation.",
          "",
          "Wi-Fi Permissions (ACCESS_WIFI_STATE, CHANGE_WIFI_STATE):",
          "• Used to check and manage Wi-Fi state for reliable device communication.",
          "",
          "Camera (CAMERA):",
          "• Used to scan QR codes for secure device pairing.",
          "",
          "Internet & Network (INTERNET, ACCESS_NETWORK_STATE):",
          "• Required for remote connectivity (MQTT and other services).",
          "",
          "Background Service (FOREGROUND_SERVICE etc.):",
          "• Used to receive background alerts from devices.",
          "",
          "Notifications (POST_NOTIFICATIONS):",
          "• Required to show real-time alerts and maintenance updates."
        ],
      },
      {
        id: "sharing",
        heading: "Data Sharing & Security",
        content: [
          "• We do not sell or distribute your personal data to third parties.",
          "• Phone numbers and PINs are stored securely and encrypted.",
          "• Reasonable technical and organizational measures are implemented to protect against unauthorized access."
        ],
      },
      {
        id: "children",
        heading: "Children's Privacy",
        content: [
          "• Our services are not intended for children under 13.",
          "• We do not knowingly collect personal information from children under 13."
        ],
      },
      {
        id: "changes",
        heading: "Changes to This Policy",
        content: [
          "• We may update this policy occasionally. Changes will be reflected here and you should review this page periodically."
        ],
      },
    ],
    contact: {
      email: "help.nextauto@gmail.com",
      address:
        "Mr. Pramod Mehta, 1 1,146 Shahabad Mandir Mohalla Bhoyal, 325217 Shahbad Baran, Rajasthan, India",
      lastUpdated: "March 2024",
    },
    // optional original source (kept as reference)
    sourceName: "NextAuto Privacy Policy",
    sourceUrl: "https://nextauto.in/privacy-policy",
  };

  // --- helper renderers / edge-case checks ---
  const hasSections = Array.isArray(policy.sections) && policy.sections.length > 0;

  return (
    <main className="py-12 bg-[#020b12] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            {policy.title || "Privacy Policy"}
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-gray-400">
            {policy.intro ||
              "This privacy policy explains how we collect and process your information."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main column: policy content */}
          <section className="md:col-span-2 space-y-6">
            {!hasSections ? (
              <div className="bg-[#041421] border border-gray-800 rounded-lg p-6 text-center text-gray-400">
                Policy content is currently unavailable.
              </div>
            ) : (
              policy.sections.map((sec) => {
                const lines = Array.isArray(sec.content) ? sec.content : [sec.content || ""];
                return (
                  <article
                    key={sec.id}
                    className="bg-[#041421] border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:bg-gradient-to-b hover:from-[#042c3a] hover:to-[#041421]"
                    aria-labelledby={`heading-${sec.id}`}
                  >
                    <h2
                      id={`heading-${sec.id}`}
                      className="text-xl font-semibold mb-3 text-center md:text-left"
                    >
                      {sec.heading}
                    </h2>

                    {/* Render content lines with simple logic for bullets */}
                    <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                      {lines.map((line, idx) => {
                        // treat lines that start with "•" as list items
                        if (typeof line === "string" && line.trim().startsWith("•")) {
                          // find the consecutive bullet lines to form a <ul>
                          const bullets = [];
                          let j = idx;
                          while (j < lines.length && typeof lines[j] === "string" && lines[j].trim().startsWith("•")) {
                            bullets.push(lines[j].replace(/^•\s*/, ""));
                            j++;
                          }
                          // render the UL once, and skip over consumed bullets by returning null for those indexes
                          return (
                            <ul key={idx} className="list-disc list-inside text-gray-300">
                              {bullets.map((b, bi) => (
                                <li key={bi} className="mb-1">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // headings for sub-lists (like "Personal Information:")
                        if (line.endsWith(":") && !line.startsWith("•")) {
                          return (
                            <p key={idx} className="text-gray-200 font-medium mt-2">
                              {line}
                            </p>
                          );
                        }

                        // plain paragraphs (skip empty strings)
                        if (line.trim() === "") return null;
                        if (!line.startsWith("•")) {
                          return (
                            <p key={idx} className="mb-1">
                              {line}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </article>
                );
              })
            )}
          </section>

          {/* Sidebar: contact + metadata */}
          <aside className="md:col-span-1 space-y-6">
            <div className="bg-[#041421] border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-gray-300 text-sm mb-3">
                For privacy questions, please contact:
              </p>

              <p className="text-sm">
                <strong className="text-gray-200">Email: </strong>
                {policy.contact?.email ? (
                  <a
                    href={`mailto:${policy.contact.email}`}
                    className="text-cyan-300 hover:underline break-all"
                  >
                    {policy.contact.email}
                  </a>
                ) : (
                  <span className="text-gray-400">Not specified</span>
                )}
              </p>

              <p className="mt-3 text-sm">
                <strong className="text-gray-200">Address: </strong>
                <span className="text-gray-300 block mt-1 text-sm">
                  {policy.contact?.address || "Not specified"}
                </span>
              </p>

              <p className="mt-4 text-xs text-gray-400">
                Last updated:{" "}
                <span className="text-gray-200">{policy.contact?.lastUpdated || "Not specified"}</span>
              </p>
            </div>

            <div className="bg-[#041421] border border-gray-800 rounded-lg p-6 text-sm text-gray-300">
              <h4 className="font-semibold mb-2">Data & Security</h4>
              <p className="mb-2">
                We take reasonable measures to secure stored information. If you suspect misuse of your data,
                reach out via the email above.
              </p>

              <div className="mt-3 text-xs text-gray-400">
                <p>
                  Source:{" "}
                  <a
                    href={policy.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline"
                  >
                    {policy.sourceName}
                  </a>
                </p>
              </div>
            </div>

            {/* small accessibility / print hint */}
            <div className="hidden print:block text-xs text-gray-400">
              This page is print-friendly.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
