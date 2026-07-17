'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" style={{ padding: '96px 24px', background: 'var(--bg-canvas)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'start' }}>
        
        {/* Left Side */}
        <div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 48px)', fontWeight: 800, color: 'var(--fg-default)', letterSpacing: '-0.03em', marginBottom: 24, lineHeight: 1.1 }}>
            Get in <span style={{ color: '#bc8cff' }}>Touch</span>
          </h2>
          <p style={{ color: 'var(--fg-muted)', fontSize: 16, lineHeight: 1.6, marginBottom: 40, maxWidth: 400 }}>
            Have questions about your GitHub stats, integrating with our platform, or just want to say hi? We're here to help.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-overlay)', border: '1px solid var(--border-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} style={{ color: '#bc8cff' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 2 }}>Email Us</div>
                <div style={{ fontSize: 16, color: 'var(--fg-default)' }}>singhdushyant465@gmail.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-overlay)', border: '1px solid var(--border-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} style={{ color: '#3fb950' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 2 }}>Call Us</div>
                <div style={{ fontSize: 16, color: 'var(--fg-default)' }}>+91 78777 81145</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-overlay)', border: '1px solid var(--border-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} style={{ color: '#e3b341' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 2 }}>Visit Us</div>
                <div style={{ fontSize: 16, color: 'var(--fg-default)' }}>New Delhi, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={{ background: 'var(--bg-overlay)', padding: 32, borderRadius: 16, border: '1px solid var(--border-muted)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
          <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Web3Forms Access Key */}
            <input type="hidden" name="access_key" value="3d90096f-d1cc-4954-930e-49b3a1fb2978" />
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-default)', marginBottom: 8 }}>Full Name</label>
              <input type="text" name="name" required placeholder="John Doe" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-muted)', borderRadius: 8, color: 'var(--fg-default)', fontSize: 14, outline: 'none' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-default)', marginBottom: 8 }}>Email Address</label>
              <input type="email" name="email" required placeholder="john@example.com" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-muted)', borderRadius: 8, color: 'var(--fg-default)', fontSize: 14, outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-default)', marginBottom: 8 }}>Message</label>
              <textarea name="message" required placeholder="How can we help?" rows={4} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-muted)', borderRadius: 8, color: 'var(--fg-default)', fontSize: 14, outline: 'none', resize: 'vertical' }} />
            </div>

            {/* Hidden field to prevent spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            {/* Web3Forms specific hidden fields (optional but recommended) */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
            <input type="hidden" name="redirect" value="https://github-activity-dashboard-iota.vercel.app/login" />

            <button type="submit" className="button-hover" style={{ width: '100%', padding: '14px', background: '#c0b3c6', color: '#161b22', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
