import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Built for developers",
      description:
        "This template is built for developers, with a focus on ease of use and customization.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description:
        "The template is designed to be easy to use, with a simple and intuitive interface.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Pricing like no other",
      description:
        "Our pricing is competitive and flexible, with plans for all business sizes.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We guarantee 100% uptime for your applications.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "Our template supports multi-tenant architecture, allowing you to serve multiple customers with a single instance.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We offer 24/7 customer support to help you with any issues you may have.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description:
        "We offer a money-back guarantee if you are not satisfied with our product.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And everything else",
      description: "This template includes everything you need to get started with your SaaS application.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-orange-400">
        {icon} 
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10 font-sans">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-orange-400 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
