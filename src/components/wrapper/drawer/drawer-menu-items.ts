import {
  // BookPlus,
  // Building2,
  Database,
  // Layers3Icon,
  // NotebookPen,
  // Settings2,
  User2,
  // Bell,
  // Users2,
  // MapPin,
  // Layers2,
  // SendToBack,
  // AlignVerticalDistributeCenter,
  AlertTriangle,
  // Box,
  Shield,
  // FileText,
  ClipboardList,
  // UserCog,
  Building,
  // FolderKanban,
  // MessageSquare,
  AlertCircle,
  // Wrench,
  // FileCheck,
  // Calendar,
  // Award,
  // FileType,
  Settings,
} from "lucide-react";

// System Management
export const drawerMenuItems = [
  {
    title: "User Management",
    href: "/user",
    icon: User2,
  },
  {
    title: "Role & Permissions",
    href: "/role",
    icon: Shield,
  },
  {
    title: "Module Settings",
    href: "/module",
    icon: Settings,
  },
  {
    title: "Agency Management",
    href: "/agency",
    icon: Building,
  },
  {
    title: "Department Setup",
    href: "/department",
    icon: Database,
  },
  // {
  //   title: "SOP Documentation",
  //   href: "/sop",
  //   icon: FileText,
  // },
  // {
  //   title: "Blog Management",
  //   href: "/blog",
  //   icon: NotebookPen,
  // },
  // {
  //   title: "Notification Center",
  //   href: "/notification",
  //   icon: Bell,
  // },
];

// Policy Management
export const drawerPolicyLead = [
  {
    title: "Policy Dashboard",
    href: "/policy-management",
    icon: ClipboardList,
  },
  {
    title: "Escalated Cases",
    href: "/policy-escalated",
    icon: AlertTriangle,
  },
  {
    title: "High Priority",
    href: "/policy-alert",
    icon: AlertCircle,
  },
];

// Lead Management
// export const drawerMenuLead = [
//   {
//     title: "Customer Database",
//     href: "/lead-customer",
//     icon: Users2,
//   },
//   {
//     title: "Territory Management",
//     href: "/lead-territory",
//     icon: MapPin,
//   },
// ];

// Customer Service
// export const drawerMenuCustomerService = [
//   {
//     title: "Service Categories",
//     href: "/customer-service-category",
//     icon: FolderKanban,
//   },
//   {
//     title: "Customer Portal",
//     href: "/customer-service-customer",
//     icon: Users2,
//   },
//   {
//     title: "Agent Management",
//     href: "/customer-service-agent",
//     icon: UserCog,
//   },
// ];

// Tools & Utilities
// export const drawerMenuTools = [
//   {
//     title: "OEP Management",
//     href: "/oep",
//     icon: Wrench,
//   },
//   {
//     title: "AOR Processing",
//     href: "/oep-aor",
//     icon: FileCheck,
//   },
//   {
//     title: "Appointment Scheduler",
//     href: "/oep-appointment",
//     icon: Calendar,
//   },
//   {
//     title: "License Management",
//     href: "/oep-license-type",
//     icon: Award,
//   },
//   {
//     title: "Document Manager",
//     href: "/oep-manage",
//     icon: FileType,
//   },
// ];
