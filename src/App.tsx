import { useEffect, useState } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import tour from "./components/Tour";
import AgreementData from "./editors/editorsContainer/AgreementData";
import LearnNow from "./pages/LearnNow";
import AgreementHtml from "./AgreementHtml";
import Errors from "./utils/helpers/Errors";
import TemplateMarkdown from "./editors/editorsContainer/TemplateMarkdown";
import TemplateModel from "./editors/editorsContainer/TemplateModel";
import useAppStore from "./store/store";
import SampleDropdown from "./components/SampleDropdown";
import UseShare from "./components/UseShare";
import LearnContent from "./components/Content";
import FloatingFAB from "./components/FabButton";
import ResizableContainer from "./components/ResizableContainer";



const App = () => {
  const navigate = useNavigate();
  const init = useAppStore((state) => state.init);
  const loadFromLink = useAppStore((state) => state.loadFromLink);
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const textColor = useAppStore((state) => state.textColor);
  const [activePanel, setActivePanel] = useState<string | undefined>('templateMark');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const scrollToFooter = () => {
    const exploreContent = document.getElementById("footer");
    if (exploreContent) {
      exploreContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChange = (key: string) => {
    setActivePanel(activePanel === key ? undefined : key);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        const compressedData = searchParams.get("data");
        if (compressedData) {
          await loadFromLink(compressedData);
          if (window.location.pathname !== "/") {
            navigate("/", { replace: true });
          }
        } else {
          await init();
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, [init, loadFromLink, searchParams, navigate]);

  useEffect(() => {
    const startTour = async () => {
      try {
        await tour.start();
        localStorage.setItem("hasVisited", "true");
      } catch (error) {
        console.error("Tour failed to start:", error);
      }
    };

    const showTour = searchParams.get("showTour") === "true";
    if (showTour || !localStorage.getItem("hasVisited")) {
      startTour();
    }
  }, [searchParams]);

  const panels = [
    {
      key: "templateMark",
      label: "TemplateMark",
      children: <TemplateMarkdown />,
    },
    {
      key: "model",
      label: "Concerto Model",
      children: <TemplateModel />,
    },
    {
      key: "data",
      label: "Preview Data",
      children: <AgreementData />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar scrollToFooter={scrollToFooter} />
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 64px - 70px)' }}>
            <Spinner />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <div className="pt-6 pl-12 pb-6 pr-12   space-y-6 bg-white text-gray-900 flex-1 min-h-[600px]" style={{ background: backgroundColor, color: textColor }}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="flex gap-2">
                        <SampleDropdown setLoading={setLoading} />
                        <UseShare />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <Errors />
                    </div>
                  </div>
                  <div className=" min-h-[500px]" style={{ background: backgroundColor }}>
                    <ResizableContainer
                     
                      leftPane={
                        <div className="h-full w-full overflow-auto ">
                          {panels.map((panel, index) => (
                            <div key={panel.key} className={`border border-#ddd ${index === 0 ? 'rounded-t-lg' : ''} ${index === panels.length - 1 ? 'rounded-b-lg' : ''}`} >
                             
                              <button
                                className={`w-full bg-slate-50 text-left p-3 flex items-center gap-2 text-sm ${index === 0 ? 'rounded-t-lg' : ''} ${activePanel === panel.key ? 'border border-#ddd' : ''}`}
                                onClick={() => onChange(panel.key)}
                              >
                                <svg
                                  className={`w-4 h-4 transform transition-transform duration-200 ${activePanel === panel.key ? 'rotate-90' : 'rotate-0'}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                {panel.label}
                              </button>
                            
                              <div className={`p-4 ${activePanel === panel.key ? 'block' : 'hidden'}`}>
                                {panel.children}
                              </div>
                            </div>
                          ))}
                        </div>
                      }
                      rightPane={
                        <div className="h-full  bg-white rounded-lg shadow-sm">
                          <AgreementHtml loading={loading} isModal={false} />
                        </div>
                      }
                      initialLeftWidth={66}
                      minLeftWidth={30}
                      minRightWidth={30}
                    />
                  </div>
                  <FloatingFAB />
                </div>
              }
            />
            <Route path="/learn" element={<LearnNow />}>
              <Route path="intro" element={<LearnContent file="intro.md" />} />
              <Route path="module1" element={<LearnContent file="module1.md" />} />
              <Route path="module2" element={<LearnContent file="module2.md" />} />
              <Route path="module3" element={<LearnContent file="module3.md" />} />
            </Route>
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
};

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="h-8 w-8 border-4 border-[#19c6c7] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default App;