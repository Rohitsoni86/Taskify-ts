import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import TasksList from "./components/TasksList";

export default function Home() {
	return (
		<main className="m">
			<HeroSection />
			<TasksList />
			<Footer />
		</main>
	);
}
