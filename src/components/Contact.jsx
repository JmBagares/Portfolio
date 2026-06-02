import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import StreetArtLayer from './StreetArtLayer'
import { trackEvent } from '../utils/analytics'

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/jm.bagares.14/', external: true },
  { label: 'GitHub', href: 'https://github.com/JmBagares', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/ziim_69/', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jan-manuel-bagares-977760337/', external: true },
  { label: 'Gmail', href: 'mailto:jmbagares52@gmail.com', external: false },
]

const inputStyle = {
  background: 'color-mix(in srgb, var(--card-bg) 76%, transparent)',
  border: '1px solid color-mix(in srgb, var(--t-accent) 22%, transparent)',
  color: 'var(--text-primary)',
}

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [state, handleSubmit] = useForm('xqejrler')

  useEffect(() => {
    if (state.succeeded) {
      trackEvent('contact_submit', { form: 'formspree' })
    }
  }, [state.succeeded])

  return (
    <footer id="contact" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full opacity-10 transition-colors duration-1000"
          style={{ background: 'radial-gradient(ellipse, var(--t-accent), transparent 70%)' }}
        />
      </div>
      <StreetArtLayer sectionId="contact" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Get in Touch
          </span>
          <h2 className="contact-section__title text-4xl md:text-6xl lg:text-7xl mb-6 transition-colors duration-700"
            style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--text-primary)' }}>
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-14 font-light transition-colors duration-700"
            style={{ color: 'var(--text-muted)' }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {state.succeeded ? (
            <div className="glass-card rounded-[24px] p-10 md:p-12 text-center">
              <div className="text-4xl mb-4" aria-hidden="true">✓</div>
              <h3 className="text-2xl md:text-3xl mb-3 transition-colors duration-700"
                style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--text-primary)' }}>
                Thanks for reaching out!
              </h3>
              <p className="text-base font-light" style={{ color: 'var(--text-muted)' }}>
                Your message has been sent. I'll get back to you as soon as I can.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-[24px] p-6 md:p-8 text-left flex flex-col gap-5" noValidate>
              {/* Honeypot: hidden from real users; bots that fill it get filtered by Formspree */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--label-text)' }}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="contact-field rounded-2xl px-4 py-3 text-sm outline-none transition-colors"
                    style={inputStyle}
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-red-400" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--label-text)' }}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="contact-field rounded-2xl px-4 py-3 text-sm outline-none transition-colors"
                    style={inputStyle}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-400" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--label-text)' }}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="_subject"
                  required
                  placeholder="What's this about?"
                  className="contact-field rounded-2xl px-4 py-3 text-sm outline-none transition-colors"
                  style={inputStyle}
                />
                <ValidationError prefix="Subject" field="_subject" errors={state.errors} className="text-xs text-red-400" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--label-text)' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="contact-field rounded-2xl px-4 py-3 text-sm outline-none transition-colors resize-y"
                  style={inputStyle}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-400" />
              </div>

              <ValidationError errors={state.errors} className="text-sm text-red-400" />

              <button
                type="submit"
                disabled={state.submitting}
                className="self-center mt-2 inline-flex items-center gap-3 px-10 py-4 text-base md:text-lg font-semibold no-underline transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  background: 'var(--t-btn-bg)',
                  color: 'var(--t-btn-text)',
                  borderRadius: 'var(--t-btn-radius)',
                  boxShadow: 'var(--t-btn-shadow)',
                }}
              >
                <span>{state.submitting ? 'Sending…' : 'Send Message'}</span>
                {!state.submitting && (
                  <span aria-hidden="true">→</span>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="theme-link-muted inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium tracking-wide no-underline"
              whileHover={{ y: -3 }}
              style={{
                borderColor: 'color-mix(in srgb, var(--t-accent) 18%, transparent)',
                background: 'color-mix(in srgb, var(--card-bg) 76%, transparent)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
              }}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">/</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'color-mix(in srgb, var(--t-text) 10%, transparent)' }}>
          <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} · Designed & Built with precision
            </p>
        </div>
      </div>
    </footer>
  )
}
