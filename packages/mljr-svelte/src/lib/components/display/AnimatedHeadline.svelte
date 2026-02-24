<script lang="ts">
  import { untrack } from 'svelte';

  type AnimationType = 'typing' | 'fade' | 'slide' | 'flip';

  interface Props {
    /** Static text before animated word */
    prefix?: string;
    /** Static text after animated word */
    suffix?: string;
    /** Words to cycle through */
    words?: string[];
    /** Animation type */
    animation?: AnimationType;
    /** Interval between word changes in ms */
    interval?: number;
    /** Typing speed in ms per character */
    typingSpeed?: number;
    /** Erasing speed in ms per character */
    erasingSpeed?: number;
    /** Whether to highlight the animated word */
    highlight?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    prefix = '',
    suffix = '',
    words = [],
    animation = 'typing',
    interval = 2500,
    typingSpeed = 80,
    erasingSpeed = 40,
    highlight = false,
    class: className = '',
  }: Props = $props();

  let currentWordIndex = $state(0);
  let displayText = $state('');
  let isTyping = $state(true);
  let wordKey = $state(0); // for forcing re-animation

  let timer: ReturnType<typeof setTimeout> | null = null;

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function typeWord() {
    if (words.length === 0) return;

    const target = words[currentWordIndex] ?? '';

    if (animation === 'typing') {
      if (isTyping) {
        if (displayText.length < target.length) {
          displayText = target.slice(0, displayText.length + 1);
          timer = setTimeout(typeWord, typingSpeed);
        } else {
          // Pause before erasing
          timer = setTimeout(() => {
            isTyping = false;
            typeWord();
          }, interval);
        }
      } else {
        if (displayText.length > 0) {
          displayText = displayText.slice(0, -1);
          timer = setTimeout(typeWord, erasingSpeed);
        } else {
          currentWordIndex = (currentWordIndex + 1) % words.length;
          isTyping = true;
          timer = setTimeout(typeWord, 200);
        }
      }
    } else {
      // For other animations: just cycle via wordKey
      displayText = target;
      wordKey++;
      timer = setTimeout(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typeWord();
      }, interval);
    }
  }

  $effect(() => {
    const w = words; // track `words` as dependency
    untrack(() => {
      if (w.length === 0) return;
      clearTimer();
      displayText = '';
      currentWordIndex = 0;
      isTyping = true;
      wordKey = 0;
      typeWord();
    });

    return () => clearTimer();
  });

  const wordClasses = $derived(() => {
    if (animation === 'typing') return '';
    return `mljr-animated-word-${animation}`;
  });
</script>

<span class="mljr-animated-headline {className}">
  {#if prefix}<span class="mljr-animated-prefix">{prefix} </span>{/if}
  <span class="mljr-animated-word-wrapper">
    {#key wordKey}
      {#if highlight}
        <span class="mljr-animated-highlight {wordClasses()}">{displayText}</span>
      {:else}
        <span class={wordClasses()}>{displayText}</span>
      {/if}
    {/key}
    {#if animation === 'typing'}
      <span class="mljr-animated-cursor" aria-hidden="true"></span>
    {/if}
  </span>
  {#if suffix}<span class="mljr-animated-suffix"> {suffix}</span>{/if}
</span>
