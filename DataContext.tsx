
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { projectsVi as initialProjectsVi, projectsEn as initialProjectsEn } from './data';
import { translations as initialTranslations } from './translations';
import { Project, Language, HomeSectionConfig, HomeContentData, AboutSectionConfig, AboutContentData, ContactMessage, Category, ContactContentData, DevOpsConfig } from './types';
import { useLanguage } from './LanguageContext';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Notification {
    type: 'success' | 'error' | 'info';
    message: string;
}

interface DataContextType {
  projects: Project[];
  translationsData: typeof initialTranslations;
  setProjects: (projects: Project[]) => void;
  updateTranslation: (lang: Language, section: string, key: string, value: string) => void;
  addProject: (project: Project) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (id: number) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  cvUrl: string;
  updateCv: (base64String: string) => void;
  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: string, newName: string) => void; 
  deleteCategory: (id: string) => void;
  homeLayout: HomeSectionConfig[];
  updateHomeLayout: (newLayout: HomeSectionConfig[]) => void;
  homeContent: HomeContentData;
  updateHomeContent: (section: keyof HomeContentData, data: any) => void;
  updateAllHomeContent: (data: HomeContentData) => void;
  aboutLayout: AboutSectionConfig[];
  updateAboutLayout: (newLayout: AboutSectionConfig[]) => void;
  aboutContent: AboutContentData;
  updateAllAboutContent: (data: AboutContentData) => void;
  contactContent: ContactContentData;
  updateContactContent: (data: ContactContentData) => void;
  devOpsConfig: DevOpsConfig;
  updateDevOpsConfig: (data: DevOpsConfig) => void;
  supabaseClient: SupabaseClient | null; 
  uploadFile: (file: File) => Promise<string>;
  messages: ContactMessage[];
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  deleteMessage: (id: number) => void;
  deleteMessages: (ids: number[]) => void; 
  markAsRead: (id: number) => void; 
  markAllAsRead: () => void; 
  notification: Notification | null;
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  hideNotification: () => void;
  totalVisits: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const safeSetItem = (key: string, value: string): boolean => {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e: any) {
        console.error('LocalStorage Error:', e);
        return false;
    }
};

const defaultCategories: Category[] = [
    { id: 'Web', name: 'Web' },
    { id: 'Mobile', name: 'Mobile' },
    { id: 'Design', name: 'Design' },
    { id: 'Blockchain', name: 'Blockchain' }
];

const defaultHomeContentVi: HomeContentData = {
  hero: { badge: 'Sẵn sàng làm việc', title1: 'Thiết kế', title2: 'Tương lai', title3: 'Web', desc: "Tôi là Trần Quốc Tuấn. Một chuyên gia thiết kế UI/UX đam mê tạo ra các trải nghiệm kỹ thuật số thân thiện, thẩm mỹ và chuyên nghiệp." },
  about: { badge: 'Về Tôi', title: 'Giấc mơ Số', desc: "Với hơn 7 năm kinh nghiệm chuyên sâu, tôi kết hợp tư duy thiết kế sáng tạo và hiểu biết kỹ thuật để xây dựng những sản phẩm số không chỉ đẹp mắt mà còn tối ưu hóa trải nghiệm người dùng.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
  skills: { title1: 'Phần mềm', title2: 'Chuyên môn', desc: "Các công cụ và kỹ năng tôi sử dụng để hiện thực hóa ý tưởng." },
  featured: { badge: 'Dự án Nổi bật', title1: 'Dự án', title2: 'Tiêu biểu', desc: "Những dự án tiêu biểu định hình phong cách của tôi." },
  cta: { status: 'Trạng thái: Sẵn sàng', title1: 'Bạn có ý tưởng?', title2: "Cùng tạo ra tương lai.", desc: "Tôi hiện đang tìm kiếm cơ hội mới. Dù bạn có thắc mắc hay chỉ muốn chào hỏi!" }
};

const defaultHomeContentEn: HomeContentData = {
  hero: { badge: 'Available for hire', title1: 'Designing the', title2: 'Future', title3: 'Web', desc: "I'm Trần Quốc Tuấn. A passionate UI/UX Designer creating user-friendly, aesthetic, and professional digital experiences." },
  about: { badge: 'About Me', title: 'Digital Dreams', desc: "With over 7 years of specialized experience, I combine creative design thinking with technical understanding to build digital products that are not only visually stunning but also optimized for user experience.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
  skills: { title1: 'Software', title2: 'Expertise', desc: "Tools and skills I utilize to bring creative visions to life." },
  featured: { badge: 'Featured Works', title1: 'Featured', title2: 'Works', desc: "Selected projects that define my style." },
  cta: { status: 'Status: Available', title1: 'Have an idea?', title2: "Let's shape the future.", desc: "I am currently open for new opportunities. Whether you have a question or just want to say hi!" }
};

const defaultHomeLayout: HomeSectionConfig[] = [
  { id: 'hero', label: 'Hero / Introduction', visible: true, order: 0 },
  { id: 'about', label: 'About Summary', visible: true, order: 1 },
  { id: 'skills', label: 'Skills & Tools', visible: true, order: 2 },
  { id: 'featured', label: 'Featured Projects', visible: true, order: 3 },
  { id: 'cta', label: 'Call To Action', visible: true, order: 4 },
];

const defaultAboutLayout: AboutSectionConfig[] = [
    { id: 'intro', label: 'Introduction & Stats', visible: true, order: 0 },
    { id: 'education', label: 'Education Background', visible: true, order: 1 },
    { id: 'experience', label: 'Work Experience', visible: true, order: 2 },
    { id: 'hobbies', label: 'Hobbies & Interests', visible: true, order: 3 },
];

const defaultAboutContentVi: AboutContentData = {
    intro: {
        badge: "Về tôi",
        title1: "Thiết kế",
        title2: "Sáng tạo",
        title3: "&",
        title4: "Thích ứng",
        desc1: "Với hơn",
        desc2_highlight: "7 năm kinh nghiệm",
        desc3: "trong thiết kế UI/UX, tôi đã phát triển khả năng thích ứng và học hỏi nhanh chóng.",
        desc4: "Tôi luôn sẵn sàng khám phá các xu hướng mới, không ngừng cải thiện kỹ năng với niềm đam mê và sự tận tâm.",
        mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        stat_years: "Năm kinh nghiệm",
        stat_companies: "Công ty lớn",
        stat_dedication: "Sự tận tâm"
    },
    education: {
        title: "Học vấn",
        school: "Đại học Nguyễn Tất Thành",
        major: "Chuyên ngành",
        major_val: "Công nghệ Thông tin",
        grade: "Xếp loại",
        grade_val: "Khá"
    },
    experience: {
        title: "Kinh nghiệm làm việc",
        desc: "Hành trình sự nghiệp chuyên nghiệp của tôi.",
        items: [
            { 
                id: 1, 
                year: '2023 - 2025', 
                role: 'UI/UX Designer', 
                company: 'ESUHAI CO., LTD', 
                colorTheme: 'purple', 
                desc: `• Chịu trách nhiệm thiết kế và chỉnh sửa giao diện web.\n• Tham gia nghiên cứu, cập nhật và áp dụng các xu hướng thiết kế UI/UX hiện tại cho Ứng dụng và Trang web vào sản phẩm, theo tiêu chí: sáng tạo, thân thiện với người dùng.\n• Dựa trên thông tin từ nội bộ và đề xuất các tính năng cải tiến sản phẩm bám sát nhu cầu khách hàng.\n• Phối hợp hiệu quả với các thành viên thiết kế khác để đảm bảo tính nhất quán và chính xác khi truyền tải hình ảnh sản phẩm ra bên ngoài.\n• Làm việc chặt chẽ với các kỹ sư phát triển sản phẩm để đề xuất cải tiến tính năng hoặc tối ưu hóa quy trình.\n• Trình bày ý tưởng thiết kế cho các nhóm đa chức năng với tinh thần lãnh đạo.`
            },
            { 
                id: 2, 
                year: '2020 - 2023', 
                role: 'UI/UX Designer', 
                company: 'GLOBAL CARE INSURTECH', 
                colorTheme: 'blue', 
                desc: `• Thiết kế website, mobile app, web app, Landing page và hệ thống theo các dự án do công ty và các đối tác lớn triển khai như GRAB, Ahamove, TGDD, v.v.\n• Thành thạo công cụ thiết kế Figma và một số công cụ thiết kế khác như photoshop, illustrator, canva....\n• Làm việc với PM và BA để lên kế hoạch triển khai sản phẩm, thay đổi thiết kế theo yêu cầu, nghiên cứu và phân tích hành vi, trải nghiệm người dùng cùng BA giúp người dùng có trải nghiệm tốt nhất và tối ưu nhất.\n• Chỉnh sửa và thiết kế lại sản phẩm/ứng dụng của công ty và đối tác.\n• Chịu trách nhiệm thiết kế, xây dựng và hoàn thiện giao diện người dùng, phối hợp với đội ngũ lập trình DEV và PM để quản lý dự án.\n• Hỗ trợ Dev điều chỉnh thiết kế, test thiết kế và hỗ trợ các bộ phận khác khi được yêu cầu.\n• Khả năng làm việc độc lập, thích nghi nhanh với môi trường mới, dự án mới và xử lý công việc trước thời hạn được giao.\n• Luôn làm việc chăm chỉ với tinh thần đồng đội để giúp đỡ và hỗ trợ đồng nghiệp với tinh thần trách nhiệm cao.` 
            },
            { 
                id: 3, 
                year: '2016 - 2019', 
                role: 'UI/UX Designer', 
                company: 'CHỢ TỐT', 
                colorTheme: 'green', 
                desc: `• Thiết kế website và ứng dụng di động theo dự án của công ty và phối hợp với các công ty đối tác để ra mắt sản phẩm kết hợp với các mảng kinh doanh của họ.\n• Phối hợp với đội ngũ lập trình DEV và PM để quản lý dự án. Thiết kế, xây dựng và hoàn thiện giao diện người dùng, đề xuất ý tưởng, giải quyết các vấn đề đang gặp phải.\n• Phối hợp với BA, PM, DEV hoàn thành dự án đúng hạn và trước thời hạn được giao.\n• Hỗ trợ Marketing Team thiết kế các ấn phẩm truyền thông.\n• Có kinh nghiệm thiết kế: Website, Mobile App, Web App, CRM, CMS, Dashboard, Responsive, Design System, Style guide.` 
            }
        ]
    },
    hobbies: {
        title: "Sở thích",
        items: [
            { id: 1, name: "Phim ảnh", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clapper%20Board.png" },
            { id: 2, name: "Nhiếp ảnh", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera.png" },
            { id: 3, name: "Thiết kế", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" },
            { id: 4, name: "Ca hát", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Microphone.png" },
            { id: 5, name: "Bóng đá", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Soccer%20Ball.png" },
            { id: 6, name: "Chơi game", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Video%20Game.png" }
        ]
    }
};

const defaultAboutContentEn: AboutContentData = {
    intro: {
        badge: "About Me",
        title1: "Creative",
        title2: "Design",
        title3: "&",
        title4: "Adaptability",
        desc1: "With over",
        desc2_highlight: "7 years of experience",
        desc3: "in UI/UX design, I have developed a strong ability to adapt and learn quickly.",
        desc4: "I am always ready to explore new trends, constantly improving my skills with passion and dedication.",
        mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        stat_years: "Years Exp",
        stat_companies: "Major Companies",
        stat_dedication: "Dedication"
    },
    education: {
        title: "Education",
        school: "Nguyen Tat Thanh University",
        major: "Major",
        major_val: "Information Technology",
        grade: "Grade",
        grade_val: "Good"
    },
    experience: {
        title: "Work Experience",
        desc: "A timeline of my professional career.",
        items: [
            { 
                id: 1, 
                year: '2023 - 2025', 
                role: 'UI/UX Designer', 
                company: 'ESUHAI CO., LTD', 
                colorTheme: 'purple', 
                desc: `• Responsible for web interface design and editing.\n• Participate in researching, updating and applying current UI/UX design trends for Apps and Websites to products, according to criteria: creative, user-friendly.\n• Based on internal information and propose product improvement features closely following customer needs.\n• Coordinate effectively with other design members to ensure consistency and accuracy when communicating product images externally.\n• Work closely with product development engineers to propose feature improvements or process optimization.\n• Present design ideas to cross-functional teams with a leadership spirit.`
            },
            { 
                id: 2, 
                year: '2020 - 2023', 
                role: 'UI/UX Designer', 
                company: 'GLOBAL CARE INSURTECH', 
                colorTheme: 'blue', 
                desc: `• Design websites, mobile apps, web apps, landing pages and systems according to projects implemented by the company and major partners such as GRAB, Ahamove, TGDD, etc.\n• Proficient in Figma design tools and some other design tools such as photoshop, illustrator, canva....\n• Work with PM and BA to plan product implementation, change design upon request, research and analyze user behavior and experience with BA to help users have the best and most optimal experience.\n• Edit and redesign products/applications of the company and partners.\n• Responsible for designing, building and perfecting user interfaces, coordinating with DEV and PM teams to manage projects.\n• Support Dev to adjust design, test design and support other departments when required.\n• Ability to work independently, adapt quickly to new environments, new projects and handle work before assigned deadlines.\n• Always work hard with teamwork spirit to help and support colleagues with high sense of responsibility.` 
            },
            { 
                id: 3, 
                year: '2016 - 2019', 
                role: 'UI/UX Designer', 
                company: 'CHO TOT', 
                colorTheme: 'green', 
                desc: `• Design websites and mobile applications according to company projects and coordinate with partner companies to launch products combined with their business areas.\n• Coordinate with DEV and PM teams to manage projects. Design, build and complete user interfaces, propose ideas, solve problems being encountered.\n• Coordinate with BA, PM, DEV to complete projects on time and before assigned deadlines.\n• Support Marketing Team to design media publications.\n• Experienced in designing: Website, Mobile App, Web App, CRM, CMS, Dashboard, Responsive, Design System, Style guide.` 
            }
        ]
    },
    hobbies: {
        title: "Hobbies",
        items: [
            { id: 1, name: "Movies", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clapper%20Board.png" },
            { id: 2, name: "Photography", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera.png" },
            { id: 3, name: "Design", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" },
            { id: 4, name: "Singing", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Microphone.png" },
            { id: 5, name: "Soccer", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Soccer%20Ball.png" },
            { id: 6, name: "Gaming", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Video%20Game.png" }
        ]
    }
};

const defaultContactContentVi: ContactContentData = {
    badge: "Liên hệ",
    title1: "Cùng tạo ra",
    title2: "Điều tuyệt vời",
    desc: "Bạn có dự án trong đầu? Hoặc chỉ muốn chào hỏi? Tôi luôn cởi mở với những ý tưởng và hợp tác mới.",
    email: "x6sumo1@gmail.com",
    phone: "093.3456.605",
    address: "100 Lý Tế Xuyên, Linh Đông, Thủ Đức - HCM",
    formTitle: "Gửi tin nhắn cho tôi"
};

const defaultContactContentEn: ContactContentData = {
    badge: "Get in touch",
    title1: "Let's Create",
    title2: "Something Epic",
    desc: "Have a project in mind? Or maybe you just want to say hi? I'm always open to new ideas and collaborations.",
    email: "x6sumo1@gmail.com",
    phone: "093.3456.605",
    address: "100 Lý Tế Xuyên, Linh Đông, Thu Duc - HCM",
    formTitle: "Send me a message"
};

const defaultDevOpsConfig: DevOpsConfig = {
    github: { connected: false, repoUrl: '', branch: 'main', lastCommit: '', accessToken: '' },
    cloudflare: { connected: false, deployHookUrl: '', projectName: '', lastDeploy: '', status: 'idle' },
    supabase: { connected: false, projectUrl: '', anonKey: '' }
};

export const DataProvider = ({ children }: { children?: React.ReactNode }) => {
  const { language } = useLanguage();
  
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [translationsData, setTranslationsData] = useState(initialTranslations);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cvUrl, setCvUrl] = useState<string>('');
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const visitsLoaded = useRef(false);
  
  const [homeLayout, setHomeLayout] = useState<HomeSectionConfig[]>(defaultHomeLayout);
  const [homeContent, setHomeContent] = useState<HomeContentData>(defaultHomeContentVi);
  const [aboutLayout, setAboutLayout] = useState<AboutSectionConfig[]>(defaultAboutLayout);
  const [aboutContent, setAboutContent] = useState<AboutContentData>(defaultAboutContentVi);
  const [contactContent, setContactContent] = useState<ContactContentData>(defaultContactContentVi);
  
  const [devOpsConfig, setDevOpsConfig] = useState<DevOpsConfig>(defaultDevOpsConfig);
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
  
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const projectsKey = `portfolio_projects_${language}`;
    const savedProjects = localStorage.getItem(projectsKey);
    if (savedProjects) {
        setProjectsState(JSON.parse(savedProjects));
    } else {
        setProjectsState(language === 'vi' ? initialProjectsVi : initialProjectsEn);
    }

    const savedCats = localStorage.getItem('portfolio_categories');
    if (savedCats) {
        setCategories(JSON.parse(savedCats));
    } else {
        setCategories(defaultCategories);
    }

    const homeContentKey = `portfolio_home_content_${language}`;
    const savedHomeContent = localStorage.getItem(homeContentKey);
    if (savedHomeContent) {
        setHomeContent(JSON.parse(savedHomeContent));
    } else {
        setHomeContent(language === 'vi' ? defaultHomeContentVi : defaultHomeContentEn);
    }

    const aboutContentKey = `portfolio_about_content_${language}`;
    const savedAboutContent = localStorage.getItem(aboutContentKey);
    if (savedAboutContent) {
        setAboutContent(JSON.parse(savedAboutContent));
    } else {
        setAboutContent(language === 'vi' ? defaultAboutContentVi : defaultAboutContentEn);
    }

    const contactContentKey = `portfolio_contact_content_${language}`;
    const savedContactContent = localStorage.getItem(contactContentKey);
    if (savedContactContent) {
        setContactContent(JSON.parse(savedContactContent));
    } else {
        setContactContent(language === 'vi' ? defaultContactContentVi : defaultContactContentEn);
    }

    const savedCv = localStorage.getItem('portfolio_cv');
    if (savedCv) setCvUrl(savedCv);

    const savedHomeLayout = localStorage.getItem('portfolio_home_layout');
    if (savedHomeLayout) setHomeLayout(JSON.parse(savedHomeLayout));

    const savedAboutLayout = localStorage.getItem('portfolio_about_layout');
    if (savedAboutLayout) setAboutLayout(JSON.parse(savedAboutLayout));

    const savedDevOps = localStorage.getItem('portfolio_devops');
    if (savedDevOps) {
        const config = JSON.parse(savedDevOps);
        setDevOpsConfig(config);
        
        if (config.supabase?.projectUrl && config.supabase?.anonKey) {
            try {
                const client = createClient(config.supabase.projectUrl, config.supabase.anonKey);
                setSupabaseClient(client);
            } catch (e) {
                console.error("Failed to init Supabase client", e);
            }
        }
    }

    const savedMessages = localStorage.getItem('portfolio_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);

    if (!visitsLoaded.current) {
        const savedVisits = localStorage.getItem('portfolio_total_visits');
        let currentVisits = savedVisits ? parseInt(savedVisits) : 12500;
        currentVisits++;
        setTotalVisits(currentVisits);
        localStorage.setItem('portfolio_total_visits', currentVisits.toString());
        visitsLoaded.current = true;
    }
  }, [language]);

  const saveProjects = (newProjects: Project[]) => {
    setProjectsState(newProjects);
    const projectsKey = `portfolio_projects_${language}`;
    safeSetItem(projectsKey, JSON.stringify(newProjects));
  };

  const saveTranslations = (newTranslations: typeof initialTranslations) => {
    setTranslationsData(newTranslations);
    safeSetItem('portfolio_translations', JSON.stringify(newTranslations));
  };

  const updateCv = (base64String: string) => {
    setCvUrl(base64String);
    safeSetItem('portfolio_cv', base64String);
  };

  // --- SUPABASE UPLOAD (STRICT MODE) ---
  const uploadFile = async (file: File): Promise<string> => {
      // STRICT CHECK: We do NOT fallback to Base64/LocalStorage if Supabase is missing.
      // This ensures the user is forced to connect Supabase for a "Real" app experience.
      if (!supabaseClient) {
          const errorMsg = "❌ LỖI: Chưa kết nối Supabase Storage!\n\nBạn đang ở chế độ 'Chạy Thật', nên hệ thống từ chối lưu ảnh vào bộ nhớ tạm trình duyệt (vì nó không bền vững).\n\nVui lòng vào Admin > DevOps Center và điền thông tin Supabase Project URL & Anon Key.";
          alert(errorMsg);
          throw new Error("Supabase not connected");
      }

      try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `uploads/${fileName}`;

          // Upload to 'portfolio' bucket
          const { error: uploadError } = await supabaseClient.storage
              .from('portfolio') 
              .upload(filePath, file);

          if (uploadError) {
              console.error("Supabase Upload Error:", uploadError);
              throw uploadError;
          }

          const { data: publicUrlData } = supabaseClient.storage
              .from('portfolio')
              .getPublicUrl(filePath);

          return publicUrlData.publicUrl;
      } catch (error: any) {
          console.error("Critical Upload Error:", error);
          if (error.message && error.message.includes('bucket not found')) {
             alert("❌ LỖI BUCKET: Supabase đã kết nối nhưng chưa tìm thấy Bucket 'portfolio'.\n\nVui lòng vào Supabase Dashboard > Storage > Create new bucket > Đặt tên là 'portfolio' và chọn 'Public Bucket'.");
          } else {
             alert(`❌ LỖI UPLOAD: ${error.message || 'Không xác định'}`);
          }
          throw error;
      }
  };

  const addProject = (project: Project) => {
    const newProjects = [project, ...projects];
    saveProjects(newProjects);
  };

  const updateProject = (updatedProject: Project) => {
    const newProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    saveProjects(newProjects);
  };

  const deleteProject = (id: number) => {
    const newProjects = projects.filter(p => p.id !== id);
    saveProjects(newProjects);
  };

  const addCategory = (name: string) => {
      const newCat: Category = { id: name, name: name };
      setCategories(prev => {
          if (prev.some(c => c.id === newCat.id)) return prev;
          const updated = [...prev, newCat];
          safeSetItem('portfolio_categories', JSON.stringify(updated));
          return updated;
      });
  };

  const updateCategory = (id: string, newName: string) => {
      setCategories(prev => {
          const updated = prev.map(c => c.id === id ? { ...c, id: newName, name: newName } : c);
          safeSetItem('portfolio_categories', JSON.stringify(updated));
          return updated;
      });

      setProjectsState(prev => {
           const updated = prev.map(p => p.category === id ? { ...p, category: newName } : p);
           saveProjects(updated);
           return updated;
      });
  };

  const deleteCategory = (id: string) => {
      setCategories(prev => {
          const updated = prev.filter(c => String(c.id) !== String(id));
          safeSetItem('portfolio_categories', JSON.stringify(updated));
          return updated;
      });
  };

  const updateTranslation = (lang: Language, section: string, key: string, value: string) => {
    const newTrans = { ...translationsData };
    // @ts-ignore
    if (newTrans[lang][section]) {
        // @ts-ignore
        newTrans[lang][section][key] = value;
        saveTranslations(newTrans);
    }
  };

  const updateHomeLayout = (newLayout: HomeSectionConfig[]) => {
      setHomeLayout(newLayout);
      safeSetItem('portfolio_home_layout', JSON.stringify(newLayout));
  };

  const updateHomeContent = (section: keyof HomeContentData, data: any) => {
      const newContent = { ...homeContent, [section]: { ...homeContent[section], ...data } };
      setHomeContent(newContent);
      const key = `portfolio_home_content_${language}`;
      safeSetItem(key, JSON.stringify(newContent));
  };

  const updateAllHomeContent = (data: HomeContentData) => {
      setHomeContent(data);
      const key = `portfolio_home_content_${language}`;
      safeSetItem(key, JSON.stringify(data));
  };

  const updateAboutLayout = (newLayout: AboutSectionConfig[]) => {
      setAboutLayout(newLayout);
      safeSetItem('portfolio_about_layout', JSON.stringify(newLayout));
  };

  const updateAllAboutContent = (data: AboutContentData) => {
      setAboutContent(data);
      const key = `portfolio_about_content_${language}`;
      safeSetItem(key, JSON.stringify(data));
  };

  const updateContactContent = (data: ContactContentData) => {
      setContactContent(data);
      const key = `portfolio_contact_content_${language}`;
      safeSetItem(key, JSON.stringify(data));
  };

  const updateDevOpsConfig = (data: DevOpsConfig) => {
      setDevOpsConfig(data);
      safeSetItem('portfolio_devops', JSON.stringify(data));
      
      if (data.supabase.projectUrl && data.supabase.anonKey) {
          try {
              const client = createClient(data.supabase.projectUrl, data.supabase.anonKey);
              setSupabaseClient(client);
          } catch (e) {
              console.error("Failed to update Supabase client", e);
          }
      }
  };

  const sendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
      const newMessage: ContactMessage = {
          ...msg,
          id: Date.now(),
          date: new Date().toISOString(),
          read: false
      };
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      safeSetItem('portfolio_messages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (id: number) => {
      const updatedMessages = messages.filter(m => m.id !== id);
      setMessages(updatedMessages);
      safeSetItem('portfolio_messages', JSON.stringify(updatedMessages));
  };

  const deleteMessages = (ids: number[]) => {
      const updatedMessages = messages.filter(m => !ids.includes(m.id));
      setMessages(updatedMessages);
      safeSetItem('portfolio_messages', JSON.stringify(updatedMessages));
  };

  const markAsRead = (id: number) => {
      const updatedMessages = messages.map(m => m.id === id ? { ...m, read: true } : m);
      setMessages(updatedMessages);
      safeSetItem('portfolio_messages', JSON.stringify(updatedMessages));
  };

  const markAllAsRead = () => {
      const updatedMessages = messages.map(m => ({ ...m, read: true }));
      setMessages(updatedMessages);
      safeSetItem('portfolio_messages', JSON.stringify(updatedMessages));
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
      setNotification({ type, message });
      setTimeout(() => {
          setNotification(null);
      }, 4000); 
  };

  const hideNotification = () => {
      setNotification(null);
  };

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      safeSetItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <DataContext.Provider value={{
      projects,
      translationsData,
      setProjects: saveProjects,
      updateTranslation,
      addProject,
      updateProject,
      deleteProject,
      isAuthenticated,
      login,
      logout,
      cvUrl,
      updateCv,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      homeLayout,
      updateHomeLayout,
      homeContent,
      updateHomeContent,
      updateAllHomeContent,
      aboutLayout,
      updateAboutLayout,
      aboutContent,
      updateAllAboutContent,
      contactContent,
      updateContactContent,
      devOpsConfig,
      updateDevOpsConfig,
      supabaseClient,
      uploadFile,
      messages,
      sendMessage,
      deleteMessage,
      deleteMessages,
      markAsRead,
      markAllAsRead,
      notification,
      showNotification,
      hideNotification,
      totalVisits
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
