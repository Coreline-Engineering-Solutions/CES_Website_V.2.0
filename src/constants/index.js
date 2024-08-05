import { facebook, instagram, support, twitter, secure, map, clock, planning, brainstorm, done, execute, monitor, design,Check } from "../assets/icons";
import { Levi, Gustav, CESphoto1, CESphoto2, CESphoto3, AI1, AI2, AI3, AI4, AI5 } from "../assets/images";
import { Chat, Maptool, Progress, ToolIcon2 } from "../assets/icons";

export const layers = [
    {
      name: 'Layer 1',
      lines: ['line1', 'line2', 'line3']
    },
    {
      name: 'Layer 2',
      lines: ['line1', 'line2']
    },
    {
      name: 'Layer 3',
      lines: ['line1', 'line2', 'line3', 'line4']
    },
  ];


export const DashboardServices = [
    { path: "/narrative", icon: Chat, label: "Narrative Tool", description: "Create and edit narratives effortlessly." , ind: 1 },
    { path: "#gis", icon: Maptool, label: "GIS System", description: "Analyze geographic data seamlessly." , ind: 0},
    { path: "#feasability", icon: ToolIcon2, label: "Feasibility", description: "Evaluate project feasibility quickly.", ind: 0  },
    { path: "#coming", icon: Progress, label: "COMING SOON", description: "Stay tuned for new features!" , ind: 0 }
];
export const tasks = [
    {
        title: 'BRSK',
        subtitle: 'AX-JKA-103',
        description: 'Clean Joint 102',
        detail: 'Joint 102 is not the right colour and the sky needs to be blue not white. While at it bring me a coffee with 2 and a half cookies.',
        imageSrc: './resources/BRSK Icon.png',
        imageAlt: 'BRSK Icon'
    },
    {
        title: 'Velox',
        subtitle: 'AK-AST-102',
        description: 'Export to PDF',
        detail: 'Can you please export this PDF and send it to our Finance Department for approval.',
        imageSrc: null,
        imageAlt: 'Thumbnail'
    }
];

export const navLinks = [
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact Us" },
    { href: "#services", label: "Services" },
    { href: "#client", label: "Client" },
];


export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const services = [
    {
        imgURL: map,
        label: "Efficient Network Mapping:",
        subtext: "Optimize your fiber-optic network with our precise mapping services. Our expert engineers use advanced GIS technology to create detailed maps tailored to your needs. From initial surveys to final deliverables, rely on us for accurate insights that streamline your infrastructure planning."
    },
    {
        imgURL: design,
        label: "Expert Consultation",
        subtext: "Get personalized guidance for your fiber-optic project. Our experienced team offers valuable insights and recommendations at every stage, from planning to implementation. Count on us to be your trusted partner in building and optimizing your network."
    },
    {
        imgURL: clock,
        label: "Tailored Network Design",
        subtext: "Need a custom fiber-optic network? Our skilled engineers specialize in creating efficient designs that maximize performance and scalability. From residential communities to business campuses, trust us to deliver innovative solutions that exceed expectations."
    },
];

export const managers = [
    {
        imgURL: Levi,
        customerName: 'Levi Odendaal',
        title: 'Managing Director',
        feedback: "With over a decade of experience in project management, design management, cost accounting, and consulting engineering in Telecommunications, Levi has led major fiber projects in South Africa and the UK. His unwavering work ethic and passion for results have driven success and positively impacted clients. Levi is dedicated to the continued growth of the industry. "
    },
    {
        imgURL: Gustav,
        customerName: 'Gustav Hunsinger',
        title: 'Chief Technical Officer',
        feedback: "A seasoned expert with over 11 years of success in fiber optic design, backend database systems, and automation, Gustav's career is a testament to the seamless integration of diverse expertise. He has crafted innovative and scalable solutions for numerous clients worldwide, consistently delivering exceptional results and driving technological advancements in the telecommunications industry. "
    }
];



export const footerLinks = [
    {
        title: "Services",
        links: [
            { name: "Enquiries", link: "/" },
            { name: "Job Offers", link: "/" },
            { name: "Contact us", link: "/" },
            { name: "Our Serivces", link: "/" },
            { name: "Join Our Team", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "info@corelineengineering.com", link: "info@corelineengineering.com" },
            { name: "+27218791136", link: "tel:+27218791136" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];

export const Images = [
    { src: CESphoto1, alt: "photo1" },
    { src: CESphoto2, alt: "photo2" },
    { src: CESphoto3, alt: "photo3" },
];

export const ServiceCarousel = [
    {
        title: "Network Design",
        header: "Network Design",
        description: "Our specialization lies in crafting customized fiber network designs from A to Z, ensuring they align precisely with the requirements and objectives of our clients.",
        src: CESphoto2,
    },
    {
        title: "Inventory Management",
        header: "Network Inventory Management",
        description: "We are proficient in documenting and capturing the details of fiber network infrastructure, maintaining an accurate and up-to-date inventory for effective management.",
        src: AI2,
    },
    {
        title: "Systems Design",
        header: "Software Systems Design and Databases",
        description: "Leveraging our technical proficiency, we design software systems and databases to streamline operations, enhance efficiency, and facilitate seamless data management",
        src: AI3,
    },
    {
        title: "Admin Personnel",
        header: "Dedicated Admin Personnel",
        description: "Our dedicated admin personnel oversee and coordinate various aspects of project administration to ensure projects are executed smoothly, on time, and within budget.",
        src: AI4,
    },
    {
        title: "Guidance/Supplier",
        header: "Material Guidance and Supplier Advisory",
        description: "Providing valuable insights, we offer guidance on materials and advise on suppliers, ensuring the use of quality materials in the implementation of fiber network projects",
        src: AI5,
    },


];
    // Define constants for options
    export const radioMap = [
        { id: 'S', value: '0', label: 'Single Sided' },
        { id: 'DS', value: '1', label: 'Double Sided' },
        { id: 'DSR', value: '2', label: 'Double Sided incl Road' },
    ];


export const experiences = [
    {
        title: "Brainstorming",
        icon: brainstorm ,
        points: [
            "Our specialization lies in crafting customized fiber network designs from A to Z, ensuring they align precisely with the requirements and objectives of our clients.",
        ],
    },
    {
        title: "Planning",
        icon: planning ,
        points: [
            "Analyze data Clearly define the scope of work for the fiber design project. Include deliverables and exclusions Define quality standards for the fiber design Finalize Project Deliverables needed by the client",
        ],
    },
    {
        title: "Launch and Execution",
        icon: execute ,
        points: [
            "Define and finalize Commercials Allocate and introduce account manager and team to the client. Define and Finalize Communication Plan  Conduct team orientation and training.",
        ],
    },
    {
        title: "Monitoring and Control",
        icon: monitor ,
        points: [
            "Quality of deliverables Establish a process for identifying and resolving project constraints. Conduct regular quality inspections. Develop a protocol for handling changes to the project scope.",
        ],
    },
    {
        title: "Project Commencement",
        icon: Check ,
        points: [
            "Compile project documentation and ensure its accessible. Plan for a smooth handover to the client’s  Project Management Team Provide training to end-users  Establish ongoing support mechanisms. Conduct a project evaluation and gather feedback. Establish a lessons learned register for future projects.",
        ],
    },

];

