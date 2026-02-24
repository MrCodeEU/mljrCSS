<script lang="ts">
  import { onMount } from 'svelte';

  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    /** HTML content (bindable) */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Size variant */
    size?: Size;
    /** Disable the editor */
    disabled?: boolean;
    /** Make the editor read-only */
    readonly?: boolean;
    /** Show word/char count in footer */
    showCount?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Called when content changes */
    onchange?: (html: string) => void;
  }

  let {
    value = $bindable(''),
    placeholder = 'Start typing...',
    size = 'md',
    disabled = false,
    readonly = false,
    showCount = false,
    class: className = '',
    onchange,
  }: Props = $props();

  let editorEl: HTMLDivElement;
  let isUpdatingFromProp = false;

  // Active format states
  let activeBold = $state(false);
  let activeItalic = $state(false);
  let activeUnderline = $state(false);
  let activeStrike = $state(false);
  let activeOrderedList = $state(false);
  let activeUnorderedList = $state(false);
  let activeBlockquote = $state(false);
  let selectedHeading = $state('p');

  let wordCount = $state(0);
  let charCount = $state(0);

  function exec(command: string, val?: string) {
    if (readonly || disabled) return;
    document.execCommand(command, false, val);
    editorEl?.focus();
    updateActiveStates();
  }

  function insertHTML(html: string) {
    if (readonly || disabled) return;
    document.execCommand('insertHTML', false, html);
    editorEl?.focus();
  }

  function formatHeading(value: string) {
    if (value === 'p') {
      exec('formatBlock', '<p>');
    } else {
      exec('formatBlock', `<${value}>`);
    }
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  }

  function insertHR() {
    insertHTML('<hr/><br/>');
  }

  function updateActiveStates() {
    activeBold = document.queryCommandState('bold');
    activeItalic = document.queryCommandState('italic');
    activeUnderline = document.queryCommandState('underline');
    activeStrike = document.queryCommandState('strikeThrough');
    activeOrderedList = document.queryCommandState('insertOrderedList');
    activeUnorderedList = document.queryCommandState('insertUnorderedList');

    // Detect blockquote
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
      let inBlockquote = false;
      let headingTag = 'p';
      while (node && node !== editorEl) {
        const name = (node as Element).tagName?.toLowerCase();
        if (name === 'blockquote') inBlockquote = true;
        if (['h1', 'h2', 'h3'].includes(name ?? '')) headingTag = name ?? 'p';
        node = node.parentNode;
      }
      activeBlockquote = inBlockquote;
      selectedHeading = headingTag;
    }

    updateCount();
  }

  function updateCount() {
    if (!editorEl) return;
    const text = editorEl.innerText ?? '';
    charCount = text.length;
    wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  function handleInput() {
    if (!editorEl) return;
    const html = editorEl.innerHTML;
    // Avoid feedback loop
    isUpdatingFromProp = true;
    value = html === '<br>' ? '' : html;
    isUpdatingFromProp = false;
    onchange?.(value);
    updateActiveStates();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); exec('bold'); break;
        case 'i': e.preventDefault(); exec('italic'); break;
        case 'u': e.preventDefault(); exec('underline'); break;
      }
    }
  }

  // Sync value prop → editor (only when changed externally)
  $effect(() => {
    if (editorEl && !isUpdatingFromProp && editorEl.innerHTML !== value) {
      editorEl.innerHTML = value;
      updateCount();
    }
  });

  onMount(() => {
    if (editorEl && value) {
      editorEl.innerHTML = value;
      updateCount();
    }
    document.addEventListener('selectionchange', updateActiveStates);
    return () => document.removeEventListener('selectionchange', updateActiveStates);
  });

  const sizeClass: Record<Size, string> = {
    sm: 'mljr-rte-sm',
    md: '',
    lg: 'mljr-rte-lg',
  };
</script>

<div
  class="mljr-rte {sizeClass[size]} {disabled ? 'mljr-rte-disabled' : ''} {readonly ? 'mljr-rte-readonly' : ''} {className}"
>
  {#if !readonly}
    <!-- Toolbar -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="mljr-rte-toolbar" role="toolbar" aria-label="Formatting toolbar" tabindex="0" onmousedown={(e) => e.preventDefault()}>
      <!-- Heading select -->
      <div class="mljr-rte-toolbar-group">
        <select
          class="mljr-rte-select"
          value={selectedHeading}
          onchange={(e) => formatHeading((e.target as HTMLSelectElement).value)}
          aria-label="Heading level"
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
      </div>

      <!-- Text formatting -->
      <div class="mljr-rte-toolbar-group">
        <button
          type="button"
          class="mljr-rte-btn {activeBold ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('bold')}
          title="Bold (Ctrl+B)"
          aria-label="Bold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
          </svg>
        </button>
        <button
          type="button"
          class="mljr-rte-btn {activeItalic ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('italic')}
          title="Italic (Ctrl+I)"
          aria-label="Italic"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/>
            <line x1="15" y1="4" x2="9" y2="20"/>
          </svg>
        </button>
        <button
          type="button"
          class="mljr-rte-btn {activeUnderline ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('underline')}
          title="Underline (Ctrl+U)"
          aria-label="Underline"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
            <line x1="4" y1="20" x2="20" y2="20"/>
          </svg>
        </button>
        <button
          type="button"
          class="mljr-rte-btn {activeStrike ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('strikeThrough')}
          title="Strikethrough"
          aria-label="Strikethrough"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <path d="M17.5 5.5C17.5 5.5 16 4 12 4s-5.5 2-5.5 4.5c0 5 11 3 11 7.5S14 20 12 20s-5.5-1.5-5.5-3.5"/>
          </svg>
        </button>
      </div>

      <!-- Lists -->
      <div class="mljr-rte-toolbar-group">
        <button
          type="button"
          class="mljr-rte-btn {activeUnorderedList ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('insertUnorderedList')}
          title="Bullet List"
          aria-label="Bullet list"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
            <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </button>
        <button
          type="button"
          class="mljr-rte-btn {activeOrderedList ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('insertOrderedList')}
          title="Numbered List"
          aria-label="Numbered list"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
            <path d="M4 6h1v4" stroke-width="2"/><path d="M4 10h2" stroke-width="2"/>
            <path d="M6 14H4c0-1 2-2 2-3s-1-1.5-2-1" stroke-width="1.5"/>
            <path d="M4 19h2a1 1 0 0 0 0-2H4a1 1 0 0 1 0-2h2" stroke-width="1.5"/>
          </svg>
        </button>
      </div>

      <!-- Text alignment -->
      <div class="mljr-rte-toolbar-group">
        <button type="button" class="mljr-rte-btn" onclick={() => exec('justifyLeft')} title="Align left" aria-label="Align left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('justifyCenter')} title="Center" aria-label="Center align">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('justifyRight')} title="Align right" aria-label="Align right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Special -->
      <div class="mljr-rte-toolbar-group">
        <button
          type="button"
          class="mljr-rte-btn {activeBlockquote ? 'mljr-rte-btn-active' : ''}"
          onclick={() => exec('formatBlock', '<blockquote>')}
          title="Blockquote"
          aria-label="Blockquote"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={insertLink} title="Insert link" aria-label="Insert link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('unlink')} title="Remove link" aria-label="Remove link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/>
            <path d="M5.17 11.75l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/>
            <line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/>
            <line x1="16" y1="19" x2="16" y2="22"/><line x1="19" y1="16" x2="22" y2="16"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('formatBlock', '<pre>')} title="Code block" aria-label="Code block">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={insertHR} title="Horizontal rule" aria-label="Horizontal rule">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
          </svg>
        </button>
      </div>

      <!-- Undo/Redo/Clear -->
      <div class="mljr-rte-toolbar-group">
        <button type="button" class="mljr-rte-btn" onclick={() => exec('undo')} title="Undo (Ctrl+Z)" aria-label="Undo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('redo')} title="Redo (Ctrl+Y)" aria-label="Redo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M15 14l5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/>
          </svg>
        </button>
        <button type="button" class="mljr-rte-btn" onclick={() => exec('removeFormat')} title="Clear formatting" aria-label="Clear formatting">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4l-4 16"/>
            <line x1="18" y1="12" x2="22" y2="16"/><line x1="22" y1="12" x2="18" y2="16"/>
          </svg>
        </button>
      </div>
    </div>
  {/if}

  <!-- Content area -->
  <div
    bind:this={editorEl}
    class="mljr-rte-content"
    contenteditable={!readonly && !disabled ? 'true' : 'false'}
    data-placeholder={placeholder}
    oninput={handleInput}
    onkeydown={handleKeydown}
    onmouseup={updateActiveStates}
    onkeyup={updateActiveStates}
    role="textbox"
    tabindex="0"
    aria-multiline="true"
    aria-label="Rich text editor"
    aria-readonly={readonly || disabled}
  ></div>

  {#if showCount}
    <div class="mljr-rte-footer">
      <span>{wordCount} words</span>
      <span>{charCount} characters</span>
    </div>
  {/if}
</div>
