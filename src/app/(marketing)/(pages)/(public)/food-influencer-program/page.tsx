import { FoodInfluencerProgramForm } from "@/app/(marketing)/_components/food-influencer-program/form";

const FoodInfluencerProgramPage = async () => {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            CREATOR & AMBASSADOR COMMUNITY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Join Our Food Influencer Program
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Love creating food reviews, recipe reels, or snack unboxings? Partner with Arksh Food to receive exclusive product kits, sponsorships, and brand feature opportunities.
          </p>
        </div>

        <FoodInfluencerProgramForm initialData={null} />
      </div>
    </div>
  );
};

export default FoodInfluencerProgramPage;
