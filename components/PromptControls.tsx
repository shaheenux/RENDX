import React from 'react';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  pose: string;
  setPose: (pose: string) => void;
  background: string;
  setBackground: (background: string) => void;
  aspectRatio: string;
  setAspectRatio: (aspectRatio: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const keywordSuggestions = [
  'Cute monster', 'Brave knight', 'Sci-fi astronaut', 'Fantasy wizard',
  'Steampunk explorer', 'Cyberpunk hacker', 'Talking animal', 'Magical girl',
];

const poseOptions = [
  'Standing', 'Action Pose', 'Sitting', 'Jumping', 'Close-up Portrait',
  'Flying', 'Dancing', 'Thinking', 'Fighting Stance', 'Leaning Casually'
];

const backgroundOptions = [
  'Neutral Gray', 'Vibrant Gradient', 'White Studio', 'Outdoor Scene', 'Dark Abstract',
  'Cosmic Nebula', 'Enchanted Forest', 'Cyberpunk Cityscape', 'Underwater Reef', 'Minimalist Pastel'
];

const aspectRatioOptions = [
    { label: 'Square (1:1)', value: '1:1' },
    { label: 'Portrait (3:4)', value: '3:4' },
    { label: 'Landscape (4:3)', value: '4:3' },
    { label: 'Tall / Story (9:16)', value: '9:16' },
    { label: 'Widescreen / Thumbnail (16:9)', value: '16:9' },
];


const DropdownSelector: React.FC<{
  label: string;
  options: { label: string, value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled: boolean;
}> = ({ label, options, selectedValue, onChange, disabled }) => (
  <div>
    <label htmlFor={label} className="block text-sm font-medium text-text-secondary mb-2">
      {label}
    </label>
    <select
      id={label}
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-surface border border-border-color-strong rounded-md p-2 text-text-primary focus:ring-2 focus:ring-ring-color focus:border-ring-color transition duration-200 disabled:opacity-50"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const PromptControls: React.FC<PromptControlsProps> = ({ 
  prompt, setPrompt, pose, setPose, background, setBackground, aspectRatio, setAspectRatio, onGenerate, isLoading 
}) => {
  
  const handleKeywordClick = (keyword: string) => {
    setPrompt(prompt ? `${prompt}, ${keyword.toLowerCase()}` : keyword);
  };

  return (
    <div className="bg-surface rounded-lg shadow-lg border border-border-color p-6 flex flex-col gap-6 h-full">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-text-secondary mb-2">
          Describe Your Character
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-surface border border-border-color-strong rounded-md p-3 text-text-primary focus:ring-2 focus:ring-ring-color focus:border-ring-color transition duration-200 resize-none placeholder-text-secondary/50"
          placeholder="e.g., A mischievous fox wearing a pilot's jacket"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <DropdownSelector 
        label="Select a Pose"
        options={poseOptions.map(p => ({ label: p, value: p }))}
        selectedValue={pose}
        onChange={setPose}
        disabled={isLoading}
      />
      
      <DropdownSelector 
        label="Choose a Background"
        options={backgroundOptions.map(b => ({ label: b, value: b }))}
        selectedValue={background}
        onChange={setBackground}
        disabled={isLoading}
      />
      
      <DropdownSelector 
        label="Select Canvas Size"
        options={aspectRatioOptions}
        selectedValue={aspectRatio}
        onChange={setAspectRatio}
        disabled={isLoading}
      />

      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Quick Ideas</h3>
        <div className="flex flex-wrap gap-2">
          {keywordSuggestions.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-button-secondary-bg text-button-secondary-text text-xs font-medium rounded-full hover:bg-button-secondary-hover-bg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center bg-primary text-text-on-primary font-bold py-3 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-ring-color transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Character'
          )}
        </button>
      </div>
    </div>
  );
};