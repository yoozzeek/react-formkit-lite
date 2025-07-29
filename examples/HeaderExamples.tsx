import Header from "@/components/Header";
import Button from "@/components/Button";
import { Modal, ModalProvider } from "@yoozzeek/react-context-modal";
import { useState } from "react";
import useIsTabletOrDesktop from "@/hooks/useIsTabletOrDesktop.ts";

export default function HeaderExamples() {
  const [stickyHeaderExampleOpen, setStickyHeaderExampleOpen] = useState(false);
  const [transparentStickyColor, setTransparentStickyColor] = useState(false);
  const isTabletOrDesktop = useIsTabletOrDesktop();
  return (
    <section id="header_examples">
      <header>
        <h2>Header examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/HeaderFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Basic</h3>
        <Header title="Title" classes="example_header" />
      </div>
      <div>
        <h3>Go back button</h3>
        <Header
          title="Title"
          classes="example_header"
          onGoBack={() => alert("Go back button clicked")}
        />
      </div>
      <div>
        <h3>Action button</h3>
        <Header
          title="Title"
          classes="example_header"
          action={{
            onClick: () => alert("Action button clicked"),
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
        }}
      >
        <h3>Sticky (on mobile)</h3>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
          }}
        >
          <Button fullWidth onClick={() => setStickyHeaderExampleOpen(true)}>
            View default
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setTransparentStickyColor(true);
              setStickyHeaderExampleOpen(true);
            }}
          >
            View transparent
          </Button>
        </div>
        {stickyHeaderExampleOpen && (
          <ModalProvider>
            <Modal
              id="sticky_header_example"
              type={isTabletOrDesktop ? "overlay-auto" : "fullscreen"}
              headerRenderer={() => <></>}
              onClose={() => setStickyHeaderExampleOpen(false)}
            >
              {(onClose) => (
                <>
                  <Header
                    fixed
                    parentIsModal
                    title="Title"
                    transparent={transparentStickyColor}
                    onGoBack={onClose}
                  />
                  <div
                    style={{
                      marginTop: isTabletOrDesktop ? 0 : "4em",
                      marginLeft: "1em",
                      marginRight: "1em",
                    }}
                  >
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </>
              )}
            </Modal>
          </ModalProvider>
        )}
      </div>
    </section>
  );
}
