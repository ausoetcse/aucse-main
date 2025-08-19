'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { CardHoverEffect } from '@/components/ui/pulse-card';
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
} from 'lucide-react';

interface AboutUsProps {
  title?: string;
  subtitle?: string;
  mission?: string;
  vision?: string;
  values?: Array<{
    title: string;
    description: string;
    icon: keyof typeof iconComponents;
  }>;
  className?: string;
}

const iconComponents = {
  Users: Users,
  Heart: Heart,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Target: Target,
};

const defaultValues: AboutUsProps['values'] = [
  {
    title: 'Innovation',
    description:
      'We constantly push boundaries and explore new possibilities to create cutting-edge solutions.',
    icon: 'Lightbulb',
  },
  {
    title: 'Collaboration',
    description:
      'We believe in the power of teamwork and diverse perspectives to achieve extraordinary results.',
    icon: 'Users',
  },
  {
    title: 'Excellence',
    description:
      'We strive for perfection in everything we do, consistently delivering high-quality work.',
    icon: 'Sparkles',
  },
  {
    title: 'Impact',
    description:
      "We measure our success by the positive difference we make in people's lives and businesses.",
    icon: 'Globe',
  },
];

export default function AboutUs1() {
  const aboutData = {
    title: 'About Us',
    subtitle:
      'Building the Future of Computer Science and Software Engineering',
    mission:
      'Our mission is to teach and prepare liberally educated, articulate, and skilled computer scientists and software engineers for leadership and professional careers and for advanced study. The program will serve as a resource to inform society about innovations related to the production and uses of computers and software. A central objective of our program is to contribute to society by advancing the fields of computer science and software engineering through innovations in teaching and research, thus enhancing student knowledge through interactive instruction, global engagement, and experiential learning. To impart moral and ethical values, and interpersonal skills to the students.',
    vision:
      'Graduates of the Department of Computer Science and Software Engineering will be recognized as innovative leaders in the fields of computer science and software engineering. This recognition will come from their work in software development in a myriad of application areas, as well as through their work in advanced study and research.The faculty is and will continue to be, known for their passion for teaching and for their knowledge, expertise, and innovation in advancing the frontiers of knowledge in computer science and software engineering.',
    values: defaultValues,
    className: 'relative overflow-hidden py-20 text-wrap flex justify-center items-center',
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden pt-20 ">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(23, 39, 181, 0.15) 0%, rgba(17, 31, 120, 0.08) 50%, rgba(10, 20, 80, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(71, 120, 200, 0.12) 0%, rgba(23, 39, 181, 0.05) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(40, 80, 160, 0.1) 0%, rgba(50, 90, 170, 0.08) 80%, transparent 100%)"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h1 className="bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl font-special-gothic">
            {aboutData.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground font-ubuntu">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-primary/40 to-transparent"
              />

              <div className="mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                <Rocket className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-4">
                <h2 className="mb-4 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-3xl font-bold text-transparent font-special-gothic">
                  Our Mission
                </h2>

                <p className="text-lg  text-muted-foreground font-ubuntu leading-tight  items-center text-justify flex-1 ">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-blue-500/40 to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm">
                <Target className="h-8 w-8 text-blue-500" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-blue-500/90 to-blue-500/70 bg-clip-text text-3xl font-bold text-transparent font-special-gothic">
                Our Vision
              </h2>

              <p className="text-lg leading-tight text-muted-foreground font-ubuntu text-justify items-center flex-1  ">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <h2 className="bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl font-special-gothic">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground font-ubuntu">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? 'purple'
                        : index === 1
                          ? 'blue'
                          : index === 2
                            ? 'amber'
                            : 'rose'
                    }
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div> */}
      </div>
    </section>
  );
}