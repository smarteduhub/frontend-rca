import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   ClipboardCheck,
   MessageSquare,
   NotebookPen,
   ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const FeaturesSection = () => {
   const t = useTranslations("home.features");

   const featureList = [
      {
         icon: <NotebookPen className="h-6 w-6" />,
         title: t("studentHub.title"),
         description: t("studentHub.description"),
      },
      {
         icon: <ClipboardCheck className="h-6 w-6" />,
         title: t("teacherTools.title"),
         description: t("teacherTools.description"),
      },
      {
         icon: <MessageSquare className="h-6 w-6" />,
         title: t("parentAccess.title"),
         description: t("parentAccess.description"),
      },
      {
         icon: <ShieldCheck className="h-6 w-6" />,
         title: t("safeSpace.title"),
         description: t("safeSpace.description"),
      },
   ];

  return (
    <section id="features" className="bg-sky-50 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-main text-center mb-2 tracking-wider font-medium">
          {t("title")}
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4 text-gray-900">
          {t("subtitle")}
        </h2>

        <h3 className="md:w-3/4 lg:w-2/3 mx-auto text-xl text-center text-gray-600 mb-12">
          {t("description")}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {featureList.map(({ icon, title, description }) => (
            <div key={title}>
              <Card className="h-full bg-white border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <CardHeader className="flex gap-4 items-start pb-2">
                  <div className="bg-main/10 p-3 rounded-lg text-main mb-2">
                    {icon}
                  </div>

                  <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-gray-600 text-left">
                  {description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;