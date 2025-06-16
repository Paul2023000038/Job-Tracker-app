
interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-ping mx-auto opacity-20"></div>
        </div>
        <p className="text-gray-700 text-lg font-medium">{text}</p>
        <p className="text-gray-500 text-sm mt-2">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
