'use client';

import React, { useRef, useCallback, useState } from 'react';
import { 
  Sparkles, Loader2, Type, Maximize2, Minimize2, CornerDownRight,
  Bold, Italic, List, ListOrdered, Heading2, Quote
} from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

type AiAction = 'grammar' | 'improve' | 'expand' | 'shorten' | 'continue';

const ACTIONS: { key: AiAction; label: string; icon: React.ReactNode }[] = [
  { key: 'grammar', label: 'Fix grammar', icon: <Type size={12} /> },
  { key: 'improve', label: 'Improve', icon: <Sparkles size={12} /> },
  { key: 'expand', label: 'Expand', icon: <Maximize2 size={12} /> },
  { key: 'shorten', label: 'Shorten', icon: <Minimize2 size={12} /> },
  { key: 'continue', label: 'Continue (Tab)', icon: <CornerDownRight size={12} /> },
];

type FormatAction = 'bold' | 'italic' | 'h2' | 'bullet' | 'numbered' | 'quote';

const FORMAT_ACTIONS: { key: FormatAction; label: string; icon: React.ReactNode; shortcut?: string }[] = [
  { key: 'bold', label: 'Bold', icon: <Bold size={14} />, shortcut: 'Ctrl+B' },
  { key: 'italic', label: 'Italic', icon: <Italic size={14} />, shortcut: 'Ctrl+I' },
  { key: 'h2', label: 'Heading', icon: <Heading2 size={14} /> },
  { key: 'bullet', label: 'Bullet List', icon: <List size={14} /> },
  { key: 'numbered', label: 'Numbered List', icon: <ListOrdered size={14} /> },
  { key: 'quote', label: 'Quote', icon: <Quote size={14} /> },
];

interface JobDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
}

export function JobDescriptionEditor({
  value,
  onChange,
  placeholder = 'Describe the role, responsibilities, requirements, and benefits…',
  rows = 10,
  error,
  disabled,
  inputStyle = {},
}: JobDescriptionEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [aiLoading, setAiLoading] = useState<AiAction | null>(null);

  const applyFormat = useCallback(
    (format: FormatAction) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = value;
      const selectedText = text.substring(start, end);
      
      let newText = text;
      let newCursorPos = end;

      switch (format) {
        case 'bold':
          if (selectedText) {
            newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
            newCursorPos = end + 4;
          } else {
            newText = text.substring(0, start) + '****' + text.substring(end);
            newCursorPos = start + 2;
          }
          break;
        
        case 'italic':
          if (selectedText) {
            newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
            newCursorPos = end + 2;
          } else {
            newText = text.substring(0, start) + '**' + text.substring(end);
            newCursorPos = start + 1;
          }
          break;
        
        case 'h2':
          const lineStart = text.lastIndexOf('\n', start - 1) + 1;
          newText = text.substring(0, lineStart) + '## ' + text.substring(lineStart);
          newCursorPos = start + 3;
          break;
        
        case 'bullet':
          if (selectedText) {
            const lines = selectedText.split('\n');
            const bulletedLines = lines.map(line => line.trim() ? `• ${line.trim()}` : line).join('\n');
            newText = text.substring(0, start) + bulletedLines + text.substring(end);
            newCursorPos = start + bulletedLines.length;
          } else {
            const lineStart = text.lastIndexOf('\n', start - 1) + 1;
            newText = text.substring(0, lineStart) + '• ' + text.substring(lineStart);
            newCursorPos = start + 2;
          }
          break;
        
        case 'numbered':
          if (selectedText) {
            const lines = selectedText.split('\n');
            const numberedLines = lines.map((line, i) => line.trim() ? `${i + 1}. ${line.trim()}` : line).join('\n');
            newText = text.substring(0, start) + numberedLines + text.substring(end);
            newCursorPos = start + numberedLines.length;
          } else {
            const lineStart = text.lastIndexOf('\n', start - 1) + 1;
            newText = text.substring(0, lineStart) + '1. ' + text.substring(lineStart);
            newCursorPos = start + 3;
          }
          break;
        
        case 'quote':
          const lineStart2 = text.lastIndexOf('\n', start - 1) + 1;
          newText = text.substring(0, lineStart2) + '> ' + text.substring(lineStart2);
          newCursorPos = start + 2;
          break;
      }

      onChange(newText);
      
      // Restore cursor position after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange]
  );

  const runAi = useCallback(
    async (action: AiAction) => {
      const text = value.trim();
      if (!text && action !== 'continue') {
        toast.error('Add some text first');
        return;
      }
      const inputText = text || 'Write a professional job description opening for a technology role.';
      setAiLoading(action);
      try {
        const { data } = await api.post<{ data?: { text?: string } }>('/jobs/ai-refine', {
          action,
          text: inputText,
        });
        const result = data?.data?.text ?? '';
        if (action === 'continue') {
          const ta = textareaRef.current;
          if (ta && text) {
            const start = ta.selectionStart;
            const before = text.slice(0, start);
            const after = text.slice(start);
            onChange(before + (before.endsWith(' ') ? '' : ' ') + result + (after ? ' ' : '') + after);
          } else {
            onChange((text ? text + '\n\n' : '') + result);
          }
        } else {
          onChange(result);
        }
        toast.success('Done');
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
        toast.error(msg || 'AI refinement failed');
      } finally {
        setAiLoading(null);
      }
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        runAi('continue');
      }
      // Handle Ctrl+B for bold
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        applyFormat('bold');
      }
      // Handle Ctrl+I for italic
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        applyFormat('italic');
      }
    },
    [runAi, applyFormat]
  );

  return (
    <div className="space-y-3">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          Format:
        </span>
        {FORMAT_ACTIONS.map(({ key, label, icon, shortcut }) => (
          <button
            key={key}
            type="button"
            onClick={() => applyFormat(key)}
            disabled={disabled}
            className="flex items-center justify-center p-2 rounded-lg border transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--surface)',
            }}
            title={shortcut ? `${label} (${shortcut})` : label}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* AI Helper */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          AI helper:
        </span>
        {ACTIONS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => runAi(key)}
            disabled={disabled || aiLoading !== null}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--surface-muted)',
            }}
            title={key === 'continue' ? 'Press Tab to continue' : label}
          >
            {aiLoading === key ? <Loader2 size={12} className="animate-spin" /> : icon}
            {label}
          </button>
        ))}
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          Tab = suggest continuation
        </span>
      </div>

      {/* Textarea */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Editor
            </span>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none resize-y font-mono"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: error ? 'var(--error)' : 'var(--border)',
              color: 'var(--text-primary)',
              ...inputStyle,
            }}
          />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Preview
          </span>
          <div 
            className="w-full px-3 py-2.5 text-sm rounded-xl border min-h-[200px]"
            style={{
              backgroundColor: 'var(--surface-muted)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{
              __html: value
                .replace(/^## (.+)$/gm, '<h3 class="font-bold text-base mt-4 mb-2">$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/^> (.+)$/gm, '<blockquote style="border-left: 4px solid var(--accent); padding-left: 1rem; font-style: italic; margin: 0.5rem 0;">$1</blockquote>')
                .replace(/^([•\-\*])\s+(.+)$/gm, '<li style="margin-left: 1.25rem;">$2</li>')
                .replace(/^(\d+)\.\s+(.+)$/gm, '<li style="margin-left: 1.25rem; list-style-type: decimal;">$2</li>')
                .replace(/\n/g, '<br />')
            }}
          />
        </div>
      </div>
      
      {/* Format Guide */}
      <div className="text-[10px] space-y-1" style={{ color: 'var(--text-muted)' }}>
        <p>Formatting guide: **bold** | *italic* | ## Heading | • Bullet | 1. Numbered | &gt; Quote</p>
      </div>
      
      {error && <p className="text-xs" style={{ color: 'var(--error)' }}>{error}</p>}
    </div>
  );
}
