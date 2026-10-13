export type Experience = {
    title: string;
    company: string;
    url: string;
    /** "YYYY-MM" */
    start: string;
    /** "YYYY-MM"; omit for a current role */
    end?: string;
    description: string[];
};

export const experiences: Experience[] = [
    {
        "title": "Software Consultant",
        "company": "Genofax® Life Sciences",
        "url": "https://www.genofax.com",
        "start": "2026-01",
        "description": [
            "Design and build scalable backend systems and SaaS products, leading projects from architecture and planning through deployment and launch",
            "Modernize legacy applications by breaking monolithic systems into Kubernetes-based microservices running on AWS",
            "Streamline software delivery by implementing CI/CD pipelines with GitHub Actions, Jenkins, and ArgoCD, enabling faster releases with minimal downtime",
            "Improve system reliability by setting up monitoring, logging, and alerting with Prometheus, Grafana, and Loki to quickly detect and resolve production issues",
            "Developed a high-performance event processing platform using Go and Kafka, improving reliability during traffic spikes with message queues and dead-letter queues",
            "Built AI powered root cause analysis tooling for health and wellness diagnostic platforms, cutting post-incident triage time",
            "Secured CI/CD workflows in GitHub Actions using AWS OIDC for keyless authentication and Tailscale for private network deployments"
        ]
    },
    {
        "title": "Software & Application Lead",
        "company": "Genofax® Life Sciences",
        "url": "https://www.genofax.com",
        "start": "2023-07",
        "end": "2025-12",
        "description": [
            "Led the transition of a core product from prototype to a production-ready platform, defining the technical roadmap and reducing time-to-market",
            "Made key architectural decisions and designed scalable, maintainable systems aligned with business needs",
            "Designed and optimised AWS cloud infrastructure, reducing costs by ~30% while ensuring high availability and reliability",
            "Led the deployment of ML and NLP models into production, enabling real-time data processing for large-scale applications",
            "Improved MySQL and PostgreSQL performance, reducing query latency by 60% and ensuring scalability for high-traffic systems",
            "Set and maintained engineering best practices, including code reviews and clean coding standards",
            "Managed and mentored a team of 10+ engineers, increasing team productivity and sprint velocity",
            "Worked closely with product managers, designers, and stakeholders to ensure clear communication and smooth delivery",
            "Planned, tracked, and delivered projects on time while maintaining high quality",
            "Built and improved CI/CD pipelines, reducing release time",
            "Monitored system performance and fixed bottlenecks to keep applications fast and reliable",
            "Helped resolve complex technical problems by guiding the team toward effective solutions",
        ]
    },
    {
        "title": "Software & Application Engineer",
        "company": "Tenssor Pty Ltd",
        "url": "https://www.tenssor.com",
        "start": "2018-12",
        "end": "2023-06",
        "description": [
            "Led the design and architecture of scalable, high-availability systems handling 500K+ daily requests with 99.95% uptime",
            "Partnered with product and business stakeholders to translate requirements into scalable technical solutions and system designs",
            "Defined system architecture, established coding standards, and ensured best practices for maintainability, scalability, and performance",
            "Oversaw development of RESTful APIs (Laravel, Python) powering 15+ integrations",
            "Guided full-stack delivery using Laravel, React.js, Next.js, improving performance through SSR and optimisation strategies",
            "Architected caching and performance strategies (Redis, Memcached, Nginx) reducing database load and improving response times",
            "Directed database design and optimisation (MySQL, PostgreSQL) for scalability, consistency, and high availability",
            "Owned AWS infrastructure architecture and operations, maintaining 99.9% SLA for enterprise-grade systems",
            "Mentored engineers, conducted code reviews, and drove engineering excellence across the team"
        ]
    },
    {
        "title": "Sr Software Engineer",
        "company": "Mayalogy Private Ltd",
        "url": "https://www.linkedin.com/company/mayaiswithyou/",
        "start": "2015-06",
        "end": "2018-11",
        "description": [
            "Designed and built a highly available, scalable backend system supporting 1M monthly active users, maintaining low latency under peak load",
            "Developed server-side applications using Python, PHP (Laravel), Node.js, Vue.js, and MySQL",
            "Provisioned and managed AWS infrastructure (RDS, API Gateway, Lambda, SQS) using CloudFormation, reducing setup and eliminating manual errors",
            "Integrated third-party APIs including Facebook, Google Graph, and Account Kit, increasing social login adoption to 65% of new users",
            "Built real-time systems using Socket.io, reducing response time and improving user retention",
            "Implemented caching strategies using Nginx, Redis to improve system performance and reduce server load",
            "Monitored application and server performance, identifying bottlenecks and applying optimisations",
            "Developed automated browser testing workflows using Selenium, reducing regression testing time",
            "Managed project tasks and coordinated team activities using Asana to ensure smooth and timely delivery",
        ]
    },
    {
        "title": "Web Developer",
        "company": "Melbweb",
        "url": "https://www.linkedin.com/company/melbweb/",
        "start": "2014-11",
        "end": "2015-05",
        "description": [
            "Developed and customised WordPress themes and plugins for multiple marketplace platforms based on business requirements",
            "Extended and optimised third-party plugins to enhance website functionality, performance, and user experience",
            "Collaborated closely with the Team Lead, Business Analyst, and Product Owner to deliver project requirements effectively",
            "Managed hosting environments using cPanel, including deployment, configuration, and basic server maintenance",
        ]
    }
];
