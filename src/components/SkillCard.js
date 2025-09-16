import Icon from "@/components/Icons";

export default function SkillCard({ skill }) {
    return (
        <article className="group will-reveal rounded-2xl p-5 sm:p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur shadow hover:shadow-glow transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${skill.gradient} text-white shadow`}>
                    <Icon name={skill.icon} className="h-5 w-5"/>
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
                        className={`chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${tech.text} ${tech.bg} ${tech.ring}`}
                    >
                      <Icon name={tech.icon} className={`h-4 w-4 ${tech.text}`} />
                        {tech.name}
                    </span>
                ))}
            </div>
        </article>
    );
}
