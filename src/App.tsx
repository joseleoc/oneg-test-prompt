import "./App.css";
import Form from "./components/form/form";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";
import Story from "./components/story/story";
import { useCreateStory } from "./hooks/createStory";

function App() {
  const { createStory, story, loading, step, setStep } = useCreateStory();

  return (
    <>
      {loading && <SpinnerLoader />}

      {step === 2 && story ? (
        <>
          <div className="text-start">
            <button
              onClick={() => setStep(1)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              volver
            </button>
          </div>
          <Story story={story} />
        </>
      ) : (
        <Form onSubmit={createStory} loading={loading} />
      )}
    </>
  );
}

export default App;
