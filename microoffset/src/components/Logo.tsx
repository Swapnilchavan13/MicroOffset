import { Leaf } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-sage shadow-soft">
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold text-foreground">
        Micro<span className="text-sage">Offsets</span>
      </span>
    </div>
  );
};

export default Logo;
