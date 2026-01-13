"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://placehold.co/40x40",
    name: "Aphrodice",
    userName: "Teacher",
    comment:
      "Smart EduHub keeps my classes organized and calm. I can see who needs help quickly and focus on teaching instead of fighting the system.",
    rating: 5.0,
  },
  {
    image: "https://placehold.co/40x40",
    name: "Dr. Papias",
    userName: "School Director",
    comment:
      "With Smart EduHub, we onboarded teachers fast, track progress in one place, and give parents a clear view—without extra admin stress.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-blue-600 text-center mb-2 tracking-wider font-medium">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4 text-gray-900">
          Success Stories from Our Community
        </h2>

        <h3 className="md:w-3/4 lg:w-2/3 mx-auto text-xl text-center text-gray-600 mb-12">
          Join over 1,000 schools and 50,000+ students who are experiencing the
          transformative power of personalized education.
        </h3>

        <Carousel
          opts={{
            align: "start",
          }}
          className="relative w-[80%] sm:w-[90%] lg:max-w-screen-md mx-auto"
        >
          <CarouselContent>
            {reviewList.map((review) => (
              <CarouselItem key={review.name} className="md:basis-1/2">
                <Card className="h-full bg-blue-50 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <CardContent className="pt-6 pb-0">
                    <div className="flex gap-1 pb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < Math.floor(review.rating)
                              ? "fill-blue-600 text-blue-600"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{`"${review.comment}"`}</p>
                  </CardContent>

                  <CardHeader>
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>
                          {review.name.charAt(0)}
                          {review.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <CardTitle className="text-lg text-gray-900">
                          {review.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {review.userName}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white border border-blue-100 text-blue-600 hover:bg-blue-50" />
          <CarouselNext className="bg-white border border-blue-100 text-blue-600 hover:bg-blue-50" />
        </Carousel>
      </div>
    </section>
  );
};
