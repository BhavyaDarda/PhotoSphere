import { useCallback } from 'react';

// Sound effects for different interactions
const sounds = {
  hover: new Audio('/sounds/hover.mp3'),
  click: new Audio('/sounds/click.mp3'),
  success: new Audio('/sounds/success.mp3'),
  transition: new Audio('/sounds/transition.mp3'),
};

// Preload all sounds
Object.values(sounds).forEach(sound => {
  sound.load();
  sound.volume = 0.2; // Set a reasonable default volume
});

export function useSoundEffects() {
  const playSound = useCallback((soundName: keyof typeof sounds) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // Reset the sound to start
      sound.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  return { playSound };
}
