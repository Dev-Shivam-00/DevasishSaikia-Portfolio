'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, PROJECT_TYPES, projectTypeLabels, type ContactInput } from '@/lib/validation'
import type { ContactResponse, ContactStatus } from '@/types/contact'

/**
 * Uses the template's `.input-group` / `.theme-btn2` form styling. The template
 * shipped placeholder-only inputs; every field here carries a real label
 * (visually hidden) so the form is usable with a screen reader.
 */
export function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [feedback, setFeedback] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: 'ai-film' },
  })

  const onSubmit = async (values: ContactInput) => {
    setStatus('sending')
    setFeedback('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = (await response.json()) as ContactResponse

      if (result.ok) {
        setStatus('success')
        setFeedback('MESSAGE SENT. THANK YOU.')
        reset({ projectType: 'ai-film' })
        return
      }
      setStatus('error')
      setFeedback(result.message || 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setFeedback('Something went wrong. Please try again.')
    }
  }

  const busy = status === 'sending'

  return (
    <div className="contact-form">
      <h3>Start a conversation</h3>
      <form id="ajax-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot — off-screen rather than display:none so bots still see it */}
        <div className="honeypot" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        <div className="input-group">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
        </div>

        <div className="input-group">
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
        </div>

        <div className="input-group">
          <label htmlFor="company" className="sr-only">
            Company or brand (optional)
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company / Brand (optional)"
            autoComplete="organization"
            {...register('company')}
          />
        </div>

        <div className="input-group">
          <label htmlFor="projectType" className="sr-only">
            Project type
          </label>
          <select id="projectType" aria-invalid={Boolean(errors.projectType)} {...register('projectType')}>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {projectTypeLabels[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group input-group-split">
          <span>
            <label htmlFor="budget" className="sr-only">
              Budget (optional)
            </label>
            <input id="budget" type="text" placeholder="Budget (optional)" {...register('budget')} />
          </span>
          <span>
            <label htmlFor="timeline" className="sr-only">
              Timeline (optional)
            </label>
            <input id="timeline" type="text" placeholder="Timeline (optional)" {...register('timeline')} />
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about the idea"
            aria-invalid={Boolean(errors.message)}
            {...register('message')}
          />
          {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
        </div>

        <div className="input-group mb-0">
          <button type="submit" className="theme-btn2" disabled={busy}>
            {busy ? 'SENDING…' : 'START A CONVERSATION'}
          </button>
        </div>

        <p
          id="result"
          role="status"
          aria-live="polite"
          className={status === 'error' ? 'is-error' : status === 'success' ? 'is-success' : ''}
        >
          {feedback}
        </p>
      </form>
    </div>
  )
}
