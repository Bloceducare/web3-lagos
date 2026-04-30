'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/web3lagos2026/Navbar'
import Footer from '@/components/web3lagos2026/Footer'
import { SITE, TRACKS } from '@/lib/web3lagos2026-data'

const COUNTRIES = [
  { group: 'Africa', options: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cape Verde','Cameroon','Central African Republic','Chad','Comoros','Congo','Congo (DRC)','Côte d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','São Tomé & Príncipe','Senegal','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'] },
  { group: 'Americas', options: ['Argentina','Brazil','Canada','Chile','Colombia','Costa Rica','Cuba','Dominican Republic','Ecuador','El Salvador','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Paraguay','Peru','Trinidad & Tobago','United States','Uruguay','Venezuela'] },
  { group: 'Asia', options: ['Bangladesh','China','India','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kuwait','Malaysia','Myanmar','Nepal','Pakistan','Philippines','Qatar','Saudi Arabia','Singapore','South Korea','Sri Lanka','Thailand','Turkey','UAE','Vietnam'] },
  { group: 'Europe', options: ['Austria','Belgium','Czech Republic','Denmark','Finland','France','Germany','Greece','Hungary','Ireland','Italy','Netherlands','Norway','Poland','Portugal','Romania','Russia','Spain','Sweden','Switzerland','Ukraine','United Kingdom'] },
  { group: 'Oceania', options: ['Australia','Fiji','New Zealand','Papua New Guinea','Samoa'] },
]

interface FormData {
  firstname: string; lastname: string; email: string; phone: string;
  country: string; city: string; org: string; role: string; twitter: string;
  track: string; attend: string; visa: boolean; notes: string;
}

const initialForm: FormData = {
  firstname: '', lastname: '', email: '', phone: '',
  country: '', city: '', org: '', role: '', twitter: '',
  track: '', attend: '', visa: false, notes: '',
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'W3L-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function RegisterPage() {
  const registrationOpen = false
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [ref, setRef] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate1 = () => {
    const e: Partial<FormData> = {}
    if (!form.firstname.trim()) e.firstname = 'Required'
    if (!form.lastname.trim()) e.lastname = 'Required'
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.country) e.country = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validate2 = () => {
    const e: Partial<FormData> = {}
    if (!form.role.trim()) e.role = 'Required'
    if (!form.track) e.track = 'Please select a track'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validate3 = () => {
    const e: Partial<FormData> = {}
    if (!form.attend) e.attend = 'Please select attendance type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && !validate1()) return
    if (step === 2 && !validate2()) return
    setStep(s => s + 1)
  }

  const submit = async () => {
    if (!validate3()) return
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitError('')

    const r = generateRef()
    setRef(r)

    const registrationPayload = {
      name: `${form.firstname} ${form.lastname}`.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country,
      location: form.city.trim(),
      telegramusername: '',
      xhandle: form.twitter.trim(),
      role: form.role.trim(),
      github: null as string | null,
      gender: 'Prefer not to say',
    }

    const endpoint =
      process.env.NEXT_PUBLIC_REGISTRATION_API_URL ||
      'https://giant-dorice-web3bridge-89722e9a.koyeb.app/api/general-registrations/'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationPayload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const firstError =
          errorData?.message ||
          Object.values(errorData || {}).flat().find(Boolean) ||
          'Could not submit registration right now. Please try again.'
        setSubmitError(String(firstError))
        return
      }

      if (typeof window !== 'undefined') {
        const apps = JSON.parse(localStorage.getItem('w3l_applications') || '[]')
        apps.push({ ...form, ref: r, status: 'pending', submitted: new Date().toISOString() })
        localStorage.setItem('w3l_applications', JSON.stringify(apps))
      }
      setSubmitted(true)
    } catch {
      setSubmitError('Network error while submitting. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%', background: 'var(--black3)',
    border: `1.5px solid ${err ? 'var(--red)' : 'var(--border2)'}`,
    borderRadius: 8, padding: '11px 14px',
    fontFamily: "'Space Grotesk',sans-serif", fontSize: 14,
    color: '#fff', outline: 'none',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.5px', textTransform: 'uppercase',
    color: 'var(--mid)', marginBottom: 7,
  }

  const progress = ((step - 1) / 2) * 100
  const stepNames = ['Personal Details', 'Professional Info', 'Final Details']

  if (!registrationOpen) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: 68, background: 'var(--black)' }}>
          <section style={{ maxWidth: 900, margin: '0 auto', padding: '90px 5%', textAlign: 'center' }}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(50px,8vw,90px)', lineHeight: 0.95, letterSpacing: 1, color: '#fff', marginBottom: 18 }}>
              ATTENDEE REGISTRATION<br />
              <em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>IS CURRENTLY CLOSED</em>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.8, maxWidth: 620, margin: '0 auto 30px' }}>
              We are not accepting attendee applications right now. Speaker applications are still open.
            </p>
            <Link href="/speakers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 8 }}>
              Go to Call for Speakers →
            </Link>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: 68 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 420px',
          gap: 80, padding: '60px 5%', maxWidth: 1200, margin: '0 auto',
        }} className="reg-grid">

          {/* Left */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
              Registration
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px,6vw,88px)', lineHeight: 0.92, letterSpacing: 1, color: '#fff', marginBottom: 24 }}>
              APPLY TO<br /><em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>ATTEND</em><br />W3LC 5.0
            </h1>
            <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.75, maxWidth: 420, marginBottom: 40 }}>
              Spaces are limited and subject to approval. Our team will review your application and get back to you within 3–5 business days.
            </p>

            {[
              { icon: '📅', title: `${SITE.date}`, desc: 'Three days of keynotes, workshops, networking and a 24-hour hackathon.', color: 'rgba(21,101,216,.2)' },
              { icon: '📍', title: `Venue TBA — Lagos, Nigeria`, desc: 'Physical + virtual hybrid. Virtual link shared upon approval.', color: 'rgba(0,194,160,.15)' },
              { icon: '✅', title: 'Approval-Based Access', desc: "All applications are reviewed. You'll receive a confirmation once confirmed.", color: 'rgba(255,107,53,.15)' },
            ].map(c => (
              <div key={c.title} style={{ display: 'flex', gap: 16, background: 'var(--black3)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div style={{ background: 'var(--black2)', border: '1.5px solid var(--border2)', borderRadius: 16, padding: '36px 32px', alignSelf: 'start', position: 'sticky', top: 88 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,194,160,.15)', border: '2px solid rgba(0,194,160,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 24px' }}>✓</div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 12 }}>APPLICATION RECEIVED</h2>
                <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.75, maxWidth: 300, margin: '0 auto' }}>
                  Thank you for applying to Web3Lagos 5.0! Our team will review your application shortly.
                </p>
                <div style={{ margin: '20px 0', fontFamily: 'monospace', fontSize: 13, background: 'var(--black3)', border: '1px solid var(--border2)', padding: '8px 18px', borderRadius: 6, color: 'var(--blue-bright)', display: 'inline-block', letterSpacing: 1 }}>
                  REF: {ref}
                </div>
                <div style={{ background: 'rgba(21,101,216,.08)', border: '1px solid rgba(21,101,216,.18)', borderRadius: 8, padding: '14px 18px', fontSize: 12, color: 'var(--mid)', lineHeight: 1.7 }}>
                  📧 A confirmation email has been sent. You will hear back within <strong style={{ color: '#fff' }}>3–5 business days</strong>. Check your spam folder if you don&apos;t see it.
                </div>
                <Link href="/" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: 'var(--blue-bright)' }}>← Back to Web3Lagos</Link>
              </div>
            ) : (
              <>
                {/* Progress */}
                <div style={{ height: 3, background: 'var(--border)', borderRadius: 100, marginBottom: 18 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,var(--blue),var(--teal))', borderRadius: 100, transition: 'width 0.4s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mid)', marginBottom: 20 }}>
                  <span style={{ color: 'var(--blue-bright)', fontWeight: 600 }}>{stepNames[step - 1]}</span>
                  <span>Step {step} of 3</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Registration Form</h3>
                <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 24, lineHeight: 1.6 }}>
                  Fields marked <span style={{ color: 'var(--blue-bright)' }}>*</span> are required.
                </p>

                {/* Step 1 */}
                {step === 1 && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>First Name <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                        <input style={inputStyle(errors.firstname)} value={form.firstname} onChange={e => set('firstname', e.target.value)} placeholder="Ada" />
                        {errors.firstname && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.firstname}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                        <input style={inputStyle(errors.lastname)} value={form.lastname} onChange={e => set('lastname', e.target.value)} placeholder="Obi" />
                        {errors.lastname && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.lastname}</p>}
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Email <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                      <input type="email" style={inputStyle(errors.email)} value={form.email} onChange={e => set('email', e.target.value)} placeholder="ada@example.com" />
                      {errors.email && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.email}</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Phone <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                      <input type="tel" style={inputStyle(errors.phone)} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+234 800 000 0000" />
                      {errors.phone && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.phone}</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>Country <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <select style={{ ...inputStyle(errors.country), appearance: 'none', paddingRight: 32 }} value={form.country} onChange={e => set('country', e.target.value)}>
                            <option value="">Select country</option>
                            {COUNTRIES.map(g => (
                              <optgroup key={g.group} label={g.group}>
                                {g.options.map(o => <option key={o} value={o}>{o}</option>)}
                              </optgroup>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)', pointerEvents: 'none' }}>▾</span>
                        </div>
                        {errors.country && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.country}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>City <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                        <input style={inputStyle(errors.city)} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Lagos" />
                        {errors.city && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.city}</p>}
                      </div>
                    </div>
                    <button onClick={next} style={{ width: '100%', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 10, border: 'none', marginTop: 8 }}>
                      Continue →
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Organisation / Company</label>
                      <input style={inputStyle()} value={form.org} onChange={e => set('org', e.target.value)} placeholder="Web3bridge, Freelance..." />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Job Title / Role <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                      <input style={inputStyle(errors.role)} value={form.role} onChange={e => set('role', e.target.value)} placeholder="Blockchain Developer, Founder..." />
                      {errors.role && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.role}</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Twitter / X Handle</label>
                      <input style={inputStyle()} value={form.twitter} onChange={e => set('twitter', e.target.value)} placeholder="@yourhandle" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Which track interests you most? <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                      {TRACKS.map(t => (
                        <label key={t.value} onClick={() => set('track', t.value)} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          background: form.track === t.value ? 'rgba(41,121,255,0.1)' : 'var(--black3)',
                          border: `1.5px solid ${form.track === t.value ? 'var(--blue-bright)' : 'var(--border2)'}`,
                          borderRadius: 8, padding: '11px 14px', cursor: 'pointer', marginBottom: 7, transition: 'all 0.2s',
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${form.track === t.value ? 'var(--blue-bright)' : 'rgba(255,255,255,0.25)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {form.track === t.value && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue-bright)' }} />}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{t.label}</span>
                        </label>
                      ))}
                      {errors.track && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.track}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', color: 'var(--mid)', border: '1.5px solid var(--border2)', padding: 13, borderRadius: 10, fontWeight: 500, fontSize: 14 }}>← Back</button>
                      <button onClick={next} style={{ flex: 2, background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 10, border: 'none' }}>Continue →</button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Will you require a visa?</label>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--black3)', border: '1.5px solid var(--border2)', borderRadius: 8, padding: '12px 16px' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>I need a visa / invitation letter</div>
                          <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 2 }}>We&apos;ll include this in your approval email.</div>
                        </div>
                        <button onClick={() => set('visa', !form.visa)} style={{
                          width: 42, height: 24, borderRadius: 100,
                          background: form.visa ? 'var(--blue-bright)' : 'rgba(255,255,255,0.1)',
                          border: 'none', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', background: '#fff',
                            position: 'absolute', top: 3, left: form.visa ? 21 : 3, transition: 'left 0.2s',
                          }} />
                        </button>
                      </div>
                    </div>
                    <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>How will you attend? <span style={{ color: 'var(--blue-bright)' }}>*</span></label>
                      {[
                        { value: 'physical', label: 'In-person — Lagos' },
                        { value: 'virtual',  label: 'Virtually (online stream)' },
                        { value: 'undecided',label: 'Not sure yet' },
                      ].map(t => (
                        <label key={t.value} onClick={() => set('attend', t.value)} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          background: form.attend === t.value ? 'rgba(41,121,255,0.1)' : 'var(--black3)',
                          border: `1.5px solid ${form.attend === t.value ? 'var(--blue-bright)' : 'var(--border2)'}`,
                          borderRadius: 8, padding: '11px 14px', cursor: 'pointer', marginBottom: 7, transition: 'all 0.2s',
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${form.attend === t.value ? 'var(--blue-bright)' : 'rgba(255,255,255,0.25)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {form.attend === t.value && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue-bright)' }} />}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{t.label}</span>
                        </label>
                      ))}
                      {errors.attend && <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{errors.attend}</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Anything else?</label>
                      <textarea style={{ ...inputStyle(), resize: 'none' } as React.CSSProperties} rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Accessibility needs, questions..." />
                    </div>
                    <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
                    <p style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.7, padding: '12px 14px', background: 'var(--black3)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 16 }}>
                      By submitting you agree to be contacted by the Web3Lagos team. Your data will not be shared with third parties.
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(2)} style={{ flex: 1, background: 'transparent', color: 'var(--mid)', border: '1.5px solid var(--border2)', padding: 13, borderRadius: 10, fontWeight: 500, fontSize: 14 }}>← Back</button>
                      <button onClick={submit} disabled={isSubmitting} style={{ flex: 2, background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 10, border: 'none', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application →'}
                      </button>
                    </div>
                    {submitError && (
                      <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 10, lineHeight: 1.6 }}>
                        {submitError}
                      </p>
                    )}
                    <p style={{ fontSize: 11, color: 'var(--mid)', textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
                      Applications reviewed within 3–5 business days.<br />Check inbox and spam for updates.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        input, select, textarea { transition: border-color 0.2s, box-shadow 0.2s; }
        input:focus, select:focus, textarea:focus {
          outline: none !important;
          border-color: var(--blue-bright) !important;
          box-shadow: 0 0 0 3px rgba(41,121,255,0.12) !important;
        }
        @media (max-width: 900px) {
          .reg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
