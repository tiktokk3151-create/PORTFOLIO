
export type Language = 'vi' | 'en';

export interface Category {
  id: string;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  category: string; // Changed from literal union to string to support dynamic categories
  image: string;
  description: string;
  technologies: string[];
  link?: string;
  // Extended details
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
  video?: string; 
  isFeatured?: boolean;
  // Thanks Section (New)
  thanksTitle?: string;
  thanksMessage?: string;
  thanksDescription?: string;
  thanksLinkText?: string;
  thanksLinkUrl?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

// --- NEW TYPES FOR HOME CMS ---

export type SectionId = 'hero' | 'about' | 'skills' | 'featured' | 'cta';

export interface HomeSectionConfig {
  id: SectionId;
  label: string;
  visible: boolean;
  order: number;
}

export interface HomeContentData {
  hero: {
    badge: string;
    title1: string;
    title2: string; 
    title3: string;
    desc: string;
  };
  about: {
    badge: string;
    title: string;
    desc: string;
    image: string; // Added image field
  };
  skills: {
    title1: string;
    title2: string;
    desc: string;
  };
  featured: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
  };
  cta: {
    status: string;
    title1: string;
    title2: string;
    desc: string;
  };
}

// --- NEW TYPES FOR ABOUT CMS ---

export type AboutSectionId = 'intro' | 'education' | 'experience' | 'hobbies';

export interface AboutSectionConfig {
  id: AboutSectionId;
  label: string;
  visible: boolean;
  order: number;
}

export interface ExperienceItem {
    id: number;
    year: string;
    role: string;
    company: string;
    desc: string; // HTML string or plain text
    colorTheme: 'purple' | 'blue' | 'green' | 'pink' | 'orange'; // For UI styling
}

export interface HobbyItem {
    id: number;
    name: string;
    image: string;
}

export interface AboutContentData {
    intro: {
        badge: string;
        title1: string;
        title2: string;
        title3: string;
        title4: string;
        desc1: string;
        desc2_highlight: string;
        desc3: string;
        desc4: string;
        mainImage: string;
        stat_years: string;
        stat_companies: string;
        stat_dedication: string;
    };
    education: {
        title: string;
        school: string;
        major: string;
        major_val: string;
        grade: string;
        grade_val: string;
    };
    experience: {
        title: string;
        desc: string;
        items: ExperienceItem[];
    };
    hobbies: {
        title: string;
        items: HobbyItem[];
    };
}

// --- NEW TYPES FOR CONTACT CMS ---
export interface ContactContentData {
    badge: string;
    title1: string;
    title2: string; // Gradient part
    desc: string;
    email: string;
    phone: string;
    address: string;
    formTitle: string;
}

// --- DEVOPS CONFIG ---
export interface DevOpsConfig {
    github: {
        connected: boolean;
        repoUrl: string;
        branch: string;
        lastCommit: string;
        accessToken?: string; // New: For pushing code via API
    };
    cloudflare: {
        connected: boolean;
        deployHookUrl: string;
        projectName: string;
        lastDeploy: string;
        status: 'idle' | 'building' | 'success' | 'error';
    };
    supabase: {
        connected: boolean;
        projectUrl: string;
        anonKey: string;
    };
}