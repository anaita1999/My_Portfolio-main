import axios from 'axios';
import { HERO, CONTACT } from '@/constants/testIds';
import { track } from '@/lib/analytics';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ResumeButton({ variant = 'primary', testId = HERO.ctaResume, label = 'Download resume' }) {
  const onClick = async (e) => {
    e.preventDefault();
    track('resume_download');
    try {
      const res = await axios.get(`${API}/resume`, { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Anaita_Pal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(`${API}/resume`, '_blank', 'noopener,noreferrer');
    }
  };

  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className="cursor-hover pill"
      style={
        isPrimary
          ? {
              padding: '14px 22px',
              fontSize: 11,
              fontWeight: 600,
            }
          : {
              padding: '8px 14px',
              fontSize: 10,
              fontWeight: 500,
            }
      }
    >
      <svg width={isPrimary ? 15 : 13} height={isPrimary ? 15 : 13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </button>
  );
}

export { ResumeButton };
export const CONTACT_RESUME_TEST_ID = CONTACT.ctaResume;
