import { Project } from './types';

export const projectsVi: Project[] = [
  {
    id: 1,
    title: "Sàn NFT Neon",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    description: "Một sàn giao dịch NFT hiệu suất cao với giao diện chế độ tối, các yếu tố tương tác 3D và tích hợp ví liền mạch.",
    technologies: ["React", "Tailwind", "Web3.js", "Three.js"],
    link: "#",
    client: "Nebula Art Corp",
    year: "2023",
    role: "Kỹ sư Frontend Chính",
    challenge: "Khách hàng cần một thị trường có thể xử lý khối lượng giao dịch lớn trong khi vẫn duy trì thẩm mỹ 'Cyberpunk' ấn tượng và trực quan. Hiệu suất là yếu tố then chốt vì các bản xem trước 3D của NFT gây giật lag trên thiết bị di động.",
    solution: "Chúng tôi đã triển khai trình kết xuất WebGL tùy chỉnh được tối ưu hóa cho di động, giảm thời gian tải xuống 40%. Giao diện người dùng sử dụng hiệu ứng glassmorphism và gradient neon để phù hợp với nhận diện thương hiệu.",
    gallery: [
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop"
    ],
    video: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
    isFeatured: true,
    thanksTitle: "Cảm ơn đã ghé thăm",
    thanksMessage: "Sự yêu thích và phản hồi của bạn là động lực lớn.",
    thanksDescription: "Tôi là Gin — một đối tác kỹ thuật số tập trung vào những cải tiến liên tục, giúp các sản phẩm phát triển thông qua trải nghiệm kỹ thuật số tốt hơn thay vì chỉ là những lần thiết kế lại đơn lẻ.",
    thanksLinkText: "Trò chuyện với tôi",
    thanksLinkUrl: "/#/contact"
  },
  {
    id: 2,
    title: "Phân tích EcoDash",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    description: "Bảng điều khiển bền vững cho doanh nghiệp để theo dõi dấu chân carbon với trực quan hóa dữ liệu thời gian thực.",
    technologies: ["Next.js", "D3.js", "TypeScript", "Supabase"],
    link: "#",
    client: "GreenEarth Global",
    year: "2024",
    role: "Lập trình viên Full Stack",
    challenge: "Chuyển đổi dữ liệu môi trường phức tạp thành thông tin chi tiết có thể hành động cho các bên liên quan không chuyên về kỹ thuật. Bảng điều khiển cần xử lý hàng triệu điểm dữ liệu trong thời gian thực.",
    solution: "Sử dụng D3.js cho các biểu đồ tương tác tùy chỉnh. Backend được xây dựng trên Supabase cho khả năng đăng ký thời gian thực. Giao diện người dùng sạch sẽ, sử dụng bảng màu 'nhẹ nhàng' để gợi lên thiên nhiên.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: true,
    thanksTitle: "Thanks for Visiting",
    thanksMessage: "Your Likes and Feedback are well appreciated.",
    thanksDescription: "Creating sustainable digital solutions requires continuous effort and feedback. We value your input in making the world greener.",
    thanksLinkText: "Trò chuyện với tôi",
    thanksLinkUrl: "/#/contact"
  },
  {
    id: 3,
    title: "Ứng dụng Gin Portfolio",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    description: "Một ứng dụng năng suất tập trung vào trạng thái dòng chảy, với âm thanh môi trường và đồng hồ pomodoro.",
    technologies: ["React Native", "Expo", "Firebase", "Reanimated"],
    link: "#",
    client: "Dự án Cá nhân",
    year: "2023",
    role: "Thiết kế & Lập trình",
    challenge: "Hầu hết các ứng dụng năng suất quá lộn xộn. Tôi muốn tạo ra một ứng dụng giúp người dùng tập trung thông qua sự tối giản và tín hiệu âm thanh, thay vì chỉ là các danh sách.",
    solution: "Thiết kế giao diện dựa trên cử chỉ không có nút bấm trên màn hình chính. Hoạt ảnh mượt mà (60fps) sử dụng Reanimated 2. Chế độ tối được tối ưu hóa cho màn hình OLED để tiết kiệm pin.",
    gallery: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: true
  },
  {
    id: 4,
    title: "Hệ thống Thiết kế Flux",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    description: "Hệ thống thiết kế Figma toàn diện được sử dụng bởi hơn 500 nhà thiết kế trên toàn thế giới.",
    technologies: ["Figma", "Design Tokens", "Storybook"],
    link: "#",
    client: "Mã nguồn mở",
    year: "2022",
    role: "Trưởng nhóm Design Systems",
    challenge: "Tạo ra một hệ thống đủ linh hoạt cho cả ứng dụng doanh nghiệp B2B và các trang web sáng tạo B2C.",
    solution: "Xây dựng kiến trúc dựa trên token cho phép tạo chủ đề đa thương hiệu. Bao gồm hơn 200 thành phần và các mẫu auto-layout.",
    gallery: [
       "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  },
  {
    id: 5,
    title: "Lõi Ví Crypto",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639322537228-ad7117a76437?q=80&w=1200&auto=format&fit=crop",
    description: "Giao diện ví tiền điện tử an toàn, phi tập trung với hỗ trợ đa chuỗi.",
    technologies: ["Vue", "Ethers.js", "Rust", "Wasm"],
    link: "#",
    client: "DeFi Safe",
    year: "2023",
    role: "Kiến trúc sư Frontend",
    challenge: "Bảo mật so với Tính khả dụng. Làm cho việc ký giao dịch trở nên rõ ràng và dễ hiểu đối với người dùng mới.",
    solution: "Triển khai phân tích giao dịch dễ đọc cho con người. Giao diện cảnh báo người dùng về các trò lừa đảo tiềm ẩn bằng thuật toán chấm điểm rủi ro.",
    gallery: [
       "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  },
  {
    id: 6,
    title: "Trang Đích Aero",
    category: "Web",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
    description: "Trang đích đoạt giải thưởng cho một công ty khởi nghiệp hàng không vũ trụ với các hoạt ảnh cuộn ấn tượng.",
    technologies: ["React", "GSAP", "WebGL", "Three.js"],
    link: "#",
    client: "AeroSpace X",
    year: "2024",
    role: "Lập trình viên Sáng tạo",
    challenge: "Khách hàng muốn trải nghiệm 'như phim' trên web để giới thiệu động cơ phản lực mới của họ.",
    solution: "Sử dụng GSAP ScrollTrigger kết hợp với mô hình 3D của động cơ. Khi người dùng cuộn, động cơ tách ra thành các thành phần để hiển thị hoạt động bên trong.",
    gallery: [
       "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1541185933-710f50746747?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  }
];

export const projectsEn: Project[] = [
  {
    id: 1,
    title: "Neon NFT Marketplace",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    description: "A high-performance NFT marketplace featuring a dark mode UI, 3D interactive elements, and seamless wallet integration.",
    technologies: ["React", "Tailwind", "Web3.js", "Three.js"],
    link: "#",
    client: "Nebula Art Corp",
    year: "2023",
    role: "Lead Frontend Engineer",
    challenge: "The client needed a marketplace capable of handling high transaction volumes while maintaining an immersive 'Cyberpunk' aesthetic. Performance was key as 3D NFT previews were causing lag on mobile.",
    solution: "We implemented a custom WebGL renderer optimized for mobile, reducing download times by 40%. The UI uses glassmorphism and neon gradients to align with the brand identity.",
    gallery: [
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop"
    ],
    video: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
    isFeatured: true,
    thanksTitle: "Thanks for Visiting",
    thanksMessage: "Your Likes and Feedback are well appreciated.",
    thanksDescription: "I’m Gin — a digital partner focused on ongoing improvements, helping products evolve through better digital experiences rather than one-time redesigns.",
    thanksLinkText: "Let's talk with me",
    thanksLinkUrl: "/#/contact"
  },
  {
    id: 2,
    title: "EcoDash Analytics",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    description: "A sustainable business dashboard for tracking carbon footprints with real-time data visualization.",
    technologies: ["Next.js", "D3.js", "TypeScript", "Supabase"],
    link: "#",
    client: "GreenEarth Global",
    year: "2024",
    role: "Full Stack Developer",
    challenge: "Converting complex environmental data into actionable insights for non-technical stakeholders. The dashboard needed to handle millions of data points in real-time.",
    solution: "Used D3.js for custom interactive charts. Backend built on Supabase for real-time subscription capabilities. Clean UI using 'calm' color palette to evoke nature.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: true,
    thanksTitle: "Thanks for Visiting",
    thanksMessage: "Your Likes and Feedback are well appreciated.",
    thanksDescription: "Creating sustainable digital solutions requires continuous effort and feedback. We value your input in making the world greener.",
    thanksLinkText: "Let's talk with me",
    thanksLinkUrl: "/#/contact"
  },
  {
    id: 3,
    title: "Gin Portfolio App",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    description: "A productivity app focused on flow state, with ambient sounds and a pomodoro timer.",
    technologies: ["React Native", "Expo", "Firebase", "Reanimated"],
    link: "#",
    client: "Personal Project",
    year: "2023",
    role: "Design & Development",
    challenge: "Most productivity apps are too cluttered. I wanted to create an app that helps users focus through minimalism and audio cues, rather than just lists.",
    solution: "Designed a gesture-based UI with no on-screen buttons on the main view. Smooth 60fps animations using Reanimated 2. Dark mode optimized for OLED screens to save battery.",
    gallery: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: true
  },
  {
    id: 4,
    title: "Flux Design System",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    description: "Comprehensive Figma design system used by over 500 designers worldwide.",
    technologies: ["Figma", "Design Tokens", "Storybook"],
    link: "#",
    client: "Open Source",
    year: "2022",
    role: "Lead Design Systems",
    challenge: "Creating a system flexible enough for both B2B enterprise apps and B2C creative websites.",
    solution: "Built a token-based architecture allowing for multi-brand theming. Included over 200 components and auto-layout patterns.",
    gallery: [
       "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  },
  {
    id: 5,
    title: "Crypto Wallet Core",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639322537228-ad7117a76437?q=80&w=1200&auto=format&fit=crop",
    description: "Secure, decentralized crypto wallet interface with multi-chain support.",
    technologies: ["Vue", "Ethers.js", "Rust", "Wasm"],
    link: "#",
    client: "DeFi Safe",
    year: "2023",
    role: "Frontend Architect",
    challenge: "Security vs Usability. Making transaction signing clear and understandable for new users.",
    solution: "Implemented human-readable transaction parsing. Interface warns users of potential scams using a risk scoring algorithm.",
    gallery: [
       "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  },
  {
    id: 6,
    title: "Aero Landing Page",
    category: "Web",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
    description: "Award-winning landing page for an aerospace startup featuring immersive scroll animations.",
    technologies: ["React", "GSAP", "WebGL", "Three.js"],
    link: "#",
    client: "AeroSpace X",
    year: "2024",
    role: "Creative Developer",
    challenge: "Client wanted a 'cinematic' web experience to showcase their new jet engine.",
    solution: "Used GSAP ScrollTrigger combined with a 3D model of the engine. As users scroll, the engine deconstructs to show inner workings.",
    gallery: [
       "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1541185933-710f50746747?q=80&w=800&auto=format&fit=crop"
    ],
    isFeatured: false
  }
];