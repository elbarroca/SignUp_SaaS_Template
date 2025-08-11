import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {

  IconCurrencyDollar,
  IconEaseInOut,
  IconTerminal2,
} from "@tabler/icons-react";
import { AuroraText } from "../magicui/aurora-text";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AuthAwareButton } from "@/components/dashboard/auth-aware-button";

const features = [
  {
    value: "tab-1",
    icon: <IconTerminal2 className="h-auto w-4 shrink-0" />,
    label: "Built for developers",
    content: {
      badge: "Modern Tactics",
      title: "Make your SaaS a true standout.",
      description:
        "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      buttonText: "See Plans",
      imageSrc:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "placeholder",
    },
  },
  {
    value: "tab-2",
    icon: <IconEaseInOut className="h-auto w-4 shrink-0" />,
    label: "Ease of use",
    content: {
      badge: "Expert Features",
      title: "Boost your SaaS with top-tier design.",
      description:
        "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
      buttonText: "See Tools",
      imageSrc:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "placeholder",
    },
  },
  {
    value: "tab-3",
    icon: <IconCurrencyDollar className="h-auto w-4 shrink-0" />,
    label: "Pricing like no other",
    content: {
      badge: "Elite Solutions",
      title: "Build an advanced web experience.",
      description:
        "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
      buttonText: "See Options",
      imageSrc:
        "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "placeholder",
    },
  },
];

const FeatureImages = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 md:px-8 text-center mt-16">
        <div className="flex justify-center">
          <div className="border py-1 px-4 rounded-lg">
            Feature Images
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 font-sans">
            Feature <AuroraText>Images</AuroraText>
          </h1>
          <p className="mt-5 opacity-75">
            A collection of feature images
          </p>
        </div>
        <Tabs defaultValue={features[0].value} className="mt-8">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {features.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary font-sans transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16 transition-all duration-300 ease-in-out hover:shadow-xl">
            {features.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge className="border py-1 px-4 rounded-lg w-fit bg-background text-black dark:text-white border-black dark:border-white">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-left mt-5 font-sans text-black dark:text-white">
                    {tab.content.title}
                  </h3>
                  <p className="text-left mt-5 opacity-75 text-black dark:text-white">
                    {tab.content.description}
                  </p>
                  <AuthAwareButton 
                    className="mt-2.5 w-fit gap-2" 
                    size="lg"
                    authenticatedHref="/dashboard"
                    unauthenticatedHref="/auth/login">
                    {tab.content.buttonText}
                  </AuthAwareButton>
                </div>
                <Image
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl"
                  width={500}
                  height={500}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { FeatureImages };
