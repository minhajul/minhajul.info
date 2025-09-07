"use client"

import {motion} from "framer-motion"

const experiences = [
    {
        "title": "Software & Application Lead",
        "company": "Genofax",
        "url": "https://www.geofax.com",
        "date_of_joining": "Jul 2023 - Running",
        "description": [
            "Providing technical guidance, making critical decisions, and architecting solutions for the projects",
            "Overseeing project planning, execution, and delivery, ensuring projects are completed on time",
            "Mentoring and managing a high-performing engineering team, setting goals, conducting performance evaluations, and fostering professional growth",
            "Working collaboratively with cross-functional teams, ensuring effective communication and seamless integration of efforts",
            "Leading code reviews, enforcing coding standards, and maintaining a consistent and maintainable codebase",
            "Driving innovation by introducing new technologies and methodologies to enhance team efficiency and product quality",
            "Develop RESTful APIs using PHP, Laravel, Python, Django, and Django REST Framework",
            "Building scalable application using PHP, Laravel, React.js, Next.js, Tailwind CSS, MySQL",
            "Communicating project updates, technical decisions, and challenges to stakeholders, both internal and external",
            "Resolving technical issues by facilitating problem-solving discussions and guiding the team toward effective solutions",
            "Focusing on optimizing application and system performance to meet or exceed defined benchmarks",
            "Optimise MySQL and PostgreSQL databases for high availability and improved query performance",
            "Manage cloud services (AWS EC2, Route 53, S3, RDS, CodePipeline, CodeDeploy, CodeCommit)"
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
            "Designed and developed a highly available backend system capable of handling over 10 million requests per day",
            "Automated infrastructure in AWS Cloud and virtualized environments using Ansible and Docker",
            "Achieved zero downtime deployment on Docker containers by leveraging AWS Auto Scaling Group, EC2, ELB, and S3",
            "Developed server-side applications using Python, PHP, Node.js, MySQL, and MongoDB",
            "Analyzed application and server performance data to provide recommendations for performance improvements",
            "Utilized various caching technologies, including local and distributed solutions (Nginx, Redis, Memcached)",
            "Used Selenium for automated browser testing",
            "Created RDS (MySQL, PostgreSQL) resources using CloudFormation automation templates",
            "Created API Gateway, Lambda functions, and SQS on AWS according to project team requirements",
            "Created ECS Clusters and set CloudWatch Alarms",
            "Designed and developed RESTful APIs for different platforms",
            "Managed and distributed tasks among the team using ASANA",
            "Developed and maintained automated CI/CD pipelines for code standard checks, browser tests, and deployments"
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
                        className="mb-6 border-l-2 border-green-400 pl-6 relative"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        viewport={{once: true}}
                    >
                        <div className="absolute -left-2 top-0 w-3 h-3 bg-green-400 rounded-full"></div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-green-400 mb-2">
                                {experience.title} at {experience.company}
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
                                    <span className="text-green-400 mr-2 mt-1">•</span>
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