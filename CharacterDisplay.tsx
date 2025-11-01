import React from 'react';

interface CharacterDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  aspectRatio: string;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);


const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <h3 className="text-xl font-semibold text-text-primary">Conjuring your character...</h3>
        <p className="text-text-secondary max-w-sm">The digital clay is being molded. This might take a moment!</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 text-center bg-red-500/10 border border-red-500/20 rounded-lg p-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-xl font-semibold text-red-500">Oh no, something went wrong!</h3>
      <p className="text-red-500/80 max-w-sm">{message}</p>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-text-secondary/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-2xl font-bold text-text-secondary/80">Your character will appear here</h3>
        <p className="max-w-md text-text-secondary">Use the controls to describe the 3D character you want to create, then press "Generate".</p>
    </div>
);


export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ image, isLoading, error, prompt, aspectRatio }) => {

  const getFileName = () => {
    return prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .slice(0, 50) || 'character'; // limit length
  }

  const getAspectRatioClass = (ratio: string): string => {
    switch(ratio) {
      case '1:1': return 'aspect-square';
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      default: return 'aspect-square';
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (image) {
      return (
        <div className="relative group w-full h-full">
          <img
            src={image}
            alt="Generated 3D character"
            className="w-full h-full object-cover rounded-lg shadow-2xl animate-fade-in"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <a
              href={image}
              download={`${getFileName()}.jpeg`}
              className="flex items-center gap-2 bg-primary text-text-on-primary font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition duration-200"
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </a>
          </div>
        </div>
      );
    }
    return <InitialState />;
  };

  return (
    <div className={`w-full bg-surface/50 rounded-lg flex items-center justify-center p-4 border-2 border-dashed border-border-color-dashed max-w-2xl mx-auto lg:max-w-full ${getAspectRatioClass(aspectRatio)}`}>
        <style>
            {`
            @keyframes fade-in {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
            `}
        </style>
        {renderContent()}
    </div>
  );
};