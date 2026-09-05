"use client";

import React, { useState } from "react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  className?: string;
}

const EMOJI_CATEGORIES = [
  {
    name: "Smileys",
    emojis: ["😀", "😂", "🥹", "😍", "🤩", "😎", "🤔", "😢", "🥺", "😤"],
  },
  {
    name: "Objects",
    emojis: ["💻", "📱", "⌨️", "🖥️", "🖨️", "🖱️", "💾", "📀", "📷", "🎥"],
  },
  {
    name: "Symbols",
    emojis: ["❤️", "🔥", "⭐", "💡", "🎯", "✅", "❌", "⚡", "🚀", "💬"],
  },
  {
    name: "Hand",
    emojis: ["👍", "👎", "👋", "🤝", "🙏", "✌️", "🤘", "💪", "👏", "🙌"],
  },
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, className = "" }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className={`bg-theme-card border border-theme rounded-xl shadow-lg w-64 p-4 space-y-3 z-50 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-theme-primary">Emoji Picker</h3>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1">
        {EMOJI_CATEGORIES.map((category, idx) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveCategory(idx)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              activeCategory === idx
                ? "bg-theme-primary-subtle text-theme-on-primary"
                : "text-theme-muted hover:bg-theme-secondary"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-5 gap-1">
        {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-theme-secondary rounded-md transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
