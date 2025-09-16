const ICONS = {
    frontend: "M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3V4Zm0 6h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Zm4 3v2h10v-2H7Z",
    backend: "M4 6a2 2 0 0 1 2-2h5v6H4V6Zm9-2h5a2 2 0 0 1 2 2v4h-7V4ZM4 14v4a2 2 0 0 0 2 2h5v-6H4Zm9 0h7v4a2 2 0 0 1-2 2h-5v-6Z",
    devops: "M12 7a5 5 0 0 0-4.58 3H5a4 4 0 0 0 0 8h2.42A5 5 0 1 0 12 7m0 2a3 3 0 1 1 0 6H7a2 2 0 0 1 0-4h5Z",
    database: "M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4s9-1.79 9-4s-4.03-4-9-4m-9 7v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4c-2.02 1.51-5.36 2.5-9 2.5S5.02 11.51 3 10m0 6v3c0 2.21 4.03 4 9 4s9-1.79 9-4v-3c-2.02 1.51-5.36 2.5-9 2.5s-6.98-.99-9-2.5Z",
    cloud: "M19 18H6a4 4 0 1 1 1.48-7.73A6 6 0 0 1 22 12a4 4 0 0 1-3 6Z"
};

export default function SkillCard({ skill }) {
    return (
        <article className="group will-reveal rounded-2xl p-5 sm:p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur shadow hover:shadow-glow transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${skill.gradient} text-white shadow`}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path d={ICONS[skill.icon]} />
                    </svg>
                </span>
                <div>
                    <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                    <p className="text-xs text-slate-300">{skill.description}</p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {skill.technologies.map((tech, index) => (
                    <span
                        key={index}
                        className={`chip flex justify-center items-center gap-2 px-3 py-1.5 rounded-full text-sm ${tech.colorCode}`}
                    >
                        {tech.name}
                    </span>
                ))}
            </div>
        </article>
    );
}
