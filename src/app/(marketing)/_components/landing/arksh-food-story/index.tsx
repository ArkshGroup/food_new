import type React from "react";
import { Leaf, Sprout, Heart, BookOpen, TrendingUp } from "lucide-react";

export default function FarmersConnectionSection() {
  return (
    <section className="bg-linear-to-b from-white to-blue-50 py-8 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg transition-all bg-primary/10 mx-auto">
          <Sprout className="w-10 h-10  text-primary" />
        </div>
        <p className="text-lg text-gray-600 text-balance leading-relaxed">
          At{" "}
          <span className="font-semibold" style={{ color: "#23AEE3" }}>
            Arksh Food
          </span>
          , we believe in a future where farmers and their families thrive.
          Every product you purchase supports local farmers growing premium
          millet and maize and helps in funding education for their children,
          breaking cycles of poverty through knowledge and opportunity.
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          className="text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: "#23AEE3" }}
        >
          React Our Full Story
        </button>
      </div>
    </section>
  );
}
