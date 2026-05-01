'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import styles from './SpeakerNominationForm.module.css'

const TOPICS = [
  'DeFi & Stablecoins',
  'Infrastructure & Protocols',
  'Developer Tooling',
  'Security & Audits',
  'AI x Web3',
  'Real-World Assets',
  'Identity & Privacy',
  'Policy & Regulation',
  'Africa & Emerging Markets',
  'Community & DAOs',
  'Other',
] as const

const ROLE_OPTIONS = [
  'Builder / Developer',
  'Founder',
  'Investor',
  'Researcher',
  'Community / DAO Contributor',
  'Designer',
  'Student / Learner',
  'Other',
] as const

/** Same API host as attendee registration; override with NEXT_PUBLIC_SPEAKER_NOMINATION_ENDPOINT. */
export function getSpeakerNominationApiUrl(): string {
  const override = process.env.NEXT_PUBLIC_SPEAKER_NOMINATION_ENDPOINT?.trim()
  if (override) return override
  const registrationUrl =
    process.env.NEXT_PUBLIC_REGISTRATION_API_URL ||
    'https://giant-dorice-web3bridge-89722e9a.koyeb.app/api/general-registrations/'
  const base = registrationUrl.replace(/\/?general-registrations\/?$/i, '').replace(/\/$/, '')
  return `${base}/speaker-nominations/`
}

type Status =
  | { show: false }
  | { show: true; kind: 'success' | 'error'; label: string; message: string }

export default function SpeakerNominationForm() {
  const statusRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>({ show: false })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (status.show && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [status])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ show: false })

    const form = e.currentTarget
    const fd = new FormData(form)
    const speakerName = String(fd.get('speakerName') || '').trim()
    const topic = String(fd.get('topic') || '').trim()
    const reason = String(fd.get('reason') || '').trim()
    const yourName = String(fd.get('yourName') || '').trim()
    const yourEmail = String(fd.get('yourEmail') || '').trim()

    if (!speakerName || !topic || !reason || !yourName || !yourEmail) {
      setStatus({
        show: true,
        kind: 'error',
        label: 'Missing fields',
        message: 'Please complete all required fields.',
      })
      return
    }

    const payload = {
      speakerName,
      speakerHandle: String(fd.get('speakerHandle') || '').trim(),
      speakerOrg: String(fd.get('speakerOrg') || '').trim(),
      speakerLocation: String(fd.get('speakerLocation') || '').trim(),
      topic,
      suggestedTalk: String(fd.get('suggestedTalk') || '').trim(),
      reason,
      reference: String(fd.get('reference') || '').trim(),
      yourName,
      yourEmail,
      yourRole: String(fd.get('yourRole') || '').trim(),
    }

    const endpoint = getSpeakerNominationApiUrl()

    setSending(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => null as Record<string, unknown> | null)
        const msg =
          typeof errBody?.detail === 'string'
            ? errBody.detail
            : errBody
              ? Object.values(errBody)
                  .flat()
                  .filter((v) => typeof v === 'string')
                  .join(' ')
              : ''
        throw new Error(msg || `Request failed (${res.status})`)
      }
      form.reset()
      setStatus({
        show: true,
        kind: 'success',
        label: 'Nomination received',
        message:
          'Thank you for helping shape Web3Lagos. The curation team will review every nomination.',
      })
    } catch (err) {
      try {
        const key = 'w3l_speaker_nominations'
        const list = JSON.parse(
          typeof window !== 'undefined' ? localStorage.getItem(key) || '[]' : '[]'
        ) as unknown[]
        list.push({ ...payload, timestamp: new Date().toISOString(), _offlineFallback: true })
        localStorage.setItem(key, JSON.stringify(list))
      } catch {
        /* ignore */
      }
      setStatus({
        show: true,
        kind: 'error',
        label: 'Submission failed',
        message:
          err instanceof Error && err.message
            ? `${err.message} Your answers were saved in this browser only — please try again later or contact the team.`
            : 'Something went wrong. Your answers were saved in this browser only. Please try again later.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.nominationPage}>
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            Web3Lagos / <strong>Vol. 05</strong> / Speaker Nominations
          </div>
          <div className={styles.badge}>Open</div>
        </div>

        <header className={styles.hero}>
          <span className={styles.hashtag}>#Web3Lagos2026</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.web3}>WEB3</span>{' '}
            <span className={styles.lagos}>LAGOS</span>
            <span className={styles.conf}>Conference 2026</span>
          </h1>
          <p className={styles.lede}>
            Help us build the lineup. Tell us <strong>who you want to hear from</strong> — the
            speakers, builders, and voices you believe will bring real value to this year&apos;s
            stage. We&apos;ll use community nominations to shape our outreach.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Days / One Stage</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>800</div>
              <div className={styles.statLabel}>Curated Attendees</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>27—29</div>
              <div className={styles.statLabel}>August 2026</div>
            </div>
          </div>
        </header>

        <div className={styles.accentBar} aria-hidden />

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>01</span>
            <h2>The Speaker</h2>
            <span className={styles.sectionLine} />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="speakerName">
              <span>Speaker&apos;s Full Name</span>
              <span className={styles.req}>required</span>
            </label>
            <input
              type="text"
              id="speakerName"
              name="speakerName"
              required
              placeholder="Who should we invite?"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="speakerHandle">
              <span>X / Twitter, LinkedIn, or Website</span>
            </label>
            <input type="url" id="speakerHandle" name="speakerHandle" placeholder="https://" />
            <span className={styles.hint}>Helps us find and reach them.</span>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="speakerOrg">
              <span>Their Project, Company, or Affiliation</span>
            </label>
            <input
              type="text"
              id="speakerOrg"
              name="speakerOrg"
              placeholder="What are they known for?"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="speakerLocation">
              <span>Where are they based?</span>
            </label>
            <input
              type="text"
              id="speakerLocation"
              name="speakerLocation"
              placeholder="City, country (or 'unsure')"
            />
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>02</span>
            <h2>The Topic</h2>
            <span className={styles.sectionLine} />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              <span>What area should they speak on?</span>
              <span className={styles.req}>required</span>
            </span>
            <div className={styles.choices}>
              {TOPICS.map((value, i) => (
                <label key={value} className={styles.choice}>
                  <input type="radio" name="topic" value={value} required={i === 0} />
                  <span className={styles.choiceBox} />
                  <span>
                    {value === 'Infrastructure & Protocols'
                      ? 'Infra & Protocols'
                      : value === 'AI x Web3'
                        ? 'AI × Web3'
                        : value}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="suggestedTalk">
              <span>Suggested Talk Topic or Angle</span>
            </label>
            <input
              type="text"
              id="suggestedTalk"
              name="suggestedTalk"
              placeholder="What specifically would you love them to speak about?"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="reason">
              <span>Why this speaker?</span>
              <span className={styles.req}>required</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              placeholder="Tell us what makes them valuable for the Web3 community right now. What perspective, experience, or insight do they bring?"
            />
            <span className={styles.hint}>A few sentences is enough.</span>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="reference">
              <span>Have you seen them speak before?</span>
            </label>
            <input
              type="url"
              id="reference"
              name="reference"
              placeholder="Optional: link to a past talk, podcast, or thread"
            />
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>03</span>
            <h2>About You</h2>
            <span className={styles.sectionLine} />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="yourName">
              <span>Your Name</span>
              <span className={styles.req}>required</span>
            </label>
            <input
              type="text"
              id="yourName"
              name="yourName"
              required
              placeholder="So we know who to thank"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="yourEmail">
              <span>Your Email</span>
              <span className={styles.req}>required</span>
            </label>
            <input
              type="email"
              id="yourEmail"
              name="yourEmail"
              required
              placeholder="you@somewhere.xyz"
            />
            <span className={styles.hint}>We may follow up if we have questions.</span>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="yourRole">
              <span>Your Role in the Ecosystem</span>
            </label>
            <select id="yourRole" name="yourRole" defaultValue="">
              <option value="">— Select one —</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={sending}>
              <span>{sending ? 'Sending…' : 'Submit Nomination'}</span>
              <span className={styles.arrow}>→</span>
            </button>
            <p className={styles.legal}>
              Submissions help shape our speaker outreach. We can&apos;t guarantee every nominee
              will appear, but every suggestion is reviewed by the curation team.
            </p>
          </div>

          {status.show && (
            <div
              ref={statusRef}
              className={`${styles.status} ${
                status.kind === 'success' ? styles.statusSuccess : styles.statusError
              }`}
            >
              <span className={styles.statusLabel}>{status.label}</span>
              {status.message}
            </div>
          )}
        </form>

        <footer className={styles.formFooter}>
          <div>Web3Lagos 2026</div>
          <div className={styles.sig}>#Web3Lagos2026</div>
        </footer>
      </div>
    </div>
  )
}
