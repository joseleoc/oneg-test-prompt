import "./App.css";
import Form from "./components/form/form";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";
import Story from "./components/story/story";
import { useCreateStory } from "./hooks/createStory";

function App() {
  const { createStory, story, loading } = useCreateStory();

  return (
    <>
      {loading && <SpinnerLoader />}
      {story ? (
        <Story story={story} />
      ) : (
        <Form onSubmit={createStory} loading={loading} />
      )}
    </>
  );
}

export default App;
