import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full pl-12 pr-12 py-2.5 rounded-full border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 backdrop-blur-sm transition-all text-sm text-slate-100 placeholder-slate-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-sky-400 disabled:opacity-50 transition-colors"
        aria-label="Search city"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
