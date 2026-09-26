import Button from "../components/atoms/Button";

const Home = () => {
  return (
    <div className="min-h-[200vh] flex flex-col justify-between p-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Main Page</h1>
        <Button text="Submit"></Button>
        <p className="text-slate-400">Scroll down to test the navbar.</p>
      </div>

      <div className="text-center text-slate-500 py-20">↓ Half page ↓</div>

      <div className="text-blue-400 font-semibold">
        The end of the test page (bottom)
      </div>
    </div>
  );
};

export default Home;
