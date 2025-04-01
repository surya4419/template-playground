import { useState } from "react";
import { Menu, Dropdown, Button, Image, Grid } from "antd";
import { useSpring, animated } from "react-spring";
import { useLocation, Link } from "react-router-dom";
import {
  GithubOutlined,
  QuestionOutlined,
  UserOutlined,
  InfoOutlined,
  BookOutlined,
  
  MenuOutlined
} from "@ant-design/icons";
import ToggleDarkMode from "./ToggleDarkMode";

const { useBreakpoint } = Grid;

interface NavbarProps {
  scrollToFooter: () => void;
}

function Navbar({ scrollToFooter }: NavbarProps) {
  const [hovered, setHovered] = useState<
    null | "home" | "explore" | "help" | "github" | "join"
  >(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();

  const props = useSpring({
    loop: true,
    from: { 
      opacity: 0.5, 
      boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
      height: "36px" ,
      margin:"12px"
    },
    to: [
      { 
        opacity: 1, 
        boxShadow: "0px 0px 5px rgba(255, 255, 255, 1)",
        height: "36px" ,
        margin:"12px"
      },
      { 
        opacity: 0.9, 
        boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
        height: "36px" ,
        margin:"12px"

      },
    ],
    config: { duration: 1000 },
  });
  

  const mobileMenu = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/">
          Template Playground
        </Link>
      </Menu.Item>
      <Menu.Item key="explore" onClick={scrollToFooter}>
        Explore
      </Menu.Item>
      <Menu.Item key="about">
        <a
          href="https://github.com/accordproject/template-playground/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuestionOutlined /> About
        </a>
      </Menu.Item>
      <Menu.Item key="community">
        <a
          href="https://discord.com/invite/Zm99SKhhtA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UserOutlined /> Community
        </a>
      </Menu.Item>
      <Menu.Item key="issues">
        <a
          href="https://github.com/accordproject/template-playground/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InfoOutlined /> Issues
        </a>
      </Menu.Item>
      <Menu.Item key="documentation">
        <a
          href="https://github.com/accordproject/template-engine/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOutlined /> Documentation
        </a>
      </Menu.Item>
    </Menu>
  );

  const menuItemStyle = (key: string, isLast: boolean) => ({
    display: "flex",
    alignItems: "center",
    padding: screens.md ? "0 20px" : "0",
    backgroundColor:
      hovered === key ? "rgba(255, 255, 255, 0.1)" : "transparent",
    height: "65px",
    borderRight:
      screens.md && !isLast ? "1.5px solid rgba(255, 255, 255, 0.1)" : "none",
  });

  const isLearnPage = location.pathname.startsWith("/learn");

  return (
    <div
      style={{
        background: "#1b2540",
        height: "65px",
        lineHeight: "65px",
        display: "flex",
        alignItems: "center",
        paddingLeft: screens.lg ? 40 : screens.md ? 10 : 10,
        paddingRight: screens.lg ? 40 : screens.md ? 10 : 10,
      }}
    >
      <div
        style={{
          cursor: "pointer",
          ...menuItemStyle("home", false),
        }}
        onMouseEnter={() => setHovered("home")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          to="/"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src={screens.lg ? "/logo.png" : "/accord_logo.png"}
            alt="Template Playground"
            preview={false}
            style={{
              paddingRight: screens.md ? "8px" : "2px",
              height: "26px",
              maxWidth: screens.md ? "184.17px" : "36.67px",
            }}
          />
          <span style={{ color: "white", display: screens.lg ? "block" : "none" }}>Template Playground</span>

        </Link>
      </div>
      {screens.md ? (
        <>
          <div
            style={{
              ...menuItemStyle("explore", false),
              cursor: "pointer",
            }}
            onClick={scrollToFooter}
            onMouseEnter={() => setHovered("explore")}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={{ color: "white" }}>Explore</span>
          </div>
          <div
            style={{
              ...menuItemStyle("help", false),
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered("help")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHelpOpen(!isHelpOpen);
                }}
                className="px-4 h-16 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Help
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isHelpOpen && (
                <div className="absolute top-16 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-40 py-3 z-50 divide-y divide-gray-100" onClick={(e) => e.stopPropagation()}>
                  <a href="https://github.com/accordproject/template-playground/blob/main/README.md" target="_blank" className="flex items-center px-3 py-1.5 hover:bg-gray-100 transition-colors text-sm text-black">
                    <QuestionOutlined className="mr-2 text-sm" />
                    About
                  </a>
                  <a href="https://discord.com/invite/Zm99SKhhtA" target="_blank" className="flex items-center px-3 py-1.5 hover:bg-gray-100 transition-colors text-sm text-black">
                    <UserOutlined className="mr-2 text-sm" />
                    Community
                  </a>
                  <a href="https://github.com/accordproject/template-playground/issues" target="_blank" className="flex items-center px-3 py-1.5 hover:bg-gray-100 transition-colors text-sm text-black">
                    <InfoOutlined className="mr-2 text-sm" />
                    Issues
                  </a>
                  <a href="https://github.com/accordproject/template-engine/blob/main/README.md" target="_blank" className="flex items-center px-3 py-1.5 hover:bg-gray-100 transition-colors text-sm text-black">
                    <BookOutlined className="mr-2 text-sm" />
                    Documentation
                  </a>
                </div>
              )}
            </div>

          </div>
        </>
      ) : (
        <div style={{ marginLeft: "5px" }}>
          <Dropdown overlay={mobileMenu} trigger={["click"]}>
            <Button
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                height: "65px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MenuOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Dropdown>
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          alignItems: "center",
          height: "65px",
          gap: screens.md ? "20px" : "10px",
          marginRight: screens.md ? 0 : "5px"
        }}
      >
        <div style={{ marginLeft: screens.md ? 0 : "auto" }}>
          <ToggleDarkMode />
        </div>
        {!isLearnPage && (
          <div
            style={{
            
              height: "65px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                hovered === "join" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered("join")}
            onMouseLeave={() => setHovered(null)}
          >
  <Link to="/learn/intro" className="learnNow-button">
              <animated.button
                style={{
                  ...props,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 22px",
                  backgroundColor: "#19c6c7",
                  color: "#050c40",
                  border: "none",
                  borderRadius: "5px",
          
                  cursor: "pointer",
                 
                }}
              >
                Learn
              </animated.button>
            </Link>       
             </div>
        )}
        <div
          style={{
            height: "65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: screens.md ? "0 20px" : "0 10px",
            borderRadius: "5px",
            borderLeft: screens.md
              ? "1.5px solid rgba(255, 255, 255, 0.1)"
              : "none",
            paddingLeft: screens.md ? 16 : 5,
            paddingRight: screens.md ? 16 : 5,
            backgroundColor:
              hovered === "github" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered("github")}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="https://github.com/accordproject/template-playground"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
            <GithubOutlined
              style={{
                fontSize: "20px",
                color: "white",
                marginRight: screens.md ? "5px" : "0",
              }}
            />
            <span style={{ display: screens.md ? "inline" : "none" }}>Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
