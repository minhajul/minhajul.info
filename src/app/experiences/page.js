"use client"

import {motion} from "framer-motion"
import Link from "next/link";

const experiences = [
    {
        "title": "Software & Application Lead",
        "company": "Genofax",
        "url": "https://www.genofax.com",
        "date_of_joining": "Jul 2023 - Running",
        "description": [
            "Providing technical leadership by guiding architectural decisions and ensuring robust, scalable solutions",
            "Overseeing project planning, execution, and delivery, ensuring timely completion of milestones and high-quality outcomes",
            "Mentoring and managing a high-performing engineering team by setting clear goals, conducting performance evaluations, and fostering professional growth",
            "Collaboratively with cross-functional teams to ensure effective communication and seamless integration of project efforts",
            "Leading code reviews, enforced coding standards, and maintained a clean, consistent, and maintainable codebase",
            "Designing and developed RESTful APIs and scalable applications using modern frameworks and technologies",
            "Ensuring application and system performance, with a strong focus on database tuning (MySQL, PostgreSQL) and high availability",
            "Optimized cloud infrastructure, including compute, storage, networking, and CI/CD pipelines in AWS",
            "Continuously evaluating and improving CI/CD processes, automation, and deployment pipelines",
            "Driving adoption of new technologies and best practices to continuously enhance team efficiency and product quality",
            "Monitoring and improving system reliability, security, and scalability on an ongoing basis",
            "Actively contributing to strategic roadmap planning and aligning technical decisions with business objectives",
        ],
    },
    {
        "title": "Software & Application Engineer",
        "company": "Tenssor",
        "url": "https://www.tenssor.com",
        "date_of_joining": "Dec 2018 - Jun 2023",
        "description": [
            "Design and develop highly available backend systems and scale them to serve large volumes of traffic",
            "Collaborate with management to understand objectives and develop corresponding models",
            "Provide software specifications, write production-quality code, and engage in algorithm proliferation activities",
            "Develop RESTful APIs using PHP, Laravel, Python, Django, and Django REST Framework",
            "Building scalable application using PHP, Laravel, React.js, Next.js, Tailwind CSS, MySQL",
            "Analyse application and server performance data to recommend improvements",
            "Utilise various caching technologies, including local and distributed solutions (Nginx, Redis, Memcached)",
            "Develop and maintain automated CI/CD pipelines for code deployment",
            "Manage and distribute tasks among the team using JIRA",
            "Optimise MySQL and PostgreSQL databases for high availability and improved query performance",
            "Design the architecture and develop the project skeleton",
            "Manage cloud services (AWS EC2, Route 53, S3, RDS, CodePipeline, CodeDeploy, CodeCommit)"
        ],
    },
    {
        "title": "Sr Software Engineer",
        "company": "Maya",
        "url": "https://www.linkedin.com/company/mayaiswithyou/",
        "date_of_joining": "Jun 2015 - Nov 2018",
        "description": [
            "Designed and developed highly available backend systems to support large-scale traffic",
            "Built server-side applications using multiple programming languages and databases, including Python, PHP, Node.js, MySQL, and MongoDB",
            "Monitored and analyzed application and server performance, providing recommendations for system optimization",
            "Applied caching strategies using solutions such as Nginx, Redis, and Memcached to enhance system responsiveness",
            "Conducted automated browser testing to ensure reliability and performance",
            "Provisioned and managed cloud resources, including databases, serverless functions, queues, and monitoring tools",
            "Designed and developed RESTful APIs according to project team requirements",
            "Managed project workflows and task distribution using team collaboration tools",
            "Automated cloud infrastructure and virtualized environments using modern tools such as Ansible and Docker",
            "Developed and maintained automated CI/CD pipelines to enforce coding standards, run tests, and streamline deployments"
        ],
    }
];

export default function Experiences() {
    return (
        <div className="mt-10 lg:mt-24 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <h2 className="text-white font-semibold text-3xl">
                    Experiences
                </h2>
                <p className="mt-3 text-white text-lg">List of my professional experiences</p>
            </motion.div>

            <div className="mb-16">
                {experiences.map((experience, index) => (
                    <motion.div
                        key={index}
                        className="mb-6 border-l-2 border-blue-400 pl-6 relative"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        viewport={{once: true}}
                    >
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-400 rounded-full"></div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-blue-400 mb-2">
                                <Link href={experience.url} target="_blank" rel="noreferrer">
                                    {experience.title} at {experience.company}
                                </Link>
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {experience.date_of_joining}
                            </p>
                        </div>

                        <motion.ul
                            className="space-y-3 text-gray-300 leading-relaxed"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.3}}
                            viewport={{once: true}}
                        >
                            {experience.description.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-blue-400 mr-2 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}