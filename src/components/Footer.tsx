import React, { useState } from "react";
import { Image } from "antd";
import {
  GithubOutlined,
  XOutlined,
  DiscordFilled,
  LinkedinFilled,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import FOOTER_SECTION from "../constants/content/footer.json";
import { FooterSection, FooterLink } from "../types/components/Footer.types";

const CustomFooter: React.FC = () => {
  const year = new Date().getFullYear();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id="footer"
      className="bg-[#1b2540] text-white px-8 py-6 lg:px-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full">
        <div className="w-full md:flex-1">
          <div className="flex flex-col gap-2 pt-12">
            <a href="https://www.accordproject.org" target="_blank" className="flex items-center w-full">
              <Image
                src="/logo.png"
                alt="Template Playground"
                preview={false}
                className="h-auto max-w-[256px]"
                width={256}
                height={36}
              />
            </a>
            <p className="text-white/65 text-sm mt-2">
              The open-source smart legal contract stack
            </p>
            <a href="mailto:admin@accordproject.org" className="text-white/65 hover:text-teal-400 transition-colors font-medium mt-2">
              admin@accordproject.org
            </a>
            <a href="https://discord.com/invite/Zm99SKhhtA" target="_blank" className="inline-block">
              <button className="px-8 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-[#050c40] font-medium transition-colors mt-2">
                Join 
              </button>
            </a>
          </div>
        </div>

        <div className="w-full md:flex-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="md:hidden text-white text-base mb-2 flex items-center gap-2"
          >
            {expanded ? <UpOutlined /> : <DownOutlined />} Other Links
          </button>

          <div className={`${expanded ? 'flex' : 'hidden'} md:flex md:flex-nowrap gap-4`}>
              {FOOTER_SECTION.sections.map((section: FooterSection) => (
                <div key={section.title} className="flex-1 min-w-[120px] px-1">
                  <div className="flex flex-col gap-1 pt-8">
                    <h3 className="text-white/65 text-xs uppercase tracking-wide mb-3 font-semibold">
                      {section.title}
                    </h3>
                    {section.links.map((link: FooterLink) => (
                      <a
                        href={link.href}
                        key={link.title}
                        className="text-white mb-2 text-base hover:text-teal-400 transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-white/20">
        <div>
          <div className="text-white/85">
            copyright © {year} accord project &bull;{' '}
            <a
              href="https://accordproject.org/privacy"
              target="_blank"
              className="text-white/85 hover:text-teal-400 transition-colors font-semibold"
            >
              trademark policy
            </a>{' '}
            &bull;{' '}
            <a
              href="https://accordproject.org/brand-assets"
              target="_blank"
              className="text-white/85 hover:text-teal-400 transition-colors font-semibold"
            >
              brand assets
            </a>
          </div>
        </div>

        <div>
          <div className="flex gap-2">
            <a href="https://github.com/accordproject" target="_blank" className="text-white/85 hover:text-teal-400 transition-colors">
              <GithubOutlined className="text-xl" />
            </a>
            <a href="https://twitter.com/AccordHQ" target="_blank" className="text-white/85 hover:text-teal-400 transition-colors">
              <XOutlined className="text-lg" />
            </a>
            <a href="https://discord.com/invite/Zm99SKhhtA" target="_blank" className="text-white/85 hover:text-teal-400 transition-colors">
              <DiscordFilled className="text-lg" />
            </a>
            <a href="https://www.linkedin.com/company/accordproject/" target="_blank" className="text-white/85 hover:text-teal-400 transition-colors">
              <LinkedinFilled className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFooter;
