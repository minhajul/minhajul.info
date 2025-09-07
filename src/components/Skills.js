'use client'

const skills = [
    { name: "PHP", category: "Languages", icon: "🐘" },
    { name: "Python", category: "Languages", icon: "🐍" },
    { name: "JavaScript", category: "Languages", icon: "⚡" },
    { name: "Golang", category: "Languages", icon: "🔷" },

    // Frontend
    { name: "React", category: "Frontend", icon: "⚛️" },
    { name: "Next.js", category: "Frontend", icon: "▲" },
    { name: "TailwindCSS", category: "Frontend", icon: "🎨" },
    { name: "Alpine.js", category: "Frontend", icon: "🏔️" },

    // Backend
    { name: "Laravel", category: "Backend", icon: "🔴" },
    { name: "Node.js", category: "Backend", icon: "🟢" },
    { name: "Django", category: "Backend", icon: "🎯" },
    { name: "DRF", category: "Backend", icon: "🔥" },

    // Database
    { name: "MySQL", category: "Database", icon: "🗄️" },
    { name: "PostgreSQL", category: "Database", icon: "🐘" },

    // Tools
    { name: "Git", category: "Tools", icon: "📝" },
    { name: "Docker", category: "Tools", icon: "🐳" },
    { name: "Kubernetes", category: "Tools", icon: "⚙️" },
    { name: "AWS", category: "Tools", icon: "☁️" },
    { name: "Linux", category: "Tools", icon: "🐧" },
]

const categories = ["Languages", "Frontend", "Backend", "Database", "Tools"]

export default function Skills() {
    const getSkillsByCategory = (category) => {
        return skills.filter((skill) => skill.category === category)
    }

    return (
        <section className="py-10 lg:py-16 px-6 mt-10 lg:mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-block">
                        <h2 className="font-semibold text-slate-300 hover:text-white text-2xl lg:text-4xl mb-6">
                            Skills & Expertise
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-600 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-xl text-slate-300 hover:text-white max-w-3xl mx-auto mt-5">
                        Technologies and tools I use to bring ideas to life.
                    </p>
                </div>

                <div className="space-y-16">
                    {categories.map((category, categoryIndex) => (
                        <div key={category} className="relative">
                            <div className="flex justify-center mb-8">
                                <span className="px-6 py-2 text-lg font-semibold border-2 border-slate-300 text-slate-300 hover:bg-slate-200 hover:text-slate-900 rounded-md">
                                    {category}
                                </span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {getSkillsByCategory(category).map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        className="group relative"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <div className="flex items-center gap-3 px-6 py-2 border-2 rounded-md text-slate-300 hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 cursor-pointer">
                                              <span className="text-2xl transition-transform duration-300">
                                                {skill.icon}
                                              </span>
                                              <span className="font-medium text-card-foreground text-lg">{skill.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {categoryIndex < categories.length - 1 && (
                                <div className="flex justify-center mt-12">
                                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-full lg:max-w-2xl mx-auto text-center mt-16">
                    <p className="border p-1 rounded-md text-slate-300 hover:text-white">
                        Always learning and exploring new technologies.
                    </p>
                </div>
            </div>
        </section>
    )
}