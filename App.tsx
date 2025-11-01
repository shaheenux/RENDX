import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptControls } from './components/PromptControls';
import { CharacterDisplay } from './components/CharacterDisplay';
import { generateCharacterImage } from './services/geminiService';

export type Theme = 'light' | 'dark' | 'vibrant';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A friendly robot with a curious expression');
  const [pose, setPose] = useState<string>('Standing');
  const [background, setBackground] = useState<string>('Neutral Gray');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  const handleGenerateClick = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate a character.');
      return;
    }
    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const base64Image = await generateCharacterImage(prompt, pose, background, aspectRatio);
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, pose, background, aspectRatio]);
  
  return (
    <div data-theme={theme} className="min-h-screen bg-background text-text-primary font-sans flex flex-col transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 xl:w-1/4 flex flex-col">
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            pose={pose}
            setPose={setPose}
            background={background}
            setBackground={setBackground}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onGenerate={handleGenerateClick}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-2/3 xl:w-3/4 flex-grow flex items-center justify-center">
          <CharacterDisplay
            image={generatedImage}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
            aspectRatio={aspectRatio}
          />
        </div>
      </main>
    </div>
  );
};

export default App;