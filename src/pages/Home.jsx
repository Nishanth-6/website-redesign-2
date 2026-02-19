import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentAPI } from '@/utils/contentLoader';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function Home() {
  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => contentAPI.entities.Content.list()
  });

  const { data: researchAreas = [] } = useQuery({
    queryKey: ['researchAreas'],
    queryFn: () => contentAPI.entities.ResearchArea.list()
  });

  const getContent = (key) => contents.find(c => c.key === key);
  const profile = getContent('profile');
  const awards = getContent('awards');
  const fallbackProfileImage = `${import.meta.env.BASE_URL}assets/profile-placeholder.svg`;

  const profileImageFromContent = useMemo(() => {
    const imageUrl = profile?.image_url?.trim();
    if (!imageUrl) {
      return fallbackProfileImage;
    }

    // Keep absolute URLs as-is, but encode spaces and special characters safely.
    if (/^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:')) {
      return encodeURI(imageUrl);
    }

    const basePath = import.meta.env.BASE_URL || '/';
    return `${basePath}${imageUrl.replace(/^\/+/, '')}`;
  }, [profile?.image_url, fallbackProfileImage]);

  const [profileImageSrc, setProfileImageSrc] = useState(profileImageFromContent);

  useEffect(() => {
    setProfileImageSrc(profileImageFromContent);
  }, [profileImageFromContent]);

  const displayResearchAreas = researchAreas.length > 0 ? researchAreas : [
    {
      id: 'default-1',
      title: 'Self-adapting Approximations',
      description: 'The solution of large scale Markov decision processes using algorithms that improve accessibility to non-technical domain experts and resource-constrained organizations by automating learning from data, underlying problem structure, and instance difficulty.',
      image_url: '',
    },
    {
      id: 'default-2',
      title: 'Energy Real Options',
      description: 'The operations, valuation, and risk management of commodity and energy conversion assets (e.g., production, storage, transport), including renewable energy.',
      image_url: '',
    },
    {
      id: 'default-3',
      title: 'Energy and Computing Nexus',
      description: 'The exploration of how energy demands intensified by computing growth (e.g., data centers) can be met, and how computing advances (e.g., LLMs) can accelerate the sustainable energy transformation.',
      image_url: '',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 space-y-20">

      {/* ── HERO SECTION ── */}
      <motion.section
        initial="initial" animate="animate" variants={stagger}
        className="relative rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 lg:p-16 items-start">
          <motion.div variants={fadeUp} className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)' }}>
                University of Illinois at Chicago
              </p>
              <h1 className="heading-serif text-3xl md:text-4xl lg:text-[2.75rem]"
                style={{ color: 'var(--color-text)' }}>
                Associate Professor &amp;{' '}
                <span style={{ color: 'var(--color-accent)' }}>Decision Intelligence</span> Lead
              </h1>
            </div>

            <div className="text-base md:text-lg leading-relaxed space-y-4"
              style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                I am an Associate Professor (with tenure) of Information and Decision Sciences and Bielinski Family Endowed Scholar at the College of Business Administration, University of Illinois at Chicago.
              </p>
              <p>
                I also work with Argonne National Laboratory and previously served as the Decision Intelligence R&amp;D Lead at the Discovery Partners Institute (Innovation hub of the University of Illinois System).
              </p>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${profile?.metadata?.email || 'selvan@uic.edu'}`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
                style={{ color: 'var(--color-accent)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Mail className="w-4 h-4" />
                </div>
                <span className="group-hover:underline underline-offset-4">
                  {profile?.metadata?.email || 'selvan@uic.edu'}
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="w-full md:w-[280px] lg:w-[300px] shrink-0 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl opacity-15 blur-xl"
                style={{ backgroundColor: 'var(--color-accent)' }} />
              <img
                src={profileImageSrc}
                alt={profile?.title || 'Selvaprabu Nadarajah'}
                className="relative w-full max-w-[280px] h-auto rounded-2xl object-cover aspect-[3/4]"
                style={{ boxShadow: 'var(--shadow-xl)' }}
                loading="eager"
                onError={() => setProfileImageSrc(fallbackProfileImage)}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="heading-serif heading-underline text-2xl md:text-3xl mb-6"
          style={{ color: 'var(--color-text)' }}>
          Research Areas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {displayResearchAreas.map((area) => (
            <div
              key={area.id}
              className="rounded-xl overflow-hidden h-full"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="h-44 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
                {area.image_url ? (
                  <img
                    src={area.image_url}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(120deg, #2f4f6f 0%, #425f7b 45%, #1f2d3d 100%)',
                      opacity: 0.9,
                    }}
                  />
                )}
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-2xl leading-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                  {area.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── AWARDS ── */}
      {awards && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}>
            {awards.body}
          </p>
        </motion.section>
      )}

      {/* ── ABOUT ME ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl pb-8"
      >
        <h2 className="heading-serif heading-underline text-2xl md:text-3xl mb-6"
          style={{ color: 'var(--color-text)' }}>
          About Me
        </h2>
        <div className="text-base md:text-lg leading-relaxed space-y-5"
          style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            Before joining UIC, I did my PhD and MS in Operations Research at the Tepper School of Business, Carnegie Mellon University. My journey to North America started at the University of Waterloo, where I obtained an MASc in Operations Research and learnt the importance of asking 'Why Not?'.
          </p>
          <p>
            I was born in incredible India and grew up in the beautiful island of Sri Lanka (a.k.a. the pearl of the Indian ocean) before heading back to Chennai for my undergraduate studies at the Indian Institute of Technology Madras. I have enjoyed consulting with companies in the retail, high technology, and energy industries along the way.
          </p>
        </div>
      </motion.section>
    </div>
  );
}