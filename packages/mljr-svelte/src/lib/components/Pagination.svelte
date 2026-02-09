<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';
  type Variant = 'primary' | 'secondary';

  interface Props {
    currentPage?: number;
    totalPages: number;
    siblingCount?: number;
    showPrevNext?: boolean;
    size?: Size;
    variant?: Variant;
    class?: string;
    onchange?: (page: number) => void;
  }

  let {
    currentPage = $bindable(1),
    totalPages,
    siblingCount = 1,
    showPrevNext = true,
    size = 'md',
    variant = 'primary',
    class: className = '',
    onchange,
  }: Props = $props();

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-pagination-sm',
    md: '',
    lg: 'mljr-pagination-lg',
  };

  const variantClasses: Record<Variant, string> = {
    primary: '',
    secondary: 'mljr-pagination-secondary',
  };

  function getPageNumbers(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    // Always show first page
    pages.push(1);

    // Left ellipsis
    if (showLeftEllipsis) {
      pages.push('ellipsis');
    } else if (leftSiblingIndex > 1) {
      // Show page 2 if we're not showing ellipsis but there's a gap
      for (let i = 2; i < leftSiblingIndex; i++) {
        pages.push(i);
      }
    }

    // Middle pages (siblings and current)
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Right ellipsis
    if (showRightEllipsis) {
      pages.push('ellipsis');
    } else if (rightSiblingIndex < totalPages - 1) {
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
        pages.push(i);
      }
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      currentPage = page;
      onchange?.(page);
    }
  }

  let paginationClasses = $derived(
    ['mljr-pagination', sizeClasses[size], variantClasses[variant], className]
      .filter(Boolean)
      .join(' ')
  );

  let pageNumbers = $derived(getPageNumbers());
</script>

<nav class={paginationClasses} aria-label="Pagination">
  {#if showPrevNext}
    <button
      class="mljr-pagination-item mljr-pagination-prev"
      disabled={currentPage <= 1}
      onclick={() => goToPage(currentPage - 1)}
      aria-label="Previous page"
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
    </button>
  {/if}

  {#each pageNumbers as page, index}
    {#if page === 'ellipsis'}
      <span class="mljr-pagination-ellipsis" aria-hidden="true">...</span>
    {:else}
      <button
        class="mljr-pagination-item"
        class:mljr-pagination-active={page === currentPage}
        aria-current={page === currentPage ? 'page' : undefined}
        onclick={() => goToPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}

  {#if showPrevNext}
    <button
      class="mljr-pagination-item mljr-pagination-next"
      disabled={currentPage >= totalPages}
      onclick={() => goToPage(currentPage + 1)}
      aria-label="Next page"
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
      </svg>
    </button>
  {/if}
</nav>
