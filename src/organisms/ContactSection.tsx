import ContactForm from '@/molecules/ContactForm';

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-8">
      <div className="relative z-10 px-4 pt-8 max-w-4xl">
        <p className="text-caption text-muted-foreground/70 md:text-lg xl:text-xl">
          ~/Portfolio/Contact
        </p>

        <h2 className="mt-6">
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-section md:text-5xl xl:text-5xl 2xl:text-7xl bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
              Before you go
            </span>
          </span>
        </h2>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-4xl md:text-lg">
          if you&apos;re interested in working{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            together
          </span>
          , or bringing an{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            idea
          </span>{' '}
          to life, I&apos;d love to hear from you. Let&apos;s{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            build
          </span>{' '}
          something{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            great
          </span>
          .
        </p>
      </div>
      <div className="flex justify-center w-full ">
        <ContactForm />
      </div>
    </section>
  );
}
