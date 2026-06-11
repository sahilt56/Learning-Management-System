import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "EDUVERSE revolutionized how I learn. The interactive courses and expert instructors helped me upskill quickly for my new tech role.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    name: "Briana Patton",
    role: "Student",
  },
  {
    text: "The platform is incredibly user-friendly. I loved the seamless video playback and the engaging quizzes that kept me on track.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    name: "Bilal Ahmed",
    role: "Lifelong Learner",
  },
  {
    text: "As an instructor, this LMS provides all the tools I need to manage my classes, track student progress, and deliver high-quality content.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    name: "Saman Malik",
    role: "Educator",
  },
  {
    text: "The community support and discussion forums make remote learning feel just like a real classroom. Highly recommended!",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    name: "Omar Raza",
    role: "Online Student",
  },
  {
    text: "EDUVERSE's robust curriculum and flexible schedule allowed me to balance my job while completing my certification effortlessly.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100",
    name: "Zainab Hussain",
    role: "Working Professional",
  },
  {
    text: "The learning paths are perfectly structured. It guided me step-by-step from beginner to advanced without any confusion.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    name: "Aliza Khan",
    role: "Bootcamp Graduate",
  },
  {
    text: "Great platform! The assignments and instant feedback helped me understand complex concepts much better.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=100",
    name: "Farhan Siddiqui",
    role: "College Student",
  },
  {
    text: "A game-changer for corporate training. Our team adopted the LMS seamlessly, and productivity has soared since.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    name: "Sana Sheikh",
    role: "HR Manager",
  },
  {
    text: "I've tried many online courses, but EDUVERSE stands out for its amazing UI and high-quality educational resources.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    name: "Hassan Ali",
    role: "Freelance Designer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="bg-background my-4 md:my-10 relative" id="testimonials">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          {/* <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div> */}

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What Our Learners Say
          </h2>
          <p className="text-center mt-5 opacity-75">
            Discover how EDUVERSE is transforming the learning experience for students and professionals.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 mt-4 md:mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] overflow-hidden max-h-none lg:max-h-[500px]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden xl:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
