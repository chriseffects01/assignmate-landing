'use client';

import { useState } from 'react';
type CategoryType = 'bug' | 'feature' | 'general' | 'improvement';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import '@/src/styles/settings/settings-account.css';
import { useNotification } from '@/src/context/NotificationContext';

export interface FeedbackPayload {
  rating: number;
  category: CategoryType;
  message: string;
  submittedAt: string;
}

export default function FeedbackSettings() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType>('general');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { toast } = useNotification();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (rating === 0 || !message.trim()) return;

    setIsSubmitting(true);

    const payload: FeedbackPayload = {
      rating,
      category,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      toast.success('Feedback submitted successfully');
      console.log(
        'prepared payload feedback:',
        JSON.stringify(payload, null, 2)
      );
      await new Promise(res => setTimeout(res, 5000));

      setSubmitted(true);
      setRating(0);
      setMessage('');
      setCategory('general');
    } catch (e: any) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="settings-container">
      <Link href={'/dashboard/settings'} className="settings-back-link">
        <ArrowLeft className="h-4 w-4" /> {'  '} Back to settings
      </Link>

      <div className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">Send Feedback</h2>
        </div>

        {submitted ? (
          <div className="feedback-success-box">
            <span className="success-icon">🎉</span>
            <h3 className="success-title">Feedback Received!</h3>
            <p className="success-desc">
              Thanks for helping improve AssignMate. Your input has been logged
              and prepared for processing.
            </p>
            <button
              type="button"
              className="btn-secondary-danger"
              style={{
                color: '#60a5fa',
                borderColor: 'rgba(96, 165, 250, 0.3)',
              }}
              onClick={() => setSubmitted(false)}
            >
              Send Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Star Rating Section */}
            <div className="form-group">
              <label htmlFor="message">
                How would you rate your experience?
              </label>
              <div className="star-rating-container">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    className={`star-btn ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
                <span className="rating-label-text">
                  {rating > 0 ? `${rating} of 5 Stars` : 'Select a rating'}
                </span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="form-group">
              <label htmlFor="category">Feedback Category</label>
              <select
                id="category"
                value={category}
                onChange={e =>
                  setCategory(e.target.value as FeedbackPayload['category'])
                }
                className="feedback-select"
              >
                <option value="general">General Feedback</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Report a Bug</option>
                <option value="improvement">
                  UX / Performance Improvement
                </option>
              </select>
            </div>

            {/* Feedback Message */}
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us what you'd like to see changed or improved..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="feedback-textarea"
              />
            </div>

            {/* Submit Action */}
            <div className="settings-actions">
              <button
                type="submit"
                disabled={isSubmitting || rating === 0 || !message.trim()}
                className="save-btn"
              >
                {isSubmitting ? 'Preparing Payload...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
