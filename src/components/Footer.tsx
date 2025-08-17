import React from "react";
import { site } from "../data/site";

export const Footer: React.FC = () => (
  <footer className="mt-10 border-t border-white/10">
    <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-400">
      © {new Date().getFullYear()} {site.brand}. All rights reserved.
    </div>
  </footer>
);
