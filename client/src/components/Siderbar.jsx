import {
  Home,
  User,
  History,
  PlaySquare,
  ListVideo,
  Flame,
  ShoppingBag,
  Music,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCap,
  Shirt,
  Mic2,
  Star,
  Music2,
  Smile,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const sections = [
  {
    title: "Main",
    heading: "",
    links: [
      { icon: <Home color="black" stroke="black" />, label: "Home" },
      { icon: <PlaySquare />, label: "Shorts" },
      { icon: <ListVideo />, label: "Subscriptions" },
    ],
  },
  {
    title: "User",
    heading: "You",
    links: [
      { icon: <User />, label: "User" },
      { icon: <History />, label: "History" },
    ],
  },
  {
    title: "Explore",
    heading: "Explore",
    links: [
      { icon: <Flame />, label: "Trending" },
      { icon: <ShoppingBag />, label: "Shopping" },
      { icon: <Music />, label: "Music" },
      { icon: <Film />, label: "Films" },
      { icon: <Radio />, label: "Live" },
      { icon: <Gamepad2 />, label: "Gaming" },
      { icon: <Newspaper />, label: "News" },
      { icon: <Trophy />, label: "Sport" },
      { icon: <GraduationCap />, label: "Courses" },
      { icon: <Shirt />, label: "Fashion & Beauty" },
      { icon: <Mic2 />, label: "Podcasts" },
    ],
  },
  {
    title: "More from YouTube",
    heading: "More from YouTube",
    links: [
      { icon: <Star />, label: "YouTube Premium" },
      { icon: <Music2 />, label: "YouTube Music" },
      { icon: <Smile />, label: "YouTube Kids" },
    ],
  },
  {
    title: "Settings",
    heading: "",
    links: [
      { icon: <Settings />, label: "Settings" },
      { icon: <Flag />, label: "Report History" },
      { icon: <HelpCircle />, label: "Help" },
      { icon: <MessageSquare />, label: "Send Feedback" },
    ],
  },
];

// Sidebar
const Sidebar = ({ isCollapsed }) => {
  const collapsedLinks = [
    { icon: <Home color="black" stroke="black" />, label: "Home" },
    { icon: <PlaySquare />, label: "Shorts" },
    { icon: <ListVideo />, label: "Subscriptions" },
    { icon: <User />, label: "You" },
  ];

  if (isCollapsed) {
    return (
      <aside className="w-20 h-screen p-3 bg-white border-gray-200 flex flex-col items-center gap-6">
        {collapsedLinks.map((link, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-xs cursor-pointer hover:bg-gray-100 rounded-lg p-2 w-full"
          >
            <div className="w-6 h-6 mb-1">{link.icon}</div>
            <span className="text-[10px]">{link.label}</span>
          </div>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-60 h-screen p-4  border-gray-200 bg-white overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <ul>
            {section.heading && (
              <h3 className="text-lg font-semibold mb-1.5">
                {section.heading}
              </h3>
            )}
            {section.links.map((link, i) => (
              <li
                key={i}
                className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
              >
                <span className="w-5 h-5">{link.icon}</span>
                <span>{link.label}</span>
              </li>
            ))}
          </ul>

          {/* Divider between sections */}
          {index !== sections.length - 1 && (
            <hr className="my-4 border-t border-gray-200" />
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
