// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="py-6 mt-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-md px-6 mx-auto text-center">
          <div className="flex justify-center mb-4 space-x-6">
            <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
              Help
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 LOL App. Anonymous chat for Gen Z.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Built with 💜 for the community
          </p>
        </div>
      </footer>
    )
  }