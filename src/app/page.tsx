import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
export default function Page() {
  return (
    <div>
    <NavBar />
    <div className="className">
      <h1 className="mt-10 text-2xl font-extrabold text-center text-blue-600 lg:text-8xl">Welcome to LOL App</h1>
      <p className="mt-4 text-center text-gray-600">Anonymous Chat App</p>
    </div>
     

      <Hero />
    </div>
  )
}
